const ppjs = require('./index.js');
const request = require('request');
const chalk = require('chalk');
const fs = require('fs');

var failedChecks = 0;
var passedChecks = 0;
var startedRunning = Date.now();

function test(checkLebel, calculated, expected, options = {}) {
	if (options.accuracy) {
		expected = Math.round(expected * options.accuracy) / options.accuracy;
		calculated = Math.round(calculated * options.accuracy) / options.accuracy;
	}
	if (calculated == expected) {
		console.log(chalk.green('[Passed] ' + checkLebel + ': ' + calculated + ' expected ' + expected));
		passedChecks++;
	} else {
		console.log(chalk.red('[Failed] ' + checkLebel + ': ' + calculated + ' expected ' + expected));
		failedChecks++;
	}
}

function testList(file = './testList.csv') {
	fs.readFile(file, (err, data) => {
		var lines = data.toString().split('\n');

		if (lines[0].startsWith('#')) {
			lines.shift();
		}

		for (var i = 0; i < lines.length; i++) {
			data = lines[i].split(',');
			testMap(data);
		}
	});
}

testList();

function testMap(data) {
	request(`https://osu.ppy.sh/osu/${data[0]}`, {
		encoding: null
	}, (err, res, body) => {
			var beatmap = ppjs.processContent(body);
				console.log(chalk.yellow(`${beatmap.Artist} - ${beatmap.Title} [${beatmap.Version}]`));
				ppjs.calculateDifficulty(beatmap, '', (difficulty) => {
					test('Aim SR', difficulty.AimSR, data[2], {
						accuracy: 100
					});
					test('Tap SR', difficulty.TapSR, data[3], {
						accuracy: 100
					});
					test('Finger Control SR', difficulty.FingerControlSR, data[4], {
						accuracy: 100
					});
					test('SR', difficulty.StarRating, data[1], {
						accuracy: 100
					});

					ppjs.calculatePerformancePoints(beatmap, {}, (pp) => {
						test('Aim pp', pp.aimpp, data[6], {
							accuracy: 1
						});
						test('Tap pp', pp.tappp, data[7], {
							accuracy: 1
						});
						test('Accuracy pp', pp.accpp, data[8], {
							accuracy: 1
						});
						test('pp', pp.pp, data[5], {
							accuracy: 1
						});
						console.log('\n');
					});
			});
		});
}

process.on('beforeExit', () => {
	if (failedChecks) {
		console.log(chalk.yellow('\n' + passedChecks + ' out of ' + (failedChecks + passedChecks) + ' Passed'));
	} else {
		console.log(chalk.green('\n' + 'All checks passed'));
	}

	if (failedChecks > 0) {
		console.log(chalk.red(failedChecks + ' out of ' + (failedChecks + passedChecks) + ' Failed'));
	} else {
		console.log(chalk.green('No checks failed'));
	}

	console.log(chalk.blue(`Execution Time: ${Date.now() - startedRunning}ms`));
});