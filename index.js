const OsuPerformanceCalculator = require('./difficulty/OsuPerformanceCalculator');
const OsuDifficultyCalculator = require('./Difficulty/OsuDifficultyCalculator');

function calculatePerformancePoints(beatmap, score) {
	return new Promise((resolve, reject) => {
		var ppData = OsuPerformanceCalculator.calculate(beatmap, score);
		resolve(ppData)
	});
}


function calculateDifficulty(beatmap, mods) {
	const clockRate = 1;
	return new Promise((resolve, reject) => {
		OsuDifficultyCalculator.calculate(beatmap, mods, clockRate);
		resolve(difficultyData);
	}); 	
}

module.exports = {
	processContent: require('./beatmapProcessor').processContent,
	processStream: require('./beatmapProcessor').processStream,
	processFile: require('./beatmapProcessor').processFile,
	calculatePerformancePoints: calculatePerformancePoints,
	calculateDifficulty: calculateDifficulty
};