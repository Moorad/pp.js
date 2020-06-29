// Notifier
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24
}).notify();

const OsuPerformanceCalculator = require('./difficulty/OsuPerformanceCalculator');
const OsuDifficultyCalculator = require('./Difficulty/OsuDifficultyCalculator');

function calculatePerformancePoints(beatmap, score = {}) {
	score.accuracy = score.accuracy || 1;
	score.mods = score.mods || '';
	score.combo = score.combo || 0;
	score.count300 = score.count300 || 0;
	score.count100 = score.count100 || 0;
	score.count50 = score.count50 || 0;
	score.misses = score.misses || 0;

	var clockRate = 1;

	if (score.mods.includes('DT')) clockRate = 1.5;
	if (score.mods.includes('HT')) clockRate = 0.75;


	return new Promise((resolve, reject) => {
		var ppData = OsuPerformanceCalculator.calculate(beatmap, score, clockRate);
		resolve(ppData)
	});
}


function calculateDifficulty(beatmap, mods) {
	var clockRate = 1;

	if (mods.includes('DT')) clockRate = 1.5;
	if (score.mods.includes('HT')) clockRate = 0.75;

	return new Promise((resolve, reject) => {
		var difficultyData = OsuDifficultyCalculator.calculate(beatmap, mods, clockRate);
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