import React, { useState } from 'react';
import SetsCalcForm from './setsCalcForm';
import SetContainer from './setContainer';
import Header from './common/header';
import Popup from './common/popup';
import shortid from 'shortid';
import '../css/setsCalculator.css';

const SetsCalculator = props => {
  const { workWeight, workNumReps, warmUpSets, percentages, unit, onSubmit, onLoad } = props;
  const contProps = { unit, onClick: onLoad, animationDelay: `${warmUpSets.length*0.05}s` };
  const workWeightContProps = { percentage: 1, weight: workWeight, numReps: workNumReps, isWorkingSet: true, btnText: 'Start' };
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => { setShowPopup(!showPopup); };
  const formProps = { unit, onSubmit, onSettings: togglePopup, workWeight, workNumReps, btnText: 'Calculate',  };

  return (
    <>
      <Header>
        <a href="https://www.t-nation.com/training/most-intelligent-way-to-warm-up" target="#blank">
          <h1>Warm Up Sets Calculator</h1>
        </a>
      </Header>
      <SetsCalcForm {...formProps} />
      {!showPopup && (
        <div className="setList-container">
          <div className="setList mx-auto">
            {warmUpSets.map((set, index) => {
              const { percentage, weight, numReps } = set;
              const additionalProps = { percentage, weight, numReps, animationDelay: `${index * 0.05}s` };
              return <SetContainer key={shortid.generate()} btnText="Load" {...contProps} {...additionalProps} />;
            })}
            {workWeight !== -1 && <SetContainer key={shortid.generate()} {...contProps} {...workWeightContProps} />}
          </div>
        </div>
      )}
      <Popup show={showPopup} header={"Sets Toggler"} onClose={togglePopup}>
        {percentages.map(({ value, on }, index) => (
          <button
            key={index}
            onClick={() => props.togglePercentage(index)}
            className={`mx-auto d-block mb-3 font-weight-bold btn btn-${on ? 'warning' : 'secondary text-dark'}`}
            style={{ animationDelay: `${index*0.1}s` }}
          >{`${Math.round(value * 100)}%`}</button>
        ))}
      </Popup>
    </>
  );
};

export default SetsCalculator;
