import React from 'react';
import LoadDiagram from './loadDiagram';
import LoaderForm from './loaderForm';

const Loader = props => {
  const { unit, barbellWeight, calcdPlates, calcdLoad,  prevCalcdLoad, onSubmit } = props;
  const formProps = { unit, onSubmit };
  const diagramProps = { unit, barbellWeight, calcdPlates, calcdLoad, prevCalcdLoad };

  return (
    <>
      <div className="d-flex justify-content-center row">
        <h1>Barbell Loader</h1>
      </div>
      <LoaderForm {...formProps} placeholder="Enter Weight" btnText="Load" />
      <LoadDiagram {...diagramProps} />
    </>
  );
};

export default Loader;
