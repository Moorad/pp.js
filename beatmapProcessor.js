const fs = require('fs');
const parser = require('osu-parser');
const Utility = require('./difficulty/Utility');

function addExtraData(beatmap) {
	for (var i = 0; i < beatmap.hitObjects.length; i++) {
		beatmap.hitObjects[i].radius = Utility.getHitObjectRadius(beatmap.CircleSize);
	}

	return beatmap;
}

function processContent(content) {
	var processedBeatmap = parser.parseContent(content);
	processedBeatmap = addExtraData(processedBeatmap);
	return processedBeatmap;
}

function processFile(file, callback) {
	parser.parseStream(fs.createReadStream(file), (err, processedBeatmap) => {
		processedBeatmap = addExtraData(processedBeatmap);
		callback(processedBeatmap);
	});
}

function processStream(stream, callback) {
	parser.parseStream(stream, (err, processedBeatmap) => {
		processedBeatmap = addExtraData(processedBeatmap);
		callback(processedBeatmap);
	});
}

module.exports = {
	processContent: processContent,
	processFile: processFile,
	processStream: processStream
};