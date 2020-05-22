const BeatmapDifficulty = require('./Beatmap/BeatmapDifficulty');
const NoteDensity = require('./Preprocessing/NoteDensity');
const Tap = require('./Skills/Tap');
const FingerControl = require('./Skills/FingerControl');
const Aim = require('./Skills/Aim'); 
const Mean = require('./MathUtil/Mean');
const HitWindows = require('./Beatmap/HitWindows');

const aimMultiplier = 0.614;
const tapMultiplier = 0.614;
const fingerControlMultiplier = 1.245;

const srExponent = 0.83;

function calculate(beatmap, mods, clockRate) {
	// console.log(beatmap.hitObjects)
	var hitObjects = beatmap.hitObjects;

	var mapLength = 0;
	if (hitObjects.length > 0) {
		mapLength = (hitObjects[hitObjects.length - 1].startTime - hitObjects[0].startTime) / 1000 / clockRate;
	}

	var preemptNoClockRate = BeatmapDifficulty.difficultyRange(beatmap.ApproachRate, 1800, 1200, 450);
	var noteDensities = NoteDensity.calculateNoteDensities(hitObjects, preemptNoClockRate);

	// Tap
	var [tapDiff, streamNoteCount, mashLevels, tapSkills, strainHistory] = Tap.calculateTapAttributes(hitObjects, clockRate);

	// Finger Control
	var fingerControlDiff = FingerControl.calculateFingerControlDiff(hitObjects, clockRate);

	var [aimDiff, aimHiddenFactor, comboTPs, missTPs, missCounts, cheeseNoteCount, cheeseLevels, cheeseFactors, graphText] = Aim.calculateAimAttributes(hitObjects, clockRate, strainHistory, noteDensities, {SliderMultiplier: beatmap.SliderMultiplier,SliderTickRate: beatmap.SliderTickRate, timingPoints: beatmap.timingPoints});

	var tapSR = tapMultiplier * Math.pow(tapDiff, srExponent);
	var aimSR = aimMultiplier * Math.pow(aimDiff, srExponent);
	var fingerControlSR = fingerControlMultiplier * Math.pow(fingerControlDiff, srExponent);
	var x = Mean.multiplePowerMean([tapSR, aimSR, fingerControlSR], 7) * 1.131;

	var sr = Mean.multiplePowerMean([tapSR, aimSR, fingerControlSR], 7) * 1.131;
	
	var hitWindows = new HitWindows.HitWindows();
	hitWindows.setDifficulty(parseFloat(beatmap.OverallDifficulty));

	var hitWindowGreat = hitWindows.windowFor('great') / clockRate;
	var preempt = BeatmapDifficulty.difficultyRange(beatmap.ApproachRate, 1800, 1200, 450) / clockRate;

	var maxCombo = beatmap.maxCombo;

	return {
		StarRating: sr,
		Mods: mods,
		Length: mapLength,

		TapSR: tapSR,
		TapDiff: tapDiff,
		StreamNoteCount: streamNoteCount,
		MashLevels: mashLevels,
		TapSkills: tapSkills,

		FingerControlSR: fingerControlSR,
		FingerControlDiff: fingerControlDiff,

		AimSR: aimSR,
		AimDiff: aimDiff,
		AimHiddenFactor: aimHiddenFactor,
		ComboTPs: comboTPs,
		MissTPs: missTPs,
		MissCounts: missCounts,
		CheeseNoteCount: cheeseNoteCount,
		CheeseLevels: cheeseLevels,
		CheeseFactors: cheeseFactors,

		ApproachRate: preempt > 1200 ? (1800 - preempt) / 120 : (1200 - preempt) / 150 + 5,
		OverallDifficulty: (80 - hitWindowGreat) / 6,
		MaxCombo: maxCombo
	};

}

module.exports = {
	calculate: calculate
};