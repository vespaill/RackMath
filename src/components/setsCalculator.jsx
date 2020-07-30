import React from 'react';
import SetsCalcForm from './setsCalcForm';
import SetContainer from './setContainer';
import '../css/setsCalculator.css';
import Header from './common/header';

const SetsCalculator = props => {
  const { workWeight, workNumReps, warmUpSets, unit, onSubmit, onLoad } = props;
  const contProps = { unit, onClick: onLoad };
  const workWeightContProps = {
    percentage: 1,
    weight: workWeight,
    numReps: workNumReps,
    isWorkingSet: true,
    btnText: 'Start'
  };

  return (
    <>
      <Header>
        <a href="https://www.t-nation.com/training/most-intelligent-way-to-warm-up" target="#blank">
          <h1>Warm Up Sets Calculator</h1>
        </a>
      </Header>
      <SetsCalcForm unit={unit} onSubmit={onSubmit} btnText='Calculate' />
      <div className="setList-container">
        <div className="setList mx-auto">
          {warmUpSets.map((set, index) => {
            const { percentage, weight, numReps } = set;
            const additionalProps = { percentage, weight, numReps };
            return <SetContainer key={index} btnText="Load" {...contProps} {...additionalProps} />;
          })}
          {workWeight !== -1 && <SetContainer {...contProps} {...workWeightContProps} />}
        </div>
      </div>
      {/* <div className="popup" id="popup"></div> */}
    </>
  );
};

export default SetsCalculator;
