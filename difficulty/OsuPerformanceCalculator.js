const Mean = require('./MathUtil/Mean');
const OsuDifficultyCalculator = require('./OsuDifficultyCalculator');
const Utility = require('./Utility');
var Attributes;

const totalValueExponent = 1.5;
const comboWeight = 0.5;
const skillToPPExponent = 2.7;
const missCountLeniency = 0.5;

var countHitCircles;
var countSliders;
var beatmapMaxCombo;

var mods;

var accuracy;
var scoreMaxCombo;
var countGreat;
var countGood;
var countMeh;
var countMiss;

var beatmap;

var greatWindow;

var effectiveMissCount;

function calculate(beatmapData, score) {

	beatmap = beatmapData;

	Attributes = OsuDifficultyCalculator.calculate(beatmap, score.mods, 1);

	countHitCircles = beatmapData.hitObjects.filter(x => x.objectName == 'circle').length;
	countSliders = beatmapData.hitObjects.filter(x => x.objectName == 'slider').length;

	beatmapMaxCombo = beatmapData.maxCombo;

	mods = score.mods || '';

	accuracy = score.accuracy || 1;
	scoreMaxCombo = score.maxCombo || beatmap.maxCombo;
	countGreat = score.count300 || 0;
	countGood = score.count100 || 0;
	countMeh = score.count50 || 0;
	countMiss = score.countMiss || 0;

	if (accuracy) {
		var hitResults = Utility.getHitResults(accuracy, beatmap, countMiss);
		countGreat = hitResults.countGreat ;
		countGood = hitResults.countGood ;
		countMeh = hitResults.countMeh;
		countMiss = hitResults.countMiss;
	}
	

	greatWindow = 79.5 - 6 * beatmapData.OverallDifficulty;

	var multiplier = 2.14;

	if (mods.includes('NF')) {
		multiplier *= 0.90;
	}

	if (mods.includes('SO')) {
		multiplier *= 0.95;
	}

	var comboBasedMissCount;

	if (countSliders == 0) {
		if (scoreMaxCombo < beatmapMaxCombo) {
			comboBasedMissCount = beatmapMaxCombo / scoreMaxCombo;
		} else {
			comboBasedMissCount = 0;
		}
	} else {
		var fullComboThreshold = beatmapMaxCombo - 0.1 * countSliders;
		if (scoreMaxCombo < fullComboThreshold) {
			comboBasedMissCount = fullComboThreshold / scoreMaxCombo;
		} else {
			comboBasedMissCount = Math.pow((beatmapMaxCombo - scoreMaxCombo) / (0.1 * countSliders), 3);
		}
	}

	effectiveMissCount = Math.max(countMiss, comboBasedMissCount);

	var aimValue = computeAimValue(Attributes);
	var tapValue = computeTapValue();
	var accuracyValue = computeAccuracyValue();
	// console.log(greatWindow);
	var totalValue = Mean.multiplePowerMean([aimValue, tapValue, accuracyValue], totalValueExponent) * multiplier;

	return {pp: totalValue, aimpp: aimValue, tappp: tapValue, accpp: accuracyValue};	
}

function computeAimValue() {
	if (beatmap.hitObjects.length <= 1) {
		return 0;
	}

	var x = totalHits();

	var comboTPCount = Attributes.ComboTPs.length;
	var comboPercentages = Utility.linearSpaced(comboTPCount, 1.0 / comboTPCount, 1);

	var scoreComboPercentage = (scoreMaxCombo) / beatmapMaxCombo;
	var comboTP = new Utility.LinearSpline().interpolateSorted(comboPercentages, Attributes.ComboTPs).interpolate(scoreComboPercentage);


	var missTP = new Utility.LinearSpline().interpolateSorted(Attributes.MissCounts, Attributes.MissTPs).interpolate(effectiveMissCount);
	missTP = Math.max(missTP, 0);

	// Combine combo based throughput and miss count based throughput
	var tp = Mean.powerMean(comboTP, missTP, 20);

	// Hidden mod
	if (mods.includes('HD'))
	{
		var hiddenFactor = Attributes.AimHiddenFactor;

		if (Attributes.ApproachRate > 10.75)
			hiddenFactor = 1;
		else if (Attributes.ApproachRate > 9.75)
			hiddenFactor = 1 + (1 - Math.pow(Math.sin((Attributes.ApproachRate - 9.75) * Math.PI / 2), 2)) * (hiddenFactor - 1);

		tp *= hiddenFactor;
	}
		

	// Account for cheesing
	var modifiedAcc = getModifiedAcc();
	var accOnCheeseNotes = 1 - (1 - modifiedAcc) * Math.sqrt(totalHits() / Attributes.CheeseNoteCount);

	// accOnCheeseNotes can be negative. The formula below ensures a positive acc while
	// preserving the value when accOnCheeseNotes is close to 1
	var accOnCheeseNotesPositive = Math.exp(accOnCheeseNotes - 1);
	var urOnCheeseNotes = 10 * greatWindow / (Math.sqrt(2) * Utility.erfInv(accOnCheeseNotesPositive));
	var cheeseLevel = Utility.logistic(((urOnCheeseNotes * Attributes.AimDiff) - 3200) / 2000);
	var cheeseFactor = new Utility.LinearSpline().interpolateSorted(Attributes.CheeseLevels, Attributes.CheeseFactors).interpolate(cheeseLevel);

	if (mods.includes('TD'))
		tp = Math.min(tp, 1.47 * Math.Pow(tp, 0.8));

	var aimValue = tpToPP(tp * cheeseFactor);

	// penalize misses
	aimValue *= Math.pow(0.96, Math.max(effectiveMissCount - missCountLeniency, 0));

	// Buff long maps
	aimValue *= 1 + (Utility.logistic((totalHits() - 2800) / 500.0) - Utility.logistic(-2800 / 500.0)) * 0.22;

	// Buff very high AR and low AR
	var approachRateFactor = 1.0;
	if (Attributes.ApproachRate > 10) {
		approachRateFactor += (0.05 + 0.35 * Math.pow(Math.sin(Math.PI * Math.min(totalHits(), 1250) / 2500), 1.7)) * Math.pow(Attributes.ApproachRate - 10, 2);
	} else if (Attributes.ApproachRate < 8.0) {
		approachRateFactor += 0.01 * (8.0 - Attributes.ApproachRate);
	}

	aimValue *= approachRateFactor;


	if (mods.includes('FL'))
	{
		// Apply object-based bonus for flashlight.
		aimValue *= 1.0 + 0.35 * Math.min(1.0, totalHits() / 200.0) + (totalHits() > 200 ? 0.3 * Math.min(1.0, (totalHits() - 200) / 300.0) + (totalHits() > 500 ? (totalHits() - 500) / 2000.0 : 0.0) : 0.0);
	}

	// Scale the aim value down with accuracy
	var accLeniency = greatWindow * Attributes.AimDiff / 300;
	var accPenalty = (0.09 / (accuracy - 1.3) + 0.3) * (accLeniency + 1.5);
	aimValue *= Math.exp(-accPenalty);

	return aimValue;
}

