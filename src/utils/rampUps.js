const roundToNearestStepHelper = (load, barbell, step) => {
  const remainder = (load - barbell) % step;
  const dividend = load - remainder;
  return remainder >= step / 2 ? dividend + step : dividend;
};

const roundToNearestStep = (load, barbell, step) => Math.round(roundToNearestStepHelper(load, barbell, step));

const calcRampUpReps = (percentage, workingNumSets) => {
  const numReps = Math.round(workingNumSets * (2 - 4 * (percentage - 0.5)));
  return numReps > 0 ? numReps : 1;
};

export { roundToNearestStep, calcRampUpReps };
