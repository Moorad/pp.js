const constants = {
	ErfImpAn: [0.00337916709551257388990745, -0.00073695653048167948530905, -0.374732337392919607868241, 0.0817442448733587196071743, -0.0421089319936548595203468, 0.0070165709512095756344528, -0.00495091255982435110337458, 0.000871646599037922480317225],
	ErfImpAd: [1, -0.218088218087924645390535, 0.412542972725442099083918, -0.0841891147873106755410271, 0.0655338856400241519690695, -0.0120019604454941768171266, 0.00408165558926174048329689, -0.000615900721557769691924509],
	ErfImpBn: [-0.0361790390718262471360258, 0.292251883444882683221149, 0.281447041797604512774415, 0.125610208862766947294894, 0.0274135028268930549240776, 0.00250839672168065762786937],
	ErfImpBd: [1, 1.8545005897903486499845, 1.43575803037831418074962, 0.582827658753036572454135, 0.124810476932949746447682, 0.0113724176546353285778481],
	ErfImpCn: [-0.0397876892611136856954425, 0.153165212467878293257683, 0.191260295600936245503129, 0.10276327061989304213645, 0.029637090615738836726027, 0.0046093486780275489468812, 0.000307607820348680180548455],
	ErfImpCd: [1, 1.95520072987627704987886, 1.64762317199384860109595, 0.768238607022126250082483, 0.209793185936509782784315, 0.0319569316899913392596356, 0.00213363160895785378615014],
	ErfImpDn: [-0.0300838560557949717328341, 0.0538578829844454508530552, 0.0726211541651914182692959, 0.0367628469888049348429018, 0.00964629015572527529605267, 0.00133453480075291076745275, 0.778087599782504251917881e-4],
	ErfImpDd: [1, 1.75967098147167528287343, 1.32883571437961120556307, 0.552528596508757581287907, 0.133793056941332861912279, 0.0179509645176280768640766, 0.00104712440019937356634038, -0.106640381820357337177643e-7],
	ErfImpEn: [-0.0117907570137227847827732, 0.014262132090538809896674, 0.0202234435902960820020765, 0.00930668299990432009042239, 0.00213357802422065994322516, 0.00025022987386460102395382, 0.120534912219588189822126e-4],
	ErfImpEd: [1, 1.50376225203620482047419, 0.965397786204462896346934, 0.339265230476796681555511, 0.0689740649541569716897427, 0.00771060262491768307365526, 0.000371421101531069302990367],
	ErfImpFn: [-0.00546954795538729307482955, 0.00404190278731707110245394, 0.0054963369553161170521356, 0.00212616472603945399437862, 0.000394984014495083900689956, 0.365565477064442377259271e-4, 0.135485897109932323253786e-5],
	ErfImpFd: [1, 1.21019697773630784832251, 0.620914668221143886601045, 0.173038430661142762569515, 0.0276550813773432047594539, 0.00240625974424309709745382, 0.891811817251336577241006e-4, -0.465528836283382684461025e-11],
	ErfImpGn: [-0.00270722535905778347999196, 0.0013187563425029400461378, 0.00119925933261002333923989, 0.00027849619811344664248235, 0.267822988218331849989363e-4, 0.923043672315028197865066e-6],
	ErfImpGd: [1, 0.814632808543141591118279, 0.268901665856299542168425, 0.044987721610304111869498900381759663320248459168994, 0.000131571897888596914350697, 0.404815359675764138445257e-11],
	ErfImpHn: [-0.00109946720691742196814323, 0.000406425442750422675169153, 0.000274499489416900707787024, 0.465293770646659383436343e-4, 0.320955425395767463401993e-5, 0.778286018145020892261936e-7],
	ErfImpHd: [1, 0.588173710611846046373373, 0.139363331289409746077541, 0.0166329340417083678763028, 0.00100023921310234908642639, 0.24254837521587225125068e-4],
	ErfImpIn: [-0.00056907993601094962855594, 0.000169498540373762264416984, 0.518472354581100890120501e-4, 0.382819312231928859704678e-5, 0.824989931281894431781794e-7],
	ErfImpId: [1, 0.339637250051139347430323, 0.043472647870310663055044, 0.00248549335224637114641629, 0.535633305337152900549536e-4, -0.117490944405459578783846e-12],
	ErfImpJn: [-0.000241313599483991337479091, 0.574224975202501512365975e-4, 0.115998962927383778460557e-4, 0.581762134402593739370875e-6, 0.853971555085673614607418e-8],
	ErfImpJd: [1, 0.233044138299687841018015, 0.0204186940546440312625597, 0.000797185647564398289151125, 0.117019281670172327758019e-4],
	ErfImpKn: [-0.000146674699277760365803642, 0.162666552112280519955647e-4, 0.269116248509165239294897e-5, 0.979584479468091935086972e-7, 0.101994647625723465722285e-8],
	ErfImpKd: [1, 0.165907812944847226546036, 0.0103361716191505884359634, 0.000286593026373868366935721, 0.298401570840900340874568e-5],
	ErfImpLn: [-0.583905797629771786720406e-4, 0.412510325105496173512992e-5, 0.431790922420250949096906e-6, 0.993365155590013193345569e-8, 0.653480510020104699270084e-10],
	ErfImpLd: [1, 0.105077086072039915406159, 0.00414278428675475620830226, 0.726338754644523769144108e-4, 0.477818471047398785369849e-6],
	ErfImpMn: [-0.196457797609229579459841e-4, 0.157243887666800692441195e-5, 0.543902511192700878690335e-7, 0.317472492369117710852685e-9],
	ErfImpMd: [1, 0.052803989240957632204885, 0.000926876069151753290378112, 0.541011723226630257077328e-5, 0.535093845803642394908747e-15],
	ErfImpNn: [-0.789224703978722689089794e-5, 0.622088451660986955124162e-6, 0.145728445676882396797184e-7, 0.603715505542715364529243e-10],
	ErfImpNd: [1, 0.0375328846356293715248719, 0.000467919535974625308126054, 0.193847039275845656900547e-5],
	ErvInvImpAn: [-0.000508781949658280665617, -0.00836874819741736770379, 0.0334806625409744615033, -0.0126926147662974029034, -0.0365637971411762664006, 0.0219878681111168899165, 0.00822687874676915743155, -0.00538772965071242932965],
	ErvInvImpAd: [1, -0.970005043303290640362, -1.56574558234175846809, 1.56221558398423026363, 0.662328840472002992063, -0.71228902341542847553, -0.0527396382340099713954, 0.0795283687341571680018, -0.00233393759374190016776, 0.000886216390456424707504],
	ErvInvImpBn: [-0.202433508355938759655, 0.105264680699391713268, 8.37050328343119927838, 17.6447298408374015486, -18.8510648058714251895, -44.6382324441786960818, 17.445385985570866523, 21.1294655448340526258, -3.67192254707729348546],
	ErvInvImpBd: [1, 6.24264124854247537712, 3.9713437953343869095, -28.6608180499800029974, -20.1432634680485188801, 48.5609213108739935468, 10.8268667355460159008, -22.6436933413139721736, 1.72114765761200282724],
	ErvInvImpCn: [-0.131102781679951906451, -0.163794047193317060787, 0.117030156341995252019, 0.387079738972604337464, 0.337785538912035898924, 0.142869534408157156766, 0.0290157910005329060432, 0.00214558995388805277169, -0.679465575181126350155e-6, 0.285225331782217055858e-7, -0.681149956853776992068e-9],
	ErvInvImpCd: [1, 3.46625407242567245975, 5.38168345707006855425, 4.77846592945843778382, 2.59301921623620271374, 0.848854343457902036425, 0.152264338295331783612, 0.01105924229346489121],
	ErvInvImpDn: [-0.0350353787183177984712, -0.00222426529213447927281, 0.0185573306514231072324, 0.00950804701325919603619, 0.00187123492819559223345, 0.000157544617424960554631, 0.460469890584317994083e-5, -0.230404776911882601748e-9, 0.266339227425782031962e-11],
	ErvInvImpDd: [1, 1.3653349817554063097, 0.762059164553623404043, 0.220091105764131249824, 0.0341589143670947727934, 0.00263861676657015992959, 0.764675292302794483503e-4],
	ErvInvImpEn: [-0.0167431005076633737133, -0.00112951438745580278863, 0.00105628862152492910091, 0.000209386317487588078668, 0.149624783758342370182e-4, 0.449696789927706453732e-6, 0.462596163522878599135e-8, -0.281128735628831791805e-13, 0.99055709973310326855e-16],
	ErvInvImpEd: [1, 0.591429344886417493481, 0.138151865749083321638, 0.0160746087093676504695, 0.000964011807005165528527, 0.275335474764726041141e-4, 0.282243172016108031869e-6],
	ErvInvImpFn: [-0.0024978212791898131227, -0.779190719229053954292e-5, 0.254723037413027451751e-4, 0.162397777342510920873e-5, 0.396341011304801168516e-7, 0.411632831190944208473e-9, 0.145596286718675035587e-11, -0.116765012397184275695e-17],
	ErvInvImpFd: [1, 0.207123112214422517181, 0.0169410838120975906478, 0.000690538265622684595676, 0.145007359818232637924e-4, 0.144437756628144157666e-6, 0.509761276599778486139e-9],
	ErvInvImpGn: [-0.000539042911019078575891, -0.28398759004727721098e-6, 0.899465114892291446442e-6, 0.229345859265920864296e-7, 0.225561444863500149219e-9, 0.947846627503022684216e-12, 0.135880130108924861008e-14, -0.348890393399948882918e-21],
	ErvInvImpGd: [1, 0.0845746234001899436914, 0.00282092984726264681981, 0.468292921940894236786e-4, 0.399968812193862100054e-6, 0.161809290887904476097e-8, 0.231558608310259605225e-11]

};

