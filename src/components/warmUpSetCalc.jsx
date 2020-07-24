import React from 'react';
import LoadForm from './loadForm';
import SetContainer from './setContainer';
import { Row } from 'react-bootstrap';
import '../css/warmUpSetCalc.css'

const WarmUpSetCalc = props => {
  const { workingWeight, sets } = props.data;
  const { unit, onSubmit, onLoad } = props;
  return (
    <>
      <Row className="d-flex justify-content-center">
        <h1>Warm Up Sets Calculator</h1>
      </Row>
      <LoadForm
        unit={unit}
        onSubmit={onSubmit}
        placeholder="Working Weight"
        btnText="Calculate"
      />
      <div className="setList mx-auto">
        {sets.map((pair, index) => {
          const [percentage, load] = pair;
          return (
            <SetContainer
              key={index}
              data={{ unit, percentage, load }}
              onClick={onLoad}
            />
          );
        })}
        {workingWeight !== -1 && (
          <SetContainer
            data={{ unit, percentage: 1, load: workingWeight }}
            onClick={onLoad}
          />
        )}
      </div>
    </>
  );
};

export default WarmUpSetCalc;
