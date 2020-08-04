import React, { useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Header from './common/header';
import LoaderForm from './loaderForm';
import LoadDiagram from './loadDiagram';
import LoadValue from './loadValue';

const Loader = props => {
  const { unit, barbellWeight, calcdPlates, calcdLoad, prevCalcdLoad, onSubmit, resetPrevLoad } = props;
  const formProps = { unit, onSubmit };
  const diagramProps = { barbellWeight, calcdPlates };
  const loadValProps = { unit, calcdLoad, prevCalcdLoad };
  const { from } = useLocation();

  /* useEffect is similar to componentDidMount and componentDidUpdate. If we
   * came from navBar, set prevLoad to -1 to prevent the prevLoad slide-out
   * animation from playing out. In this case, we want only the curLoad slide-in
   * animation to play out. */
  useEffect(() => {
    if (from === 'navBar') resetPrevLoad();
  }, [from, resetPrevLoad]);

  /* If we came from navBar, redirect to this component again. Doing so will
   * give the resetPrevLoad() callback plenty of time to run, and that will
   * prevent us the displeasure of seeing the prevLoad element pop out of view.
   * */
  return from === 'navBar' ? (
    <Redirect to="/home" />
  ) : (
    <>
      <Header>
        <h1>Barbell Loader</h1>
      </Header>
      <LoaderForm {...formProps} placeholder="Enter Weight" btnText="Load" />
      <LoadDiagram {...diagramProps} />
      <LoadValue {...loadValProps} />
    </>
  );
};

export default Loader;
