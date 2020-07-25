import React from 'react';
import LoadForm from './loadForm';
import WarmUpSetContainer from './warmUpSetContainer';
import { Row } from 'react-bootstrap';
import '../css/warmUpSetCalc.css';

const WarmUpSetCalc = props => {
  const { workingWeight, warmUpSets, unit, onSubmit, onLoad } = props;
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
      <div className="setList-container">
        <div className="setList mx-auto">
          {warmUpSets.map((pair, index) => {
            const [percentage, load] = pair;
            const containerData = { unit, percentage, load };
            return (
              <WarmUpSetContainer key={index} {...containerData} onClick={onLoad} />
            );
          })}
          {workingWeight !== -1 && (
            <WarmUpSetContainer
              unit={unit}
              load={workingWeight}
              percentage={1}
              onClick={onLoad}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default WarmUpSetCalc;
