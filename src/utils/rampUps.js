const roundToNearestStepHelper = (value, step) => {
  const remainder = value % step;
  const dividend = value - remainder;
  return remainder >= step / 2 ? dividend + step : dividend;
};

const roundToNearestStep = (value, step) => Math.round(roundToNearestStepHelper(value, step));

const calcRampUpReps = (percentage, workingNumSets) => {
  const numReps = Math.round(workingNumSets * (2 - 4 * (percentage - 0.5)));
  return numReps > 0 ? numReps : 1;
};

export { roundToNearestStep, calcRampUpReps };
