import React from 'react';
import LoadDiagram from './loadDiagram';
import LoadForm from './loadForm';

const PlateCalculator = props => {
  return (
    <>
      <LoadForm unit={props.unit} onSubmit={props.onSubmit} />
      <LoadDiagram calculatedPlates={props.calculatedPlates} />
    </>
  );
};

export default PlateCalculator;
