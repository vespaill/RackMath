import React from 'react';
import LoadDiagram from './loadDiagram';
import LoadForm from './loadForm';

const LoadPlateCalc = props => {
  return (
    <>
      <LoadForm
        unit={props.unit}
        onSubmit={props.onSubmit}
        placeholder="Enter Weight"
        btnText="Load"
      />
      <LoadDiagram
        barbell={props.barbell}
        calculatedPlates={props.calculatedPlates}
      />
    </>
  );
};

export default LoadPlateCalc;
