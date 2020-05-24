const BeatmapDifficulty = require('./BeatmapDifficulty');

const osu_ranges = [
	difficultyRange('great', 80, 50, 20),
	difficultyRange('good', 140, 100, 60),
	difficultyRange('meh', 200, 150, 100),
	difficultyRange('miss', 400 , 400, 400)
];



function difficultyRange(result, min, average, max) {
	return {
		result: result,
		min: min,
		average: average,
		max: max
	};
}


class HitWindows {

	constructor() {
		this.perfect = 0;
        this.great = 0;
        this.good = 0;
        this.ok = 0;
        this.meh = 0;
        this.miss = 0;
	}

	setDifficulty(difficulty) {
		for (var range of osu_ranges) {
			var value = BeatmapDifficulty.difficultyRange(difficulty, range.min, range.average, range.max)
	
			switch (range.result) {
	
				case 'miss':
					this.miss = value;
					break;
	
				case 'meh':
					this.meh = value;
					break;
	
				case 'ok':
					this.ok = value;
					break;
	
				case 'good':
					this.good = value;
					break;
	
				case 'great':
					this.great = value;
					break;
	
				case 'perfect':
					this.perfect = value;
					break;
			}
		}
	}

	windowFor(result) {
		switch (result) {
			case 'miss':
				return this.miss;

			case 'meh':
				return this.meh;

			case 'ok':
				return this.ok;

			case 'good':
				return this.good;

			case 'great':
				return this.great;

			case 'perfect':
				return this.perfect;
		}
	}
}

module.exports = {
	HitWindows: HitWindows
}