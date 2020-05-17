function calculateFingerControlDiff(hitObjects, clockRate) {
	if (hitObjects.length == 0) {
		return 0;
	}

	var prevTime = hitObjects[0].startTime / 1000;
	var currStrain = 0;
	var prevStrainTime = 0;
	var repeatStrainCount = 1;
	var strainHistory = [0];

	for (var i = 1; i < hitObjects.length; i++) {
		var currTime = hitObjects[i].startTime / 1000.0;
		var deltaTime = (currTime - prevTime) / clockRate;

		var strainTime = Math.max(deltaTime, 0.046875);
		var strainDecayBase = Math.pow(0.9, 1 / Math.min(strainTime, 0.2));

		currStrain *= Math.pow(strainDecayBase, deltaTime);

		strainHistory.push(currStrain);

		var strain = 0.1 / strainTime;

		if (Math.abs(strainTime - prevStrainTime) > 0.004) {
			repeatStrainCount = 1;
		} else {
			repeatStrainCount++;
		}

		if (hitObjects[i].objectName == 'slider') {
			strain /= 2.0;
		}

		if (repeatStrainCount % 2 == 0) {
			strain = 0;
		} else {
			strain /= Math.pow(1.25, repeatStrainCount);
		}

		currStrain += strain;

		prevTime = currTime;
		prevStrainTime = strainTime;
	}

	var strainHistoryArray = strainHistory;

	strainHistoryArray.sort((a, b) => a - b);
	strainHistoryArray.reverse();

	var diff = 0;
	var k = 0.95;

	for (var i = 0; i < hitObjects.length; i++)
	{
		diff += strainHistoryArray[i] * Math.pow(k, i);
	}

	return diff * (1 - k) * 1.1;
}

module.exports = {
	calculateFingerControlDiff: calculateFingerControlDiff
}