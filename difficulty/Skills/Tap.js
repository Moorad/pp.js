const Utility = require('../Utility');
const Mean = require('../MathUtil/Mean');

const mashLevelCount = 11;
const spacedBuffFactor = 0.10;

var decayCoeffs = new Utility.Vector([2.3, 0.6, -1.1, -2.8]).pointwiseExp();

const timescaleFactors = [1.02, 1.02, 1.05, 1.15];

function calculateTapAttributes(hitObjects, clockRate) {
	var [strainHistory, tapDiff] = calculateTapStrain(hitObjects, 0, clockRate);
	var burstStrain = Math.max.apply(null,strainHistory.map(x => Math.max.apply(null, x.value)));

	var streamnessMask = calculateStreamnessMask(hitObjects, burstStrain, clockRate);
	var streamNoteCount = streamnessMask.reduce((a, b) => a + b, 0);

	var [mashLevels, tapSkills] = calculateMashLevelsVSTapSkills(hitObjects, clockRate);

	return [tapDiff, streamNoteCount, mashLevels, tapSkills, strainHistory];
}

function calculateTapStrain(hitObjects, mashLevel, clockRate) {
	var strainHistory = [decayCoeffs.pointwiseMultiply(0), decayCoeffs.pointwiseMultiply(0)];
	var currStrain = decayCoeffs.pointwiseMultiply(1);

	if (hitObjects.length >= 2) {
		var prevPrevTime = hitObjects[0].startTime / 1000.0;
		var prevTime = hitObjects[1].startTime / 1000.0;

		for (var i = 2; i < hitObjects.length; i++) {
			var currTime = hitObjects[i].startTime / 1000.0;
			currStrain = currStrain.pointwiseMultiply((decayCoeffs.pointwiseNegate().pointwiseMultiply(currTime - prevTime)).pointwiseDivide(clockRate).pointwiseExp());
			strainHistory.push(currStrain.pointwisePow((1.1 / 3)).pointwiseMultiply(1.5));

			// console.log(hitObjects[i]);

			var relativeD = Utility.getHypotenuse(Utility.arrays.subtract(hitObjects[i].position, hitObjects[i - 1].position)) / (2 * hitObjects[i].radius);
			var spacedBuff = calculateSpacedness(relativeD) * spacedBuffFactor;

			var deltaTime = Math.max((currTime - prevPrevTime) / clockRate, 0.01);

			var currStrainBase = Math.max(Math.pow(deltaTime, -2.7) * 0.265, Math.pow(deltaTime, -2));

			currStrain = currStrain.pointwiseAdd(decayCoeffs.pointwiseMultiply(currStrainBase).pointwiseMultiply(Math.pow(calculateMashNerfFactor(relativeD, mashLevel), 3) * Math.pow(1 + spacedBuff, 3)));

			prevPrevTime = prevTime;
			prevTime = currTime;
		}
	}

	var strainResult = decayCoeffs.pointwiseMultiply(0).value;

	for (var j = 0; j < decayCoeffs.value.length; j++) {
		var singleStrainHistory = [hitObjects.length];

		for (var i = 0; i < hitObjects.length; i++) {
			singleStrainHistory[i] = strainHistory[i].value[j];
		}

		singleStrainHistory.sort((a, b) => a - b);
		singleStrainHistory.reverse();

		var singleStrainResult = 0;
		var k = 1 - 0.04 * Math.sqrt(decayCoeffs.value[j]);

		for (var i = 0; i < hitObjects.length; i++) {
			singleStrainResult += singleStrainHistory[i] * Math.pow(k, i);
		}

		strainResult[j] = singleStrainResult * (1 - k) * timescaleFactors[j];
	}

	var diff = Mean.multiplePowerMean(strainResult, 2);

	return [strainHistory, diff];
}

function calculateStreamnessMask(hitObjects, skill, clockRate) {
	var streamnessMask = [hitObjects.length];
	if (hitObjects.length > 1) {
		streamnessMask[0] = 0;
		var streamTimeThreshold = Math.pow(skill, -2.7 / 3.2);

		for (var i = 1; i < hitObjects.length; i++) {
			var t = (hitObjects[i].startTime - hitObjects[i - 1].startTime) / 1000 / clockRate;
			streamnessMask[i] = 1 - Utility.logistic((t / streamTimeThreshold - 1) * 15);
		}
	}

	return streamnessMask;
}

function calculateMashLevelsVSTapSkills(hitObjects, clockRate) {
	var mashLevels = [mashLevelCount];
	var tapSkills = [mashLevelCount];

	for (var i = 0; i < mashLevelCount; i++) {
		var mashLevel = i/ (mashLevelCount - 1);
		mashLevels[i] = mashLevel;
		var [strainHistory, tapDiff] = calculateTapStrain(hitObjects, mashLevel, clockRate);
		tapSkills[i] = tapDiff;
	}

	return [mashLevels, tapSkills];
}

function calculateMashNerfFactor(relativeD, mashLevel) {
	var fullMashFactor = 0.73 + 0.27 * Utility.logistic(relativeD * 7 - 6);
	return mashLevel * fullMashFactor + (1 - mashLevel);
}

function calculateSpacedness(d) {
	return Utility.logistic((d - 0.533) / 0.13) - Utility.logistic(-4.1);
}

module.exports = {
	calculateTapAttributes: calculateTapAttributes
};