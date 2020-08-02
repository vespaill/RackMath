import React, { useEffect } from 'react';
import Header from './common/header';
import LoaderForm from './loaderForm';
import LoadDiagram from './loadDiagram';
import { useLocation, Redirect } from 'react-router-dom';

const Loader = props => {
  const { unit, barbellWeight, calcdPlates, calcdLoad, prevCalcdLoad, onSubmit, resetPrevLoad } = props;
  const formProps = { unit, onSubmit };
  const diagramProps = { unit, barbellWeight, calcdPlates, calcdLoad, prevCalcdLoad };
  const { from } = useLocation();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (from === 'navBar') resetPrevLoad();
  }, [from, resetPrevLoad]);

  return from === 'navBar' ? (
    <Redirect to="/home" />
  ) : (
    <>
      <Header>
        <h1>Barbell Loader</h1>
      </Header>
      <LoaderForm {...formProps} placeholder="Enter Weight" btnText="Load" />
      <LoadDiagram {...diagramProps} />
    </>
  );
};

export default Loader;
