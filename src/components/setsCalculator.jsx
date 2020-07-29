import React from 'react';
import SetsCalcForm from './setsCalcForm';
import SetContainer from './setContainer';
import '../css/setsCalculator.css';
// import Cog from './icons/cog';

const SetsCalculator = props => {
  const { workingWeight, workingNumReps, warmUpSets, unit, onSubmit, onLoad } = props;
  const contProps = { unit, onClick: onLoad };
  const workingWeightContProps = {
    percentage: 1,
    weight: workingWeight,
    numReps: workingNumReps,
    isWorkingSet: true,
    btnText: 'Start'
  };

  return (
    <>
      <div className="text-center">
        <a href="https://www.t-nation.com/training/most-intelligent-way-to-warm-up" target="#blank">
          <h1>Warm Up Sets Calculator</h1>
        </a>
        {/* <button className="text-center btn btn-dark" style={{ padding: '5px', width: '38px', height: '38px' }}>
          <Cog />
        </button> */}
      </div>
      <SetsCalcForm style={{ display: 'inline' }} unit={unit} onSubmit={onSubmit} btnText="Calculate" />
      <div className="setList-container">
        <div className="setList mx-auto">
          {warmUpSets.map((set, index) => {
            const { percentage, weight, numReps } = set;
            const additionalProps = { percentage, weight, numReps };
            return <SetContainer key={index} btnText="Load" {...contProps} {...additionalProps} />;
          })}
          {workingWeight !== -1 && <SetContainer {...contProps} {...workingWeightContProps} />}
        </div>
      </div>
      {/* <div className="popup" id="popup"></div> */}
    </>
  );
};

export default SetsCalculator;
