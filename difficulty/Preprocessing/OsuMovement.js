const Utility = require('../Utility');
const Mean = require('../MathUtil/Mean');
const FittsLaw = require('../MathUtil/FittsLaw');

const correction0MovingSpline = new Utility.LinearSpline().interpolateSorted([-1, 1], [1.1, 0]);

const numCoeffs = 4;

var ds0f = [0, 1, 1.35, 1.7, 2.3, 3];
var ks0f = [-11.5, -5.9, -5.4, -5.6, -2, -2];
var scales0f = [1, 1, 1, 1, 1, 1];
var coeffs0f = [
	[
		[0, -0.5, -1.15, -1.8, -2, -2],
		[0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1],
		[6, 1, 1, 1, 1, 1]
	],
	[
		[0, -0.8, -0.9, -1, -1, -1],
		[0, 0.5, 0.75, 1, 2, 2],
		[1, 0.5, 0.4, 0.3, 0, 0],
		[3, 0.7, 0.7, 0.7, 1, 1]
	],
	[
		[0, -0.8, -0.9, -1, -1, -1],
		[0, -0.5, -0.75, -1, -2, -2],
		[1, 0.5, 0.4, 0.3, 0, 0],
		[3, 0.7, 0.7, 0.7, 1, 1]
	],
	[
		[0, 0, 0, 0, 0, 0],
		[0, 0.95, 0.975, 1, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0.7, 0.55, 0.4, 0, 0]
	],
	[
		[0, 0, 0, 0, 0, 0],
		[0, -0.95, -0.975, -1, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0.7, 0.55, 0.4, 0, 0]
	]
];


var ds0s = [0, 1.5, 2.5, 4, 6, 8];
var ks0s = [-1, -5, -6.7, -6.5, -4.3, -4.3];
var scales0s = [1, 0.85, 0.6, 0.8, 1, 1];
var coeffs0s = [
	[
		[0.5, 2, 2.8, 5, 5, 5],
		[0, 0, 0, 0, 0, 0],
		[1, 1, 1, 0, 0, 0],
		[0.6, 1, 0.8, 0.6, 0.2, 0.2]
	],
	[
		[0.25, 1, 0.7, 2, 2, 2],
		[0.5, 2, 2.8, 4, 6, 6],
		[1, 1, 1, 1, 1, 1],
		[0.6, 1, 0.8, 0.3, 0.2, 0.2]
	],
	[
		[0.25, 1, 0.7, 2, 2, 2],
		[-0.5, -2, -2.8, -4, -6, -6],
		[1, 1, 1, 1, 1, 1],
		[0.6, 1, 0.8, 0.3, 0.2, 0.2]
	],
	[
		[0, 0, -0.5, -2, -3, -3],
		[0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1],
		[-0.7, -1, -0.9, -0.1, -0.1, -0.1]
	]
];

var ds3f = [0, 1, 2, 3, 4];
var ks3f = [-4, -5.3, -5.2, -2.5, -2.5];
var scales3f = [1, 1, 1, 1, 1];
var coeffs3f = [
	[
		[0, 1.2, 2, 2, 2],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[1.5, 1, 0.4, 0, 0]
	],
	[
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[2, 1.5, 2.5, 3.5, 3.5]
	],
	[
		[0, 0.3, 0.6, 0.6, 0.6],
		[0, 1, 2.4, 2.4, 2.4],
		[0, 0, 0, 0, 0],
		[0, 0.4, 0.4, 0, 0]
	],
	[
		[0, 0.3, 0.6, 0.6, 0.6],
		[0, -1, -2.4, -2.4, -2.4],
		[0, 0, 0, 0, 0],
		[0, 0.4, 0.4, 0, 0]
	]
];