class Vector {
	constructor(value) {
		this.value = value;
		this.classType = 'vector';
	}

	pointwiseAdd(value) {
		if (!Array.isArray(value) && typeof (value) !== 'number' && value.classType !== 'vector') throw 'Cannot perform the operation with a value of type ' + typeof (value);
		if (Array.isArray(value)) {
			if (value.length !== this.value.length) {
				throw 'The vector and array are not dimensionally consistent';
			}
			return new Vector(this.value.map((x, i) => x + value[i]));
		} else if (value.classType == 'vector') {
			if (value.value.length !== this.value.length) {
				throw 'The vectors must have be dimensions';
			}
			return new Vector(this.value.map((x, i) => x + value.value[i]));
		} else {
			// console.log(this.value.map(x => x * value))
			return new Vector(this.value.map(x => x + value));
		}
	}

	pointwiseMultiply(value) {
		if (!Array.isArray(value) && typeof (value) !== 'number' && value.classType !== 'vector') throw 'Cannot perform the operation with a value of type ' + typeof (value);
		if (Array.isArray(value)) {
			if (value.length !== this.value.length) {
				throw 'The vector and array are not dimensionally consistent';
			}
			return new Vector(this.value.map((x, i) => x * value[i]));
		} else if (value.classType == 'vector') {
			if (value.value.length !== this.value.length) {
				throw 'The vectors must have be dimensions';
			}
			return new Vector(this.value.map((x, i) => x * value.value[i]));
		} else {
			// console.log(this.value.map(x => x * value))
			return new Vector(this.value.map(x => x * value));
		}
	}

