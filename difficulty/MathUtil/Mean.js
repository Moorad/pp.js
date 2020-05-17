function powerMean(x, y, i) {
	return Math.pow((Math.pow(x, i) + Math.pow(y, i)) / 2, 1 / i);
}

function multiplePowerMean(values, i) {
	var sum = 0;
	var count = 0;
	values.forEach(x => {	
		sum += Math.pow(x, i);
		count++;
	});
	return Math.pow(sum / count, 1 / i);
}

module.exports = {
	powerMean: powerMean,
	multiplePowerMean: multiplePowerMean
}