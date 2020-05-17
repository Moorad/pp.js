const BeatmapDifficulty = require('./BeatmapDifficulty');

const base_ranges = [
	difficultyRange('perfect', 22.4, 19.4, 13.9),
	difficultyRange('great', 64, 49, 34),
	difficultyRange('good', 97, 82, 67),
	difficultyRange('ok', 127, 112, 97),
	difficultyRange('meh', 151, 136, 121),
	difficultyRange('miss', 188, 173, 158)
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
		for (var range of base_ranges) {
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