	pointwisePow(value) {
		return new Vector(this.value.map(x => Math.pow(x, value)));
	}

	pointwiseNegate() {
		return new Vector(this.value.map(x => -x));
	}

	pointwiseDivide(value) {
		return new Vector(this.value.map(x => x / value));
	}

	pointwiseExp() {
		return new Vector(this.value.map(x => Math.exp(x)));
	}

	pointwiseSubtract(value) {
		if (!Array.isArray(value) && typeof (value) !== 'number' && value.classType !== 'vector') throw 'Cannot perform the operation with a value of type ' + typeof (value);
		if (Array.isArray(value)) {
			if (value.length !== this.value.length) {
				throw 'The vector and array are not dimensionally consistent';
			}
			return new Vector(this.value.map((x, i) => x - value[i]));
		} else if (value.classType == 'vector') {
			if (value.value.length !== this.value.length) {
				throw 'The vectors must have the same dimensions';
			}
			return new Vector(this.value.map((x, i) => x - value.value[i]));
		} else {
			return new Vector(this.value.map(x => x - value));
		}
	}

	L2Norm() {
		var temp = this.value.map(x => x);
		var accumulator = 0;
		for (var i = 0; i < temp.length; i++) {
			accumulator += Math.pow(temp[i], 2);
		}
		return Math.sqrt(accumulator);
	}

	dotProduct(value) {
		return this.value.map((x, i) => x * value.value[i]).reduce((acc, curr) => acc + curr);
	}

	// getMax() {
	// 	return Math.max.apply()
	// }
}

class LinearSpline {
	constructor(x = [0, 0], c0 = [0, 0], c1 = [0]) {
		if ((x.length != c0.length + 1 && x.length != c0.length) || x.length != c1.length + 1) {
			throw 'Values must be the same length';
		}

		if (x.length < 2) {
			throw 'Array is too small';
		}

		this.x = x;
		this.c0 = c0;
		this.c1 = c1;
	}

	interpolateSorted(x, y) {
		if (x.length != y.length) {
			throw 'Values must be the same length';
		}

		if (x.length < 2) {
			throw 'Array is too small';
		}

		var c1 = new Array(x.length - 1);
		for (var i = 0; i < c1.length; i++) {
			c1[i] = (y[i + 1] - y[i]) / (x[i + 1] - x[i]);
		}

		return new LinearSpline(x, y, c1);
	}

