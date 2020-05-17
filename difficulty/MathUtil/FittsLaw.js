const Utility = require('../Utility');

function calculateIP(relativeD, mt) {
	return Math.log2(relativeD + 1) / (mt + 1e-10);
}

function calculateHitProb(d, mt, tp) {
	if (d == 0) {
		return 1;
	}
		
	if (mt * tp > 50) {
		return 1;
	}

	if (mt <= 0.03) {
		mt = 0.03;
	}
	var a = Utility.erf(2.066 / d * (power2(mt * tp) - 1) / Math.sqrt(2));

	return Utility.erf(2.066 / d * (power2(mt * tp) - 1) / Math.sqrt(2));
}

const coeffs = [
	1.0000000060371126,
	0.693146840098149,
	0.2402310826131064,
	0.05547894683131716,
	0.009686150703032881,
	0.0012382531241478965,
	0.00021871427263121524,
];

function power2(x) {
	if (x < 0) {
		return 1 / power2(-x);
	}
	if (x > 60) {
		return Infinity;
	}

	var floor = Math.floor(x);
	var frac = x - floor;
	var frac2 = frac * frac;
	var frac3 = frac * frac2;
	var frac4 = frac * frac3;
	var frac5 = frac * frac4;
	var frac6 = frac * frac5;
	
	// console.log(Utility.bitShiftLeft(1, floor, 64));
//Utility.bitShiftLeft(1, floor, 64)
	return Number((1n << BigInt(floor)))  * (coeffs[0] + coeffs[1] * frac + coeffs[2] * frac2 + coeffs[3] * frac3 + coeffs[4] * frac4 + coeffs[5] * frac5 + coeffs[6] * frac6);
}

module.exports = {
	calculateIP: calculateIP,
	calculateHitProb: calculateHitProb
};