var ds3s = [1, 1.5, 2.5, 4, 6, 8];
var ks3s = [-2, -2, -3, -5.4, -4.9, -4.9];
var scales3s = [1, 1, 1, 1, 1, 1];
var coeffs3s = [
	[
		[-2, -2, -3, -4, -6, -6],
		[0, 0, 0, 0, 0, 0],
		[1, 1, 1, 0, 0, 0],
		[0.4, 0.4, 0.2, 0.4, 0.3, 0.3]
	],
	[
		[-1, -1, -1.5, -2, -3, -3],
		[1.4, 1.4, 2.1, 2, 3, 3],
		[1, 1, 1, 1, 1, 1],
		[0.4, 0.4, 0.2, 0.4, 0.2, 0.2]
	],
	[
		[-1, -1, -1.5, -2, -3, -3],
		[-1.4, -1.4, -2.1, -2, -3, -3],
		[1, 1, 1, 1, 1, 1],
		[0.4, 0.4, 0.2, 0.4, 0.2, 0.2]
	],
	[
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 1, 0.6, 0.6, 0.6]
	],
	[
		[1, 1, 1.5, 2, 3, 3],
		[0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1],
		[0, 0, -0.6, -0.4, -0.3, -0.3]
	]
];


const tRatioThreshold = 1.4;
const correction0Still = 0;

function extractFirstMovement(obj, beatmap) {
	var movement = getEmptyMovement(obj.startTime / 1000.0);

	var movementWithNested = [movement];

	var extraNestedCount = Utility.getSliderCombo(beatmap, obj) - 1;

	for (var i = 0; i < extraNestedCount; i++) {
		movementWithNested.push(getEmptyMovement(movement.Time));
	}

	return movementWithNested;
}

