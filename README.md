# Note:
This is still a very work in progress project and there is a lot bugs that haven't been fixed yet. (For example DT and HT not implemented). If you choose to use this package please check for new updates regularly.

This is a pp calculator that is fully implemented with Javascript for the new delta_t's new pp algorithm.
This was primarily made for [The Beautiful Bot](https://github.com/moorad/the-beautiful-bot) but I thought it would be a good idea to make it its own package and make it available for everyone.

Version implemented: [21c19dd](https://github.com/HeBuwei/osu/tree/21c19dd00727053df554540374cde2dd7443ef81)

This will be regularly updated as new updates roll out. Please understand that sometimes I'm busy with University and stuff and changes (especially big ones) take time to implement and test.

# Accuracy
Currently the code is not completely finished and there is a couple of minor fixes and code cleaning to do but right know SR calculation is fairly accurate (Absolute error: ± 0.000001)

For pp however there is a little issue that I havent fixed yet which is making values a lot more inaccurate than SR calculations (relative error: 0.02393%) (Absolute error: ± 1)

Keep in mind that this will keep getting updated and improved both in performance and accuracy

# How to use

First of all you need to process a .osu file in order to calculate difficulty and performance points. There is three main ways to do this, process a string, process a file and process a stream

### Process string content
In this example I'm using request to download the .osu file from the osu's website and passing it as a string to `processContent()`

```js
const tbbpp = require('tbbpp');
const request = require('request');

request('https://osu.ppy.sh/osu/1476606', {
	encoding: null
}, (err, res, body) => {
	var beatmapData = tbbpp.processContent(body); // This is synchronous
	console.log(beatmapData);
});
```

### Process a file
This is very similar to the example above. The only difference is that this extracts the data from a file rather than a string and its asynchronous.

```js
const tbbpp = require('tbbpp');

// The file path can be relative or absolute
tbbpp.processFile('./file.osu', (beatmapData) => {
	console.log(beatmapData);
});
```

### Process a stream
This is basically the same thing as above but using a stream instead.

```js
const tbbpp = require('tbbpp');

var stream = fs.createReadStream('./file.osu');

tbbpp.processStream(stream, (beatmapData) => {
	console.log(beatmapData);
});
```

### Calculating difficulty
Building on the examples above, you can calculate difficulty by using `calculateDifficulty()`. `calculateDifficulty()` returns a promise.

```js
const tbbpp = require('tbbpp');
const request = require('request');

request('https://osu.ppy.sh/osu/1476606', {
	encoding: null
}, (err, res, body) => {
	var beatmapData = tbbpp.processContent(body); // This is synchronous

	var mods = ''; //mod abbreviations (e.g. HDDT). Empty string means no mods 

	tbbpp.calculateDifficulty(beatmapData, mods).then((difficultyAttributes) => {
		console.log(difficultyAttributes);
	});
});
```

### Difficulty Attributes
The main ones are:
| Name            | Description                |
|-----------------|----------------------------|
| SR              | Star rating                |
| mods            | mods used                  |
| Length          | drain length               |
| tapSR           | Tap star rating            |
| fingerControlSR | Finger Control star rating |
| aimSR           | Aim star rating            |
| maxCombo        | Maximum combo of the map   |


### Calculating Performance Points
This is a similar process to `calculateDifficulty()`.
```js
const tbbpp = require('tbbpp');
const request = require('request');

request('https://osu.ppy.sh/osu/1476606', {
	encoding: null
}, (err, res, body) => {
	var beatmapData = tbbpp.processContent(body); // This is synchronous
	var score = {
		accuracy: 0.99
	};

	tbbpp.calculatePerformancePoints(beatmapData, score).then((performancePointsData) => {
		console.log(performancePointsData);
	});
});
```

### Score Data
As you can see I've passed in an object to `calculatePerformancePoints()`. This object will tell `calculatePerformancePoints()` the accuracy, mods, combo, etc.

| Name     | Description                                                                                         | Default value                     |
|----------|-----------------------------------------------------------------------------------------------------|-----------------------------------|
| accuracy | The accuracy of the play. This is passed in as a decimal rather than a percentage. Ranging from 0-1 | 1 (100% accuracy)                 |
| mods     | The combination of mods used. This is passed in as a string of the mod abbreviations e.g. HDDT      | (Empty string which means No Mod) |
| combo    | The combo achieved. This is just an integer                                                         | (The maximum combo of the map)    |
| misses   | The number of misses of the play. This is an integer                                                | 0                                 |
| count300 | Number of 300s (if accuracy is given, it will overwrite this)                                       | (Calculated using accuracy)       |
| count100 | Number of 100s (if accuracy is given, it will overwrite this)                                       | (Calculated using accuracy)       |
| count50  | Number of 50s (if accuracy is given it will overwrite this)                                         | (Calculated using accuracy)       |

### Performance Points Data
| Name       | Description                                                 |
|------------|-------------------------------------------------------------|
| pp         | Calculated total pp                                         |
| aimpp      | Calculated aim pp                                           |
| tappp      | Calculated tap pp                                           |
| accpp      | Calculated accuracy pp                                      |
| attributes | Difficulty attributes (Look at Difficulty Attributes above) |