	interpolate(t) {
		var k = this.leftSegmentIndex(t);
		return this.c0[k] + (t - this.x[k]) * this.c1[k];
	}

	leftSegmentIndex(t) {
		var index = binarySearch(this.x, t, (a, b) => a - b);
		if (index < 0) {
			index = ~index - 1;
		}

		return Math.min(Math.max(index, 0), this.x.length - 2);
	}
}

// class Queue {
// 	constructor(arr = []) {
// 		this.elements = arr;
// 	}

// 	enqueue(x) {
// 		this.elements.push(x);
// 	}

// 	dequeue(x) {
// 		this.elements = this.elements.shift();
// 	}


// }


function subtractArrays(arr1, arr2) {
	if (arr1.length != arr2.length) {
		throw 'The arrays must be the same length';
	}

	var results = [];

	for (var i = 0; i < arr1.length; i++) {
		results.push(arr1[i] - arr2[i]);
	}

	return results;
}

function binarySearch(arr, value, compareF) {
	var m = 0;
	var n = arr.length - 1;
	while (m <= n) {
		var k = (n + m) >> 1;
		var cmp = compareF(value, arr[k]);
		if (cmp > 0) {
			m = k + 1;
		} else if (cmp < 0) {
			n = k - 1;
		} else {
			return k;
		}
	}

	if (value < Math.max.apply(null, arr)) {
		for (var i = 0; i < arr.length; i++) {
			if (value < arr[i]) {
				return ~i;
			}
		}
	}
	return ~arr.length;
}

function getHypotenuse(arr) {
	if (arr.length != 2) {
		throw 'This funtion only accepts arrays with two values';
	}

	return Math.sqrt((arr[0] * arr[0]) + (arr[1] * arr[1]));
}

function getLength(arr, dimension) {
	var temp = arr;
	for (var i = 0; i < dimension; i++) {
		temp = temp[0];
	}

	return temp.length;
}

// var test = new Vector([1,2,3,4,10,20,30]);

// var x = test.pointwiseMultiply((test.pointwiseNegate().pointwiseMultiply(3 - 1).pointwiseDivide(2)).pointwiseExp())
// console.log(test.pointwiseMultiply(x.pointwiseMultiply(2)))

function getHitObjectRadius(circleSize) {
	const radiusConstant = 64;
	var scale = (1.0 - 0.7 * (circleSize - 5) / 5) / 2;
	return radiusConstant * scale;
}

function getSliderCombo(beatmap, hitObject) {
	if (hitObject.objectName != 'slider') return 0;
	var sliderMultiplier = parseFloat(beatmap.SliderMultiplier);
	var sliderTickRate = parseInt(beatmap.SliderTickRate, 10);

	var timingPoints = beatmap.timingPoints;
	var currentTiming = timingPoints[0];

	var osupxPerBeat = sliderMultiplier * 100 * currentTiming.velocity;
	var tickLength = osupxPerBeat / sliderTickRate;

	var tickPerSide = Math.ceil((Math.floor(hitObject.pixelLength / tickLength * 100) / 100) - 1);
	return (hitObject.edges.length - 1) * (tickPerSide + 1) + 1;
}

function logistic(x) {
	return (1 / (Math.exp(-x) + 1));
}

function findRootExpand(f, guessLowerBound, guessUpperBound, accuracy = 1E-08, maxIterations = 100, expandFactor = 1.6, maxExpandIteratons = 100) {
	var temp = expandReduce(f, guessLowerBound, guessUpperBound, expandFactor, maxExpandIteratons, maxExpandIteratons * 10);
	guessLowerBound = temp[0];
	guessUpperBound = temp[1];
	return findRoot(f, guessLowerBound, guessUpperBound, accuracy, maxIterations);
	// https://github.com/mathnet/mathnet-numerics/blob/master/src/Numerics/RootFinding/Brent.cs
}

function expandReduce(f, lowerBound, upperBound, expansionFactor = 1.6, expansionMaxIterations = 50, reduceSubdivisions = 100) {
	var temp = expand(f, lowerBound, upperBound, expansionFactor, expansionMaxIterations);
	if (temp[2]) {
		return temp;
	} else {
		return reduce(f, lowerBound, upperBound, reduceSubdivisions);
	}
}

