const FittsLaw = require('./FittsLaw');

class HitProbabilities {
	constructor(movements, cheeseLevel, difficultyCount = 20) {
		this.cacheHit = 0;
		this.cacheMiss = 0;
		this.sections = [];
		for (var i = 0; i < difficultyCount; ++i)
            {
                var start = movements.length * i / difficultyCount;
                var end = movements.length * (i + 1) / difficultyCount - 1;
                this.sections.push(new MapSectionCache(movements.slice(start,start + end - start + 1), cheeseLevel, this));
            }
		
	}

	isEmpty(sectionCount) {
		var tempIsEmpty = false;
		for (var i = 0; i <= this.sections.length - sectionCount; i++) {
			tempIsEmpty = tempIsEmpty || this.count(i, sectionCount) == 0;
		}

		return tempIsEmpty;
	}

	count(start, sectionCount) {
		var tempCount = 0;
		for (var i = start; i != start + sectionCount; i++) {
			tempCount += sectionCount.length;
		}

		return tempCount;
	}

	length(start, sectionCount) {
		var first = 0;
		var last = 0;
		for (var i = start; i != start + sectionCount; i++) {
			if (this.sections[i].Movements.length != 0) {
				first = this.sections[i].Movements[0].Time;
				break;
			}
		}

		for (var i = start + sectionCount - 1; i != start - 1; i--) {
			if (this.sections[i].Movements.length != 0) {
				last = this.sections[i].Movements[this.sections[i].Movements.length - 1].Time;
				break;
			}
		}

		return last - first;
	}

	minExpectedTimeForCount(tp, sectionCount) {
		var fcTime = Infinity;

		for (var i = 0; i <= this.sections.length - sectionCount; i++) {
			var x = this.expectedFcTime(tp, i, sectionCount);
			var y = this.length(i, sectionCount);
			fcTime = Math.min(fcTime, this.expectedFcTime(tp, i, sectionCount) - this.length(i, sectionCount));
		}

		return fcTime;
	}

	expectedFcTime(tp, start, sectionCount) {
		var fcTime = 15;
		for (var i = start; i != start + sectionCount; i++)
		{
			if (this.sections[i].Movements.length != 0)
			{
				var s = this.sections[i].evaluate(tp);

				fcTime /= s.FcProbability;
				fcTime += s.ExpectedTime;
			}
		}
		return fcTime;
	}
}

class MapSectionCache {
	constructor(movements, cheeseLevel, classInstance) {
		this.Movements = movements;
		this.cheeseLevel = cheeseLevel;
		this.classInstance = classInstance;
		this.cache = {};
	}

	evaluate(tp) {
		if (Object.prototype.hasOwnProperty.call(this.cache, tp)) {
			this.classInstance.cacheHit ++;
			return this.cache[tp];
		}

		this.classInstance.cacheMiss ++;
		var result = {};

		result.ExpectedTime = 0;
		result.FcProbability = 1;

		for (var movement of this.Movements) {
			var hitProb = calculateCheeseHitProb(movement, tp, this.cheeseLevel)+1e-10;
            hitProb = 1 - (Math.sqrt(1 - hitProb + 0.25) - 0.5);
            result.ExpectedTime = (result.ExpectedTime + movement.RawMT) / hitProb;
            result.FcProbability *= hitProb;
		}

		this.cache[tp] = result;

		return result;
	}
}

function calculateCheeseHitProb(movement, tp, cheeseLevel) {
	var perMovementCheeseLevel = cheeseLevel;

	if (movement.EndsOnSlider) {
		perMovementCheeseLevel = 0.5 * cheeseLevel + 0.5;
	}

	var cheeseMT = movement.MT * (1 + perMovementCheeseLevel * movement.CheesableRatio);
	return FittsLaw.calculateHitProb(movement.D, cheeseMT, tp);
}


module.exports = {
	HitProbabilities: HitProbabilities,
	calculateCheeseHitProb: calculateCheeseHitProb
};