function extractMovement(obj0, obj1, obj2, obj3, tapStrain, clockRate, hidden = false, noteDensity = 0, objMinus2 = null, beatmap) {
	var constants = initialize();
	var movement = {};

	var t12 = (obj2.startTime - obj1.startTime) / clockRate / 1000.0;
	movement.RawMT = t12;
	movement.Time = obj2.startTime / 1000;

	if (obj2.objectName == 'spinner' || obj1.objectName == 'spinner') {
		movement.IP12 = 0;
		movement.D = 0;
		movement.MT = 1;
		movement.CheesableRatio = 0;
		movement.Cheesablility = 0;
		return [movement];
	}

	if (obj0 == null || obj0.objectName == 'spinner') {
		obj0 = null;
	}

	if (obj3 == null || obj3.objectName == 'spinner') {
		obj3 = null;
	}

	if (obj2.objectName == 'slider') {
		movement.EndsOnSlider = true;
	}

	var pos1 = new Utility.Vector(obj1.position);
	var pos2 = new Utility.Vector(obj2.position);
	var s12 = (pos2.pointwiseSubtract(pos1)).pointwiseDivide((2 * obj2.radius));
	var d12 = s12.L2Norm();
	var IP12 = FittsLaw.calculateIP(d12, t12);

	movement.IP12 = IP12;

	var pos0 = new Utility.Vector([0, 0]);
	var pos3 = new Utility.Vector([0, 0]);
	var s01 = new Utility.Vector([0, 0]);
	var s23 = new Utility.Vector([0, 0]);
	var d01 = 0;
	var d02 = 0;
	var d23 = 0;
	var t01 = 0;
	var t23 = 0;

	var flowiness012 = 0;
	var flowiness123 = 0;
	var obj1InTheMiddle = false;
	var obj2InTheMiddle = false;

	var dMinus22 = 0;
	if (objMinus2 != null) {
		var posMinus2 = new Utility.Vector(objMinus2.position);
		dMinus22 = pos2.pointwiseSubtract(posMinus2).pointwiseDivide(2 * obj2.radius).L2Norm();
	}

	// Correction #1
	var correction0 = 0;
	if (obj0 != null) {
		pos0 = new Utility.Vector(obj0.position);
		s01 = pos1.pointwiseSubtract(pos0).pointwiseDivide(2 * obj2.radius);
		d01 = s01.L2Norm();
		t01 = (obj1.startTime - obj0.startTime) / clockRate / 1000.0;
		d02 = pos2.pointwiseSubtract(pos0).pointwiseDivide(2 * obj2.radius).L2Norm();

		if (d12 != 0) {
			var tRatio0 = t12 / t01;

			if (tRatio0 > tRatioThreshold) {
				if (d01 == 0) {
					correction0 = correction0Still;
				} else {
					var cos012 = Math.min(Math.max(s01.pointwiseNegate().dotProduct(s12) / d01 / d12, -1), 1);
					var correction0_moving = correction0MovingSpline.interpolate(cos012);

					var movingness = Utility.logistic(d01 * 6 - 5) - Utility.logistic(-5);
					correction0 = (movingness * correction0_moving + (1 - movingness) * correction0Still) * 1.5;
				}
			} else if (tRatio0 < 1 / tRatioThreshold) {
				if (d01 == 0) {
					correction0 = 0;
				} else {
					cos012 = Math.min(Math.max(s01.pointwiseNegate().dotProduct(s12) / d01 / d12, -1), 1);
					correction0 = (1 - cos012) * Utility.logistic((d01 * tRatio0 - 1.5) * 4) * 0.3;
				}
			} else {
				obj1InTheMiddle = true;

				var normalized_pos0 = s01.pointwiseNegate().pointwiseDivide(t01).pointwiseMultiply(t12);
				var x0 = normalized_pos0.dotProduct(s12) / d12;
				var y0 = normalized_pos0.pointwiseSubtract(s12.pointwiseMultiply(x0).pointwiseDivide(d12)).L2Norm();

				var correction0Flow = calcCorrection0Or3(d12, x0, y0, constants.k0fInterp, constants.scale0fInterp, constants.coeffs0fInterps);
				var correction0Snap = calcCorrection0Or3(d12, x0, y0, constants.k0sInterp, constants.scale0sInterp, constants.coeffs0sInterps);
				var correction0Stop = calcCorrection0Stop(d12, x0, y0);

				flowiness012 = Utility.logistic((correction0Snap - correction0Flow - 0.05) * 20);

				correction0 = Mean.multiplePowerMean([correction0Flow, correction0Snap, correction0Stop], -10) * 1.3;
			}
		}
	}


	// Correct #2
	var correction3 = 0;

	if (obj3 != null) {
		pos3 = new Utility.Vector(obj3.position);
		s23 = pos3.pointwiseSubtract(pos2).pointwiseDivide(2 * obj2.radius);
		d23 = s23.L2Norm();
		t23 = (obj3.startTime - obj2.startTime) / clockRate / 1000;

		if (d12 != 0) {
			var tRatio3 = t12 / t23;
			if (tRatio3 > tRatioThreshold) {
				if (d23 == 0) {
					correction3 = 0;
				} else {
					var cos123 = Math.min(Math.max(s12.pointwiseNegate().dotProduct(s23) / d12 / d23, -1), 1);
					var correction3_moving = correction0MovingSpline.interpolate(cos123);

					movingness = Utility.logistic(d23 * 6 - 5) - Utility.logistic(-5);
					correction3 = (movingness * correction3_moving) * 0.5;

				}
			} else if (tRatio3 < 1 / tRatioThreshold) {
				if (d23 == 0) {
					correction3 = 0;
				} else {
					cos123 = Math.min(Math.max(s12.pointwiseNegate().dotProduct(s23) / d12 / d23, -1), 1);
					correction3 = (1 - cos123) * Utility.logistic((d23 * tRatio3 - 1.5) * 4) * 0.15;

				}
			} else {
				obj2InTheMiddle = true;

				var normalizedPos3 = s23.pointwiseDivide(t23).pointwiseMultiply(t12);
				var x3 = normalizedPos3.dotProduct(s12) / d12;
				var y3 = normalizedPos3.pointwiseSubtract(s12.pointwiseMultiply(x3).pointwiseDivide(d12)).L2Norm();

				var correction3Flow = calcCorrection0Or3(d12, x3, y3, constants.k3fInterp, constants.scale3fInterp, constants.coeffs3fInterps);
				var correction3Snap = calcCorrection0Or3(d12, x3, y3, constants.k3sInterp, constants.scale3sInterp, constants.coeffs3sInterps);

				flowiness123 = Utility.logistic((correction3Snap - correction3Flow - 0.05) * 20);

				correction3 = Math.max(Mean.powerMean(correction3Flow, correction3Snap, -10) - 0.1, 0) * 0.5;
			}
		}
	}

	// Correction #3
	var patternCorrection = 0;

	if (obj1InTheMiddle && obj2InTheMiddle) {
		var gap = s12.pointwiseSubtract(s23.pointwiseDivide(2)).pointwiseSubtract(s01.pointwiseDivide(2)).L2Norm() / (d12 + 0.1);
		patternCorrection = (Utility.logistic((gap - 1) * 8) - Utility.logistic(-6)) * Utility.logistic((d01 - 0.7) * 10) * Utility.logistic((d23 - 0.7) * 10) * Mean.powerMean(flowiness012, flowiness123, 2) * 0.6;
		//patternCorrection = 0;
	}

	// Correction #4
	var tapCorrection = 0;

	if (d12 > 0 && tapStrain != null) {
		tapCorrection = Utility.logistic((Mean.multiplePowerMean(tapStrain.value, 2) / IP12 - 1.34) / 0.1) * 0.3;
	}

	// Correction #5
	var timeEarly = 0;
	var timeLate = 0;
	var cheesabilityEarly = 0;
	var cheesabilityLate = 0;

	if (d12 > 0) {
		var t01Reciprocal;
		var ip01;
		if (obj0 != null) {
			t01Reciprocal = 1 / (t01 + 1e-10);
			ip01 = FittsLaw.calculateIP(d01, t01);
		} else {
			t01Reciprocal = 0;
			ip01 = 0;
		}
		cheesabilityLate = Utility.logistic((ip01 / IP12 - 0.6) * (-15)) * 0.5;
		timeEarly = cheesabilityLate * (1 / (1 / (t12 + 0.07) + t01Reciprocal));

		var t23Reciprocal;
		var ip23;
		if (obj3 != null) {
			t23Reciprocal = 1 / (t23 + 1e-10);
			ip23 = FittsLaw.calculateIP(d23, t23);
		} else {
			t23Reciprocal = 0;
			ip23 = 0;
		}
		cheesabilityLate = Utility.logistic((ip23 / IP12 - 0.6) * (-15)) * 0.5;
		timeLate = cheesabilityLate * (1 / (1 / (t12 + 0.07) + t23Reciprocal));
	}

	// Correction #6
	var effectiveBpm = 30 / (t12 + 1e-10);
	var highBpmJumpBuff = Utility.logistic((effectiveBpm - 354) / 16) * Utility.logistic((d12 - 1.9) / 0.15) * 0.23;

	// Correction #7
	var smallCircleBonus = Utility.logistic((55 - 2 * obj2.radius) / 3.0) * 0.3;

	// Correction #8
	var d12StackedNerf = Math.max(0, Math.min(d12, Math.min(1.2 * d12 - 0.185, 1.4 * d12 - 0.32)));

	// Correction #9
	var smallJumpNerfFactor = 1 - 0.17 * Math.exp(-Math.pow((d12 - 2.2) / 0.7, 2)) * Utility.logistic((255 - effectiveBpm) / 10);

	// Correction #10
	var bigJumpBuffFactor = 1 + 0.15 * Utility.logistic((d12 - 6) / 0.5) * Utility.logistic((210 - effectiveBpm) / 8);

	// Correction #11
	var correctionHidden = 0;
	if (hidden) {
		correctionHidden = 0.05 + 0.008 * noteDensity;
	}

	// Correction #12
	if (obj0 != null && obj3 != null) {
		var d13 = pos3.pointwiseSubtract(pos1).pointwiseDivide(2 * obj2.radius).L2Norm();
		var d03 = pos3.pointwiseSubtract(pos0).pointwiseDivide(2 * obj2.radius).L2Norm();

		if (d01 < 1 && d02 < 1 && d03 < 1 && d12 < 1 && d13 < 1 && d23 < 1) {
			correction0 = 0;
			correction3 = 0;
			patternCorrection = 0;
			tapCorrection = 0;
		}
	}

	// Correction #13
	var jumpOverlapCorrection = 1 - (Math.max(0.15 - 0.1 * d02, 0) + Math.max(0.1125 - 0.075 * dMinus22, 0)) * Utility.logistic((d12 - 3.3) / 0.25);

	// Correction #14
	var distanceIncreaseBuff = 1;
	if (obj0 != null) {
		var d01OverlapNerf = Math.min(1, Math.pow(d01, 3));
		var timeDifferenceNerf = Math.exp(-4 * Math.pow(1 - Math.max(t12 / t01, t01 / t12), 2));
		var distanceRatio = d12 / Math.max(1, d01);
		var bpmScaling = Math.max(1, -16 * t12 + 3.4);
		distanceIncreaseBuff = 1 + 0.225 * bpmScaling * timeDifferenceNerf * d01OverlapNerf * Math.max(0, distanceRatio - 2);
	}

	var d12WithCorrection = d12StackedNerf * (1 + smallCircleBonus) * (1 + correction0 + correction3 + patternCorrection) * (1 + highBpmJumpBuff) * (1 + tapCorrection) * smallJumpNerfFactor * bigJumpBuffFactor * (1 + correctionHidden) * jumpOverlapCorrection * distanceIncreaseBuff;

	movement.D = d12WithCorrection;
	movement.MT = t12;
	movement.Cheesablility = cheesabilityEarly + cheesabilityLate;
	movement.CheesableRatio = (timeEarly + timeLate) / (t12 + 1e-10);

	var movementWithNested = [movement];

	var extraNestedCount = Utility.getSliderCombo(beatmap, obj2) - 1;

	for (var i = 0; i < extraNestedCount; i++) {
		movementWithNested.push(getEmptyMovement(movement.Time));
	}

	return movementWithNested;


}