function expand(f, lowerBound, upperBound, factor = 1.6, maxIterations = 50) {

	var originalLowerBound = lowerBound;
	var originalUpperBound = upperBound;

	if (lowerBound >= upperBound) {
		throw 'Out of Range';
	}

	var fmin = f(lowerBound);
	var fmax = f(upperBound);

	for (var i = 0; i < maxIterations; i++) {
		if (Math.sign(fmin) != Math.sign(fmax)) {
			return [lowerBound, upperBound, true];
		}

		if (Math.abs(fmin) < Math.abs(fmax)) {
			lowerBound += factor * (lowerBound - upperBound);
			fmin = f(lowerBound);
		} else {
			upperBound += factor * (upperBound - lowerBound);
			fmax = f(upperBound);
		}
	}

	lowerBound = originalLowerBound;
	upperBound = originalUpperBound;
	return [lowerBound, upperBound, false];
}

function reduce(f, lowerBound, upperBound, subdivisions = 1000) {
	var originalLowerBound = lowerBound;
	var originalUpperBound = upperBound;

	if (lowerBound >= upperBound) {
		throw 'Out of range';
	}

	// TODO: Consider binary-style search instead of linear scan
	var fmin = f(lowerBound);
	var fmax = f(upperBound);

	if (Math.sign(fmin) != Math.sign(fmax)) {
		return [lowerBound, upperBound, true];
	}

	var subdiv = (upperBound - lowerBound) / subdivisions;
	var smin = lowerBound;
	var sign = Math.sign(fmin);

	for (var k = 0; k < subdivisions; k++) {
		var smax = smin + subdiv;
		var sfmax = f(smax);
		if (!isFinite(sfmax)) {
			smin = smax;
			continue;
		}

		if (Math.sign(sfmax) != sign) {
			lowerBound = smin;
			upperBound = smax;
			return [lowerBound, upperBound, true];
		}

		smin = smax;
	}

	lowerBound = originalLowerBound;
	upperBound = originalUpperBound;
	return [lowerBound, upperBound, false];
}

function findRoot(f, lowerBound, upperBound, accuracy, maxIterations) {
	var temp = tryFindRoot(f, lowerBound, upperBound, accuracy, maxIterations);

	if (temp[0]) {
		return temp[1];
	}

	throw 'Root finding failed';
}

function tryFindRoot(f, lowerBound, upperBound, accuracy, maxIterations) {
	if (accuracy <= 0) {
		throw 'Accuracy must be greater than zero';
	}

	var fmin = f(lowerBound);
	var fmax = f(upperBound);
	var froot = fmax;
	var d = 0.0;
	var e = 0.0;

	var root = upperBound;
	var xMid = NaN;

	if (Math.sign(fmin) == Math.sign(fmax)) {
		return [false, root];
	}

	for (var i = 0; i <= maxIterations; i++) {
		if (Math.sign(froot) == Math.sign(fmax)) {
			upperBound = lowerBound;
			fmax = fmin;
			e = d = root - lowerBound;
		}

		if (Math.abs(fmax) < Math.abs(froot)) {
			lowerBound = root;
			root = upperBound;
			upperBound = lowerBound;
			fmin = froot;
			froot = fmax;
			fmax = fmin;
		}

		var xAcc1 = (2 * Math.pow(2, -53)) * Math.abs(root) + 0.5 * accuracy;
		var xMidOld = xMid;
		xMid = (upperBound - root) / 2.0;

		if (Math.abs(xMid) <= xAcc1 || almostEqualNormRelative(froot, 0, froot, accuracy)) {
			return [true, root];
		}

		if (xMid == xMidOld) {
			return [false, root];
		}

		if (Math.abs(e) >= xAcc1 && Math.abs(fmin) > Math.abs(froot)) {
			// Attempt inverse quadratic interpolation
			var s = froot / fmin;
			var p;
			var q;
			if (almostEqualRelative(lowerBound, upperBound)) {
				p = 2.0 * xMid * s;
				q = 1.0 - s;
			} else {
				q = fmin / fmax;
				var r = froot / fmax;
				p = s * (2.0 * xMid * q * (q - r) - (root - lowerBound) * (r - 1.0));
				q = (q - 1.0) * (r - 1.0) * (s - 1.0);
			}

			if (p > 0.0) {
				q = -q;
			}

			p = Math.abs(p);
			if (2.0 * p < Math.min(3.0 * xMid * q - Math.abs(xAcc1 * q), Math.abs(e * q))) {
				e = d;
				d = p / q;
			} else {
				d = xMid;
				e = d;
			}
		} else {
			d = xMid;
			e = d;
		}

		lowerBound = root;
		fmin = froot;
		if (Math.abs(d) > xAcc1) {
			root += d;
		} else {
			root += xMid >= 0 ? (xAcc1 >= 0 ? xAcc1 : -xAcc1) : (xAcc1 >= 0 ? -xAcc1 : xAcc1);
		}

		froot = f(root);
	}

	return [false, root];
}

