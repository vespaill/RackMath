import React from 'react';
import LoadDiagram from './loadDiagram';
import LoadForm from './loadForm';

const LoadPlateCalc = props => {
  const { unit, barbellWeight, calcdPlates, calcdLoad, onSubmit } = props;
  const formProps = { unit, onSubmit };
  const diagramProps = { unit, barbellWeight, calcdPlates, calcdLoad };

  return (
    <>
      <div className="d-flex justify-content-center row">
        <h1>Barbell Loader</h1>
      </div>
      <LoadForm {...formProps} placeholder="Enter Weight" btnText="Load" />
      <LoadDiagram {...diagramProps} />
    </>
  );
};

export default LoadPlateCalc;
