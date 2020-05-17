function calculateNoteDensities(hitObjects, preempt) {
	var noteDensities = [];

	var window = [];

	var next = 0;

	for (var i = 0; i < hitObjects.length; i++) {
		while(next < hitObjects.length &&  hitObjects[next].startTime < hitObjects[i].startTime + preempt) {
			window.push(hitObjects[next]);
			next++; 
		}

		while(window[0].startTime < hitObjects[i].startTime - preempt) {
			window.shift();
		}

		noteDensities.push(calculateNoteDensity(hitObjects[i].startTime, preempt, window));
	}

	return noteDensities;
}

function calculateNoteDensity(time, preempt, window) {
	var noteDensity = 0;

	for (var hitObject of window) {
		noteDensity += 1 - Math.abs(hitObject.startTime - time) / preempt; 
	}

	return noteDensity;
}



module.exports = {
	calculateNoteDensities: calculateNoteDensities
};