function almostEqualNormRelative(a, b, diff, maximumError) {
	if (!isFinite(a) || !isFinite(b)) {
		return a == b;
	}

	if (isNaN(a) || isNaN(b)) {
		return false;
	}

	if (Math.abs(a) < (2 * Math.pow(2, -53)) || Math.abs(b) < (2 * Math.pow(2, -53))) {
		return Math.abs(diff) < maximumError;
	}

	if ((a == 0 && Math.abs(b) < maximumError) || (b == 0 && Math.abs(a) < maximumError)) {
		return true;
	}

	return Math.abs(diff) < maximumError * Math.max(Math.abs(a), Math.abs(b));
}


function almostEqualRelative(a, b, maximumError = ((2 * Math.pow(2, -53)) * 10)) {
	return almostEqualNormRelative(a, b, a - b, maximumError);
}

function bisectionFindRoot(f, lowerBound, upperBound, accuracy = 1e-14, maxIterations = 100) {
	var root = bisectionTryFindRoot(f, lowerBound, upperBound, accuracy, maxIterations);

	if (root[0]) {
		return root[1];
	}

	throw 'Root Finding Failed';
}

function bisectionTryFindRoot(f, lowerBound, upperBound, accuracy, maxIterations) {
	var root;

	if (accuracy <= 0) {
		throw 'Accuracy must be greater than zero';
	}

	if (upperBound < lowerBound) {
		var t = upperBound;
		upperBound = lowerBound;
		lowerBound = t;
	}

	var fmin = f(lowerBound);
	if (Math.sign(fmin) == 0) {
		root = lowerBound;
		return [true, root];
	}

	var fmax = f(upperBound);
	if (Math.sign(fmax) == 0) {
		root = upperBound;
		return [true, root];
	}

	root = 0.5 * (lowerBound + upperBound);

	// bad bracketing?
	if (Math.sign(fmin) == Math.sign(fmax)) {
		return [false, root];
	}

	for (var i = 0; i <= maxIterations; i++) {
		var froot = f(root);

		if (upperBound - lowerBound <= 2 * accuracy && Math.abs(froot) <= accuracy) {
			return [true, root];
		}

		if ((lowerBound == root) || (upperBound == root)) {
			// accuracy not sufficient, but cannot be improved further
			return [false, root];
		}

		if (Math.sign(froot) == Math.sign(fmin)) {
			lowerBound = root;
			fmin = froot;
		} else if (Math.sign(froot) == Math.sign(fmax)) {
			upperBound = root;
			fmax = froot;
		} else // Math.Sign(froot) == 0
		{
			return true;
		}

		root = 0.5 * (lowerBound + upperBound);
	}

	return [false, root];
}

function erf(x) {
	if (x == 0) {
		return 0;
	}

	if (isNaN(x)) {
		return NaN;
	}

	if (!isFinite(x) && Math.sign(x) == 1) {
		return 1;
	}

	if (!isFinite(x) && Math.sign(x) == -1) {
		return -1;
	}

	return erfImp(x, false);
}