function getEmptyMovement(time) {
	return {
		D: 0,
		MT: 1,
		CheesableRatio: 0,
		Cheesablility: 0,
		RawMT: 0,
		IP12: 0,
		Time: time
	};
}

function initialize() {
	var interp0f = prepareInterp(ds0f, ks0f, scales0f, coeffs0f, '0f');
	var interp0s = prepareInterp(ds0s, ks0s, scales0s, coeffs0s, '0s');
	var interp3f = prepareInterp(ds3f, ks3f, scales3f, coeffs3f, '3f');
	var interp3s = prepareInterp(ds3s, ks3s, scales3s, coeffs3s, '3s');
	return {
		k0fInterp: interp0f[0],
		scale0fInterp: interp0f[1],
		coeffs0fInterps: interp0f[2],
		k0sInterp: interp0s[0],
		scale0sInterp: interp0s[1],
		coeffs0sInterps: interp0s[2],
		k3fInterp: interp3f[0],
		scale3fInterp: interp3f[1],
		coeffs3fInterps: interp3f[2],
		k3sInterp: interp3s[0],
		scale3sInterp: interp3s[1],
		coeffs3sInterps: interp3s[2]
	};
}

function prepareInterp(ds, ks, scales, coeffs, type) {

	var kInterp = new Utility.LinearSpline().interpolateSorted(ds, ks);
	var scaleInterp = new Utility.LinearSpline().interpolateSorted(ds, scales);
	var coeffsInterps = Array(Utility.arrays.getLength(coeffs, 0)).fill().map(() => Array(numCoeffs).fill(0));


	for (var i = 0; i < Utility.arrays.getLength(coeffs, 0); i++) {
		for (var j = 0; j < numCoeffs; j++) {
			var coeff_ij = new Array(Utility.arrays.getLength(coeffs, 2));
			for (var k = 0; k < Utility.arrays.getLength(coeffs, 2); k++) {
				coeff_ij[k] = coeffs[i][j][k];
			}
			coeffsInterps[i][j] = new Utility.LinearSpline().interpolateSorted(ds, coeff_ij);
		}
	}

	return [kInterp, scaleInterp, coeffsInterps];
}

function calcCorrection0Or3(d, x, y, kInterp, scaleInterp, coeffsInterps) {
	var correction_raw = kInterp.interpolate(d);
	for (var i = 0; i < Utility.arrays.getLength(coeffsInterps, 0); i++) {
		var cs = new Array(numCoeffs);
		for (var j = 0; j < numCoeffs; j++) {
			cs[j] = coeffsInterps[i][j].interpolate(d);
		}
		correction_raw += cs[3] * Math.sqrt(Math.pow((x - cs[0]), 2) + Math.pow((y - cs[1]), 2) + cs[2]);
	}

	return Utility.logistic(correction_raw) * scaleInterp.interpolate(d);
}

function calcCorrection0Stop(d, x, y) {
	return Utility.logistic(10 * Math.sqrt(x * x + y * y + 1) - 12);
}

module.exports = {
	extractMovement: extractMovement,
	extractFirstMovement: extractFirstMovement
};