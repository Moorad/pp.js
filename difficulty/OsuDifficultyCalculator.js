const BeatmapDifficulty = require('./Beatmap/BeatmapDifficulty');
const NoteDensity = require('./Preprocessing/NoteDensity');
const Tap = require('./Skills/Tap');
const FingerControl = require('./Skills/FingerControl');
const Aim = require('./Skills/Aim'); 
const Mean = require('./MathUtil/Mean');
const HitWindows = require('./Beatmap/HitWindows');

const aimMultiplier = 0.641;
const tapMultiplier = 0.641;
const fingerControlMultiplier = 1.245;

const srExponent = 0.83;

function calculate(beatmap, mods, clockRate) {
	if (mods.includes('HR')) {
		const ratio = 1.4;
		beatmap.CircleSize = Math.min(parseInt(beatmap.CircleSize) * 1.3, 10);
		beatmap.ApproachRate = Math.min(parseInt(beatmap.ApproachRate) * ratio, 10);
		beatmap.HPDrainRate = Math.min(parseInt(beatmap.HPDrainRate) * ratio, 10);
		beatmap.OverallDifficulty = Math.min(parseInt(beatmap.OverallDifficulty) * ratio, 10);
	}

	if (mods.includes('EZ')) {
		const ratio = 0.5;
		beatmap.CircleSize = parseInt(beatmap.CircleSize) * ratio;
		beatmap.ApproachRate = parseInt(beatmap.ApproachRate) * ratio;
		beatmap.HPDrainRate = parseInt(beatmap.HPDrainRate) * ratio;
		beatmap.OverallDifficulty = parseInt(beatmap.OverallDifficulty) * ratio;
	}

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
	
	var hitWindowGreat = parseInt(hitWindows.windowFor('great')) / clockRate;
	var preempt = parseInt(BeatmapDifficulty.difficultyRange(beatmap.ApproachRate, 1800, 1200, 450)) / clockRate;

	var maxCombo = beatmap.maxCombo;

	return {
		SR: sr,
		mods: mods,
		Length: mapLength,

		tapSR: tapSR,
		tapDiff: tapDiff,
		streamNoteCount: streamNoteCount,
		mashLevels: mashLevels,
		tapSkills: tapSkills,

		fingerControlSR: fingerControlSR,
		fingerControlDiff: fingerControlDiff,

		aimSR: aimSR,
		aimDiff: aimDiff,
		aimHiddenFactor: aimHiddenFactor,
		comboTPs: comboTPs,
		missTPs: missTPs,
		missCounts: missCounts,
		cheeseNoteCount: cheeseNoteCount,
		cheeseLevels: cheeseLevels,
		cheeseFactors: cheeseFactors,

		approachRate: preempt > 1200 ? (1800 - preempt) / 120 : (1200 - preempt) / 150 + 5,
		overallDifficulty: (80 - hitWindowGreat) / 6,
		maxCombo: maxCombo
	};

}

module.exports = {
	calculate: calculate
};