function erfImp(z, invert) {
	if (z < 0) {
		if (!invert) {
			return -erfImp(-z, false);
		}

		if (z < -0.5) {
			return 2 - erfImp(-z, true);
		}

		return 1 + erfImp(-z, false);
	}

	var result;

	if (z < 0.5) {
		if (z < 1e-10) {
			result = (z * 1.125) + (z * 0.003379167095512573896158903121545171688);
		} else {
			result = (z * 1.125) + (z * evaluatePolynomial(z, constants.ErfImpAn) / evaluatePolynomial(z, constants.ErfImpAd));
		}
	} else if (z < 110) {
		invert = !invert;
		var r;
		var b;
		if (z < 0.75) {
			r = evaluatePolynomial(z - 0.5, constants.ErfImpBn) / evaluatePolynomial(z - 0.5, constants.ErfImpBd);
			b = 0.3440242112;
		} else if (z < 1.25) {
			r = evaluatePolynomial(z - 0.75, constants.ErfImpCn) / evaluatePolynomial(z - 0.75, constants.ErfImpCd);
			b = 0.419990927;
		} else if (z < 2.25) {
			r = evaluatePolynomial(z - 1.25, constants.ErfImpDn) / evaluatePolynomial(z - 1.25, constants.ErfImpDd);
			b = 0.4898625016;
		} else if (z < 3.5) {
			r = evaluatePolynomial(z - 2.25, constants.ErfImpEn) / evaluatePolynomial(z - 2.25, constants.ErfImpEd);
			b = 0.5317370892;
		} else if (z < 5.25) {
			r = evaluatePolynomial(z - 3.5, constants.ErfImpFn) / evaluatePolynomial(z - 3.5, constants.ErfImpFd);
			b = 0.5489973426;
		} else if (z < 8) {
			r = evaluatePolynomial(z - 5.25, constants.ErfImpGn) / evaluatePolynomial(z - 5.25, constants.ErfImpGd);
			b = 0.5571740866;
		} else if (z < 11.5) {
			r = evaluatePolynomial(z - 8, constants.ErfImpHn) / evaluatePolynomial(z - 8, constants.ErfImpHd);
			b = 0.5609807968;
		} else if (z < 17) {
			r = evaluatePolynomial(z - 11.5, constants.ErfImpIn) / evaluatePolynomial(z - 11.5, constants.ErfImpId);
			b = 0.5626493692;
		} else if (z < 24) {
			r = evaluatePolynomial(z - 17, constants.ErfImpJn) / evaluatePolynomial(z - 17, constants.ErfImpJd);
			b = 0.5634598136;
		} else if (z < 38) {
			r = evaluatePolynomial(z - 24, constants.ErfImpKn) / evaluatePolynomial(z - 24, constants.ErfImpKd);
			b = 0.5638477802;
		} else if (z < 60) {
			r = evaluatePolynomial(z - 38, constants.ErfImpLn) / evaluatePolynomial(z - 38, constants.ErfImpLd);
			b = 0.5640528202;
		} else if (z < 85) {
			r = evaluatePolynomial(z - 60, constants.ErfImpMn) / evaluatePolynomial(z - 60, constants.ErfImpMd);
			b = 0.5641309023;
		} else {
			r = evaluatePolynomial(z - 85, constants.ErfImpNn) / evaluatePolynomial(z - 85, constants.ErfImpNd);
			b = 0.5641584396;
		}

		var g = Math.exp(-z * z) / z;
		result = (g * b) + (g * r);
	} else {
		result = 0;
		invert = !invert;
	}

	if (invert) {
		result = 1 - result;
	}

	return result;
}

function evaluatePolynomial(z, coefficients) {
	var sum = coefficients[coefficients.length - 1];
	for (var i = coefficients.length - 2; i >= 0; --i) {
		sum *= z;
		sum += coefficients[i];
	}

	return sum;
}

function erfc(x) {
	if (x == 0) {
		return 1;
	}

	if (isNaN(x)) {
		return NaN;
	}

	if (!isFinite(x) && Math.sign(x) == 1) {
		return 0;
	}

	if (!isFinite(x) && Math.sign(x) == -1) {
		return 2;
	}

	return erfImp(x, true);
}

function erfInv(z) {
	if (z == 0.0) {
		return 0.0;
	}

	if (z >= 1.0) {
		return Infinity;
	}

	if (z <= -1.0) {
		return -Infinity;
	}

	var p;
	var q;
	var s;
	if (z < 0) {
		p = -z;
		q = 1 - p;
		s = -1;
	} else {
		p = z;
		q = 1 - z;
		s = 1;
	}

	return erfInvImpl(p, q, s);
}

