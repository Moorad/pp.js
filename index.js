const OsuPerformanceCalculator = require('./difficulty/OsuPerformanceCalculator');
const OsuDifficultyCalculator = require('./Difficulty/OsuDifficultyCalculator');

function calculatePerformancePoints(beatmap, score, callback) {
	var ppData = OsuPerformanceCalculator.calculate(beatmap, score);
	callback(ppData);
}


function calculateDifficulty(beatmap, mods, callback) {
	var clockRate = 1;
	var difficultyData = OsuDifficultyCalculator.calculate(beatmap, mods, clockRate);
	callback(difficultyData);
}

module.exports = {
	processContent: require('./beatmapProcessor').processContent,
	processStream: require('./beatmapProcessor').processStream,
	processFile: require('./beatmapProcessor').processFile,
	calculatePerformancePoints: calculatePerformancePoints,
	calculateDifficulty: calculateDifficulty
};