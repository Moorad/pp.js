function difficultyRange(difficulty, min, mid, max) {
	if (difficulty > 5) {
		return mid + (max - mid) * (difficulty - 5) / 5;
	}

	if (difficulty < 5) {
		return mid - (mid - min) * (5 - difficulty) / 5;
	}

	return mid;
}

module.exports = {
	difficultyRange: difficultyRange
};