function erfInvImpl(p, q, s) {
	var result;

	if (p <= 0.5) {
		const y = 0.0891314744949340820313;
		var g = p * (p + 10);
		var r = evaluatePolynomial(p, constants.ErvInvImpAn) / evaluatePolynomial(p, constants.ErvInvImpAd);
		result = (g * y) + (g * r);
	} else if (q >= 0.25) {
		const y = 2.249481201171875;
		var g = Math.sqrt(-2 * Math.log(q));
		var xs = q - 0.25;
		var r = evaluatePolynomial(xs, constants.ErvInvImpBn) / evaluatePolynomial(xs, constants.ErvInvImpBd);
		result = g / (y + r);
	} else {
		var x = Math.sqrt(-Math.log(q));
		if (x < 3) {
			// Max error found: 1.089051e-20
			const y = 0.807220458984375;
			var xs = x - 1.125;
			var r = evaluatePolynomial(xs, constants.ErvInvImpCn) / evaluatePolynomial(xs, constants.ErvInvImpCd);
			result = (y * x) + (r * x);
		} else if (x < 6) {
			// Max error found: 8.389174e-21
			const y = 0.93995571136474609375;
			var xs = x - 3;
			var r = evaluatePolynomial(xs, constants.ErvInvImpDn) / evaluatePolynomial(xs, constants.ErvInvImpDd);
			result = (y * x) + (r * x);
		} else if (x < 18) {
			// Max error found: 1.481312e-19
			const y = 0.98362827301025390625;
			var xs = x - 6;
			var r = evaluatePolynomial(xs, constants.ErvInvImpEn) / evaluatePolynomial(xs, constants.ErvInvImpEd);
			result = (y * x) + (r * x);
		} else if (x < 44) {
			// Max error found: 5.697761e-20
			const y = 0.99714565277099609375;
			var xs = x - 18;
			var r = evaluatePolynomial(xs, constants.ErvInvImpFn) / evaluatePolynomial(xs, constants.ErvInvImpFd);
			result = (y * x) + (r * x);
		} else {
			// Max error found: 1.279746e-20
			const y = 0.99941349029541015625;
			var xs = x - 44;
			var r = evaluatePolynomial(xs, constants.ErvInvImpGn) / evaluatePolynomial(xs, constants.ErvInvImpGd);
			result = (y * x) + (r * x);
		}
	}

	return s * result;
}

function bitShiftLeft(num, bitShift, bitCount) {
	var bitsToConvert = bitShift % bitCount;

	if (bitsToConvert == 63) {
		return -Math.pow(2, bitCount - 1);
	}

	var bits = new Array(bitCount).fill('0');

	var numLeft = num;
	var pos = bits.length - 1;

	while (numLeft > 0) {
		if (numLeft >= Math.pow(2, pos)) {
			numLeft -= Math.pow(2, pos);
			bits[pos] = '1';
		}
		pos--;
	}

	for (var i = 0; i < bitsToConvert; i++) {
		bits.unshift('0');
		bits.pop();
	}

	return bits.map((x, i) => x == '1' ? Math.pow(2, i) : 0).reduce((acc, curr) => acc + curr);
}

function linearSpaced(length, start, stop) {
	if (length < 0) {
		throw 'Out of range';
	}

	if (length == 0) return [];
	if (length == 1) return [stop];

	var step = (stop - start) / (length - 1);

	var data = new Array(length);
	for (var i = 0; i < data.length; i++) {
		data[i] = start + i * step;
	}
	data[data.length - 1] = stop;
	return data;
}

function getHitResults(accuracy, beatmap, countMiss, countMeh = null, countGood = null) {
	var countGreat;

	var totalResultCount = beatmap.hitObjects.length;

	if (countMeh != null || countGood != null) {
		countGreat = totalResultCount - (countGood == null ? 0 : countGood) - (countMeh == null ? 0 : countMeh) - countMiss;
	} else {
		// Let Great=3, Good=1, Meh=2, Miss=0. The total should be this.
		var targetTotal = Math.round(accuracy * totalResultCount * 3);

		// Start by assuming every non miss is a good
		// This is how much increase is needed by greats and mehs
		var delta = targetTotal - (totalResultCount - countMiss);

		// Each great increases total by 5 (great-meh=5)
		countGreat = delta / 2;
		// Each meh increases total by 1 (good-meh=1). Covers remaining difference.
		countMeh = delta % 2;
		// Goods are left over. Could be negative if impossible value of amountMiss chosen
		countGood = totalResultCount - countGreat - countMeh - countMiss;
	}

	return {
		countGreat: countGreat,
		countGood: countGood == null ? 0 : countGood,
		countMeh: countMeh == null ? 0 : countMeh,
		countMiss: countMiss
	};
}

function getAccuracy(countGreat, countGood, countMeh, countMiss) {
	var total = countGreat + countGood + countMeh + countMiss;
	return ((6 * countGreat) + (2 * countGood) + countMeh) / (6 * total);
}

module.exports = {
	Vector: Vector,
	LinearSpline: LinearSpline,
	getHitObjectRadius: getHitObjectRadius,
	getSliderCombo: getSliderCombo,
	getHitResults: getHitResults,
	getAccuracy: getAccuracy,
	subtractArrays: subtractArrays,
	arrays: {
		subtract: subtractArrays,
		binarySearch: binarySearch,
		getLength: getLength
	},
	linearSpaced: linearSpaced,
	getHypotenuse: getHypotenuse,
	logistic: logistic,
	findRoot: findRoot,
	findRootExpand: findRootExpand,
	bisectionFindRoot: bisectionFindRoot,
	erf: erf,
	erfc: erfc,
	erfInv: erfInv,
	bitShiftLeft: bitShiftLeft
};


// Test