function computeTapValue() {
		if (beatmap.hitObjects.length <= 1) {
			return 0;
		}

		var modifiedAcc = getModifiedAcc();

		// Assume SS for non-stream parts
		var accOnStreams = 1 - (1 - modifiedAcc) * Math.sqrt(totalHits() / Attributes.StreamNoteCount);

		// accOnStreams can be negative. The formula below ensures a positive acc while
		// preserving the value when accOnStreams is close to 1
		var accOnStreamsPositive = Math.exp(accOnStreams - 1);

		var urOnStreams = 10 * greatWindow / (Math.sqrt(2) * Utility.erfInv(accOnStreamsPositive));

		var mashLevel = Utility.logistic(((urOnStreams * Attributes.TapDiff) - 4000) / 1000);

		var tapSkill = new Utility.LinearSpline().interpolateSorted(Attributes.MashLevels, Attributes.TapSkills).interpolate(mashLevel);

		var tapValue = tapSkillToPP(tapSkill);

		// Buff very high acc on streams
		var accBuff = Math.exp((accOnStreams - 1) * 60) * tapValue * 0.2;
		tapValue += accBuff;

		// Scale tap value down with accuracy
		var accFactor = 0.5 + 0.5 * (Utility.logistic((accuracy - 0.65) / 0.1) + Utility.logistic(-3.5));
		tapValue *= accFactor;

		// Penalize misses and 50s exponentially
		tapValue *= Math.pow(0.93, Math.max(effectiveMissCount - missCountLeniency, 0));
		tapValue *= Math.pow(0.98, countMeh < totalHits() / 500.0 ? 0.5 * countMeh : countMeh - totalHits() / 500.0 * 0.5);

		// Buff very high AR
		var approachRateFactor = 1.0;
		var ar11lengthBuff = 0.8 * (Utility.logistic(totalHits() / 500) - 0.5);
		if (Attributes.ApproachRate > 10.33) {
			approachRateFactor += ar11lengthBuff * (Attributes.ApproachRate - 10.33) / 0.67;
		}

		tapValue *= approachRateFactor;

		return tapValue;
}

function computeAccuracyValue()
        {
            var fingerControlDiff = Attributes.FingerControlDiff;

            var modifiedAcc = getModifiedAcc();

            // technically accOnCircles = modifiedAcc
            // -0.003 exists so that the difference between 99.5% and 100% is not too big
            var accOnCircles = modifiedAcc - 0.003;

            // accOnCircles can be negative. The formula below ensures a positive acc while
            // preserving the value when accOnCircles is close to 1
            var accOnCirclesPositive = Math.exp(accOnCircles - 1);

            // add 20 to greatWindow to nerf high OD
            var deviationOnCircles = (greatWindow + 20) / (Math.sqrt(2) * Utility.erfInv(accOnCirclesPositive));
            var accuracyValue = Math.pow(deviationOnCircles, -2.2) * Math.pow(fingerControlDiff, 0.5) * 46000;

            // scale acc pp with misses
            accuracyValue *= Math.pow(0.96, Math.max(effectiveMissCount - missCountLeniency, 0));

            // nerf short maps
            var lengthFactor = Attributes.Length < 120 ? Utility.logistic((Attributes.Length - 300) / 60.0) + Utility.logistic(2.5) - Utility.logistic(-2.5) : Utility.logistic(Attributes.Length / 60.0);
            accuracyValue *= lengthFactor;

            if (mods.includes('HD'))
                accuracyValue *= 1.08;
            if (mods.includes('FL'))
                accuracyValue *= 1.02;

            return accuracyValue;
        }

function getModifiedAcc() {
	var modifiedAcc = ((countGreat - (totalHits() - countHitCircles)) * 3 + countGood * 2 + countMeh) / ((countHitCircles + 2) * 3);
    return modifiedAcc;
}

var tapSkillToPP = (tapSkill) => Math.pow(tapSkill, skillToPPExponent) * 0.115;

var tpToPP = (tp) => Math.pow(tp, skillToPPExponent) * 0.118;

var totalHits = () => countGreat + countGood + countMeh + countMiss;

module.exports = {
	calculate: calculate
};