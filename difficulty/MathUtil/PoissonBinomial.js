const Utility = require('../Utility');

class PoissonBinomial {
	constructor(probabilities) {
		this.mu = probabilities.reduce((acc, curr) => acc + curr);

		this.sigma = 0;
		var gamma = 0;

		for (var p of probabilities) {
			this.sigma += p * (1 - p);
			gamma += p * (1 - p) * (1 - 2 * p);
		}

		this.sigma = Math.sqrt(this.sigma);

		this.v = gamma / (6 * Math.pow(this.sigma, 3));
	}

	cdf(count) {
		var k = (count + 0.5 - this.mu) / this.sigma;

		var result = CDF(0, 1, k) + this.v * (1 - k * k) * PDF(0, 1, k);

		if (result < 0) return 0;
		if (result > 1) return 1;

		return result;
	}
}

function CDF(mean, stddev, x) {
	if (stddev < 0.0) {
		throw 'Invalid distribution parameters';
	}

	return 0.5 * Utility.erfc((mean - x) / (stddev * (1.4142135623730950488016887242096980785696718753769)));
}

function PDF(mean, stddev, x) {
	if (stddev < 0.0) {
		throw 'Invalid distribution parameters';
	}

	var d = (x - mean) / stddev;
	return Math.exp(-0.5 * d * d) / ((2.5066282746310005024157652848110452530069867406099) * stddev);
}

module.exports = {
	PoissonBinomial: PoissonBinomial
};