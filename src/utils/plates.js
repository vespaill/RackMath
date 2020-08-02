const MAX_PLATES = 8;

/**
 *
 * @param {Number} targetLoad The desired weight to load onto the barbell.
 * @param {Number} barLoad The weight value of the barbell.
 * @param {Object[]} plateObjs Array of plate objects.
 * @param {Number} plateObjs[].value The weight value of the plate.
 * @param {String} plateObjs[].color The color of the plate.
 * @param {Number} plateObjs[].quantity The quantity available of the plate.
 */
const calculatePlates = (targetLoad, barLoad, plateObjs) => {
  const success = true;
  const dif = Math.abs(targetLoad - barLoad);
  const lightestPlate = plateObjs.reduce((prev, cur) => (prev.value < cur.value ? prev : cur)).value;

  if (dif === 0) return { success, warn: 'justbar', calcdLoad: barLoad, calcdPlates: [] };
  else if (dif <= lightestPlate)
    return { success, warn: 'roundoff', calcdLoad: barLoad, calcdPlates: [], roundOff: { amount: dif, up: false } };

  const combinations = findAllValidCombs(targetLoad, barLoad, plateObjs);
  if (combinations.length === 0) return { success: false, warn: 'notEnoughRoom' };
  const bestCombination = findBestComb(combinations);
  const { calcdLoad, calcdPlates, roundOff: roundOffAmount } = bestCombination;

  let warn, roundOff;
  if (roundOffAmount) {
    warn = 'roundoff';
    roundOff = { amount: roundOffAmount, up: calcdLoad > targetLoad };
  }

  return { success, calcdLoad, calcdPlates, roundOff, warn };
};

/**
 * Using the given plate objects, finds all the possible and valid plate
 * combinations that meet the desired target load with reasonable round off.
 * @param {Number} targetLoad The desired weight to load onto the barbell.
 * @param {Number} barLoad The weight value of the barbell.
 * @param {Object[]} plateObjs Array of plate objects.
 * @param {Number} plateObjs[].value The weight value of the plate.
 * @param {String} plateObjs[].color The color of the plate.
 * @param {Number} plateObjs[].quantity The quantity available of the plate.
 */
const findAllValidCombs = (targetLoad, barLoad, plateObjs) => {
  // console.log('available plates:', availPlates);
  let cpyPlateObjs = plateObjs.map(plate => ({ ...plate }));
  let combinations = [];
  let subsets = calcSubsets(cpyPlateObjs); // array of arrays of plateGroups
  // console.log('all subsets of available plates:', subsets);

  for (let subset of subsets) {
    let subsetCpy = subset.map(plateGroup => ({ ...plateGroup })); // arrays of plateGroups
    while (subsetCpy.length > 0) {
      let { success, calcdLoad, calcdPlates, roundOff } = isValidComb(targetLoad, barLoad, subsetCpy);
      if (success) combinations.push({ calcdLoad, calcdPlates, roundOff });
      subsetCpy[0].quantity--;
      if (subsetCpy[0].quantity <= 0) subsetCpy.shift();
    }
  }
  // console.log('combinations:', combinations);
  return combinations;
};

/**
 * Determines whether it is possible to load a target weight onto a barbell,
 * given an array containing a finite number of plate objects, with a reasonable
 * amount of round off allowed.
 * If so, returns the calculated plate objects array.
 * @param {Number} targetLoad The desired weight to load onto the barbell.
 * @param {Number} barLoad The weight value of the barbell.
 * @param {Object[]} plateObjs Array of plate objects.
 * @param {Number} plateObjs[].value The weight value of the plate.
 * @param {String} plateObjs[].color The color of the plate.
 * @param {Number} plateObjs[].quantity The quantity available of the plate.
 */
const isValidComb = (targetLoad, barLoad, plateObjs) => {
  let coyPlateObjs = plateObjs.map(plate => ({ ...plate }));
  let calcdLoad = barLoad;
  const calcdPlates = [];
  const lightestPlate = plateObjs.reduce((prev, cur) => (prev.value < cur.value ? prev : cur)).value;

  for (let plateGroup of coyPlateObjs) {
    let { value, color, quantity } = plateGroup;
    for (let i = 0; i < quantity; ++i) {
      const nextLoad = value * 2;
      const dif = Math.abs(targetLoad - (calcdLoad + nextLoad));
      if (calcdLoad + nextLoad < targetLoad || dif < lightestPlate) {
        calcdLoad += nextLoad;
        calcdPlates.push({ value, color });
        if (calcdPlates.length > MAX_PLATES) return { success: false };
        plateGroup.quantity--;
      }
    }
  }
  const roundOff = Math.abs(targetLoad - calcdLoad);
  const heaviestPlate = plateObjs.reduce((prev, cur) => (prev.value > cur.value ? prev : cur)).value;
  // Only return success if roundOff is reasonable.
  if (roundOff > heaviestPlate * 2) return { success: false };
  return { success: true, calcdLoad, calcdPlates, roundOff };
};

/**
 * Given an array of possible plate combinations, returns the best one. That is,
 * one with the least amount of round off, with the least number of plates
 * possible, and one which favors heavier plates first.
 * @param {Object[]} combinations
 * @param {Number} combinations[].roundOff
 * @param {Number} combinations[].caldLoad The sum of every plate value in calcdPlate[].
 * @param {Object[]} combinations[].calcdPlates an array of plate objects with no quantity prop, but instead allowing duplicates.
 * @param {Number} combinations[].calcdPlates[].value The weight value of the plate.
 * @param {String} combinations[].calcdPlates[].color The color of the plate.
 */
const findBestComb = combinations => {
  console.log('combinations:', combinations);
  const minRoundOff = combinations.reduce((prev, cur) => (prev.roundOff < cur.roundOff ? prev : cur)).roundOff;
  const combsMinRoundOff = combinations.map(comb => ({ ...comb })).filter(comb => comb.roundOff === minRoundOff);
  const minNumPlates = combsMinRoundOff.reduce((prev, cur) =>
    prev.calcdPlates.length < cur.calcdPlates.length ? prev : cur
  ).calcdPlates.length;
  const combsMinNumPlates = combsMinRoundOff
    .map(comb => ({ ...comb }))
    .filter(comb => comb.calcdPlates.length === minNumPlates);
  const combsHeaviestPlates = combsMinNumPlates.reduce((prev, cur) => {
    const prevHeaviestPlate = prev.calcdPlates.reduce((prev, cur) => (prev.value > cur.value ? prev : cur)).value;
    const curHeaviestPlate = cur.calcdPlates.reduce((prev, cur) => (prev.value > cur.value ? prev : cur)).value;
    if (prevHeaviestPlate === curHeaviestPlate) {
      const prevHeaviestCount = prev.calcdPlates.reduce(
        (acc, cur) => (cur.value === prevHeaviestPlate ? acc + 1 : acc),
        0
      );
      const curHeaviestPlate = cur.calcdPlates.reduce(
        (acc, cur) => (cur.value === prevHeaviestPlate ? acc + 1 : acc),
        0
      );
      return prevHeaviestCount > curHeaviestPlate ? prev : cur;
    }
    return prevHeaviestPlate > curHeaviestPlate ? prev : cur;
  });
  console.log('least round off:', combsMinRoundOff);
  console.log('least number of plates:', combsMinNumPlates);
  console.log('favorsHeavierPlates:', combsHeaviestPlates);
  return combsHeaviestPlates;
};

/**
 * Returns an array containing all sub-arrays (subsets) of a given array of
 * objects.
 * @param {Object[]} set An array of objects.
 */
const calcSubsets = set => {
  let numSubsets = 1 << set.length; // 2^n
  let subsets = [];

  for (let bitSet = numSubsets - 1; bitSet >= 0; --bitSet) {
    let subset = [];
    // Iterate through the bitSet. Checking each bit.
    for (let j = 0; j < set.length; ++j) {
      // If the bit at position j is turned on in the bit set, push element j.
      if ((bitSet & (1 << j)) > 0) subset.push({ ...set[j] });
    }
    if (subset.length > 0) subsets.push(subset); // Push subset into list of all subsets.
  }
  return subsets;
};

/**
 * Determines whether a given input falls within the range of the given min and max.
 * @param {Number} input
 * @param {Number} min
 * @param {Number} max
 */
const withinRange = (input, min, max) => input >= min && input <= max;

/**
 * Multiplies the quantity value of each plate object in the given array by the
 * given modifier value.
 * @param {Object[]} plateObjs Array of plate objects.
 * @param {Number} plateObjs[].value The weight value of the plate.
 * @param {String} plateObjs[].color The color of the plate.
 * @param {Number} plateObjs[].quantity The quantity available of the plate.
 */
const modQuantity = (plateObjs, modifier) => {
  return plateObjs
    .filter(({ quantity }) => quantity > 0)
    .map(plate => {
      const { value, color, quantity } = plate;
      return { value, color, quantity: quantity * modifier };
    });
};

export { MAX_PLATES, modQuantity, withinRange, calculatePlates };
