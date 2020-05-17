const OsuMovement = require('../Preprocessing/OsuMovement');
const HitProbabilities = require('../MathUtil/HitProbabilities');
const Utility = require('../Utility');
const PoissionBinomial = require('../MathUtil/PoissonBinomial');

const probabilityThreshold = 0.02;
const timeThresholdBase = 1200;
const tpMin = 0.1;
const tpMax = 100;
const probPrecision = 1e-4;
const timePrecision = 5e-4;
const maxIterations = 100;

const defaultCheeseLevel = 0.4;
const cheeseLevelCount = 11;

const missTPCount = 20;
const comboTPCount = 50;

function calculateAimAttributes(hitObjects, clockRate, strainHistory, noteDensities, beatmap) {
	var movements = createMovements(hitObjects, clockRate, strainHistory, false, null, beatmap);
	var movementsHidden = createMovements(hitObjects, clockRate, strainHistory, true, noteDensities, beatmap);

	var mapHitProbs = new HitProbabilities.HitProbabilities(movements, defaultCheeseLevel, comboTPCount);
	var fcProbTP = calculateFCProbTP(movements);
	var fcProbTPHidden = calculateFCProbTP(movementsHidden);

	var hiddenFactor = fcProbTPHidden / fcProbTP;

	var comboTPs = calculateComboTps(mapHitProbs);
	var fcTimeTP = comboTPs[comboTPs.length - 1];
	var [missTPs, missCounts] = calculateMissTPsMissCounts(movements, fcTimeTP);
	var [cheeseLevels, cheeseFactors] = calculateCheeseLevelsVSCheeseFactors(movements, fcProbTP);
	var cheeseNoteCount = getCheeseNoteCount(movements, fcProbTP);
	return [fcProbTP, hiddenFactor, comboTPs, missTPs, missCounts, cheeseNoteCount, cheeseLevels, cheeseFactors];
	
}

function createMovements(hitObjects, clockRate, strainHistory, hidden = false, noteDensities = null, beatmap) {
	var movements = [];
	
	if (hitObjects.length == 0) {
		return movements;
	}
	
	movements = movements.concat(OsuMovement.extractFirstMovement(hitObjects[0], beatmap));
	
	for (var i = 1; i < hitObjects.length; i++) {
		var objMinus2 = i > 3 ? hitObjects[i - 4] : null;
		var obj0 = i > 1 ? hitObjects[i - 2] : null;
		var obj1 = hitObjects[i - 1];
		var obj2 = hitObjects[i];
		var obj3 = i < hitObjects.length - 1 ? hitObjects[i + 1] : null;
		var tapStrain = strainHistory[i];
		
		if (hidden) {
			movements = movements.concat(OsuMovement.extractMovement(obj0, obj1, obj2, obj3, tapStrain, clockRate, hidden, noteDensities[i], objMinus2, beatmap));
		} else {
			movements = movements.concat(OsuMovement.extractMovement(obj0, obj1, obj2, obj3, tapStrain, clockRate, false, null, objMinus2, beatmap));
		}
	}
	
	return movements;
}


function calculateFCProbTP(movements, cheeseLevel = defaultCheeseLevel) {
	var fcProbabilityTPMin = calculateFCProb(movements, tpMin, cheeseLevel);
	
	if (fcProbabilityTPMin >= probabilityThreshold) {
		return tpMin;
	}
	
	var fcProbabilityTPMax = calculateFCProb(movements, tpMax, cheeseLevel);
	
	if (fcProbabilityTPMax <= probabilityThreshold) {
		return tpMax;
	}
	
	
	var fcProbMinusThreshold = (tp) => calculateFCProb(movements, tp, cheeseLevel) - probabilityThreshold;
	return Utility.findRoot(fcProbMinusThreshold, tpMin, tpMax, probPrecision, maxIterations);
}

function calculateFCTimeTP(mapHitProbs, sectionCount) {
	if (mapHitProbs.isEmpty(sectionCount)) {
		return 0;
	}
	
	var maxFCTime = mapHitProbs.minExpectedTimeForCount(tpMin, sectionCount);
	
	if (maxFCTime <= timeThresholdBase) {
		return tpMin;
	}
	
	var minFCTime = mapHitProbs.minExpectedTimeForCount(tpMax, sectionCount);
	
	if (minFCTime >= timeThresholdBase) {
		return tpMax;
	}
	
	var fcTimeMinusThreshold = (tp) => mapHitProbs.minExpectedTimeForCount(tp, sectionCount) - timeThresholdBase;
	return Utility.bisectionFindRoot(fcTimeMinusThreshold, tpMin, tpMax, timeThresholdBase * timePrecision, maxIterations);
}

function calculateMissTPsMissCounts(movements, fcTimeTP) {
	var missTPs = [missTPCount];
	var missCounts = [missTPCount];
	var fcProb = calculateFCProb(movements, fcTimeTP, defaultCheeseLevel);

	for (var i = 0; i < missTPCount; i++) {
		var missTP = fcTimeTP * (1 - Math.pow(i, 1.5) * 0.005);
		var missProbs = getMissProbs(movements, missTP);
		missTPs[i] = missTP;
		missCounts[i] = getMissCount(fcProb, missProbs);
	}
	return[missTPs, missCounts];
}

function getMissProbs(movements, tp) {
	var missProbs = [movements.length];
	
	for (var i = 0; i < movements.length; ++i) {
		var movement = movements[i];
		missProbs[i] = 1 - HitProbabilities.calculateCheeseHitProb(movement, tp, defaultCheeseLevel);
	}
	
	return missProbs;
}

function getMissCount(p, missProbabilities) {
	if (missProbabilities.reduce((acc, curr) => acc + curr) == 0) {
		return 0;
	}
	
	var distribution = new PoissionBinomial.PoissonBinomial(missProbabilities);
	
	var cdfMinusProb = missCount => distribution.cdf(missCount) - p;
	return Utility.findRootExpand(cdfMinusProb, -100, 1000);
}

function calculateCheeseLevelsVSCheeseFactors(movements, fcProbTP) {
	var cheeseLevels = [cheeseLevelCount];
	var cheeseFactors = [cheeseLevelCount];
	
	for (var i = 0; i < cheeseLevelCount; i++)
	{
		var cheeseLevel = i / (cheeseLevelCount - 1);
		cheeseLevels[i] = cheeseLevel;
		cheeseFactors[i] = calculateFCProbTP(movements, cheeseLevel) / fcProbTP;
	}
	return [cheeseLevels, cheeseFactors];
}

function getCheeseNoteCount(movements, tp) {
	var count = 0;
	for (var movement of movements) {
		var cheeseness = Utility.logistic((movement.IP12 / tp - 0.6) * 15) * movement.Cheesablility;
		count += cheeseness;
	}

	return count;
}

function calculateComboTps(hitProbabilities) {
	var ComboTPs = new Array(comboTPCount);

	for (var i = 1; i <= comboTPCount; ++i) {
		ComboTPs[i - 1] = calculateFCTimeTP(hitProbabilities, i);
	}

	return ComboTPs;
}

function calculateFCProb(movements, tp, cheeseLevel) {
	var fcProb = 1;

	movements.forEach((movement,i) => {
		var hitProb = HitProbabilities.calculateCheeseHitProb(movement, tp, cheeseLevel);
		fcProb *= hitProb;
	});

	return fcProb;
}

module.exports = {
	calculateAimAttributes: calculateAimAttributes
};