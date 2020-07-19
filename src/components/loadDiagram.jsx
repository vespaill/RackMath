import React from 'react';
// import { CSSTransitionGroup } from 'react-transition-group';
import '../css/loadDiagram.css';

const MAX_HEIGHT = 315;
const MIN_HEIGHT = 35;
const limit = value => {
  if (value >= MAX_HEIGHT) return MAX_HEIGHT;
  if (value <= MIN_HEIGHT) return MIN_HEIGHT;
  return value;
};

const LoadDiagram = props => {
  const plates = props.calculatedPlates.map((plateWeight, index) => (
    <div key={index} className="plate-container">
      <div
        className="plate-container__plate center-vertically"
        style={{ height: `${limit(plateWeight * 8)}px` }}
      ></div>
      <div className="plate-container__plate--text center-vertically">
        {plateWeight}
      </div>
    </div>
  ));

  return (
    <div className="load">
      <div className="load__barbell--shaft"></div>
      <div className="load__barbell--sleeve-threshold"></div>

      <div className="load__plate-group ">
        <div style={{ opacity: '0px' }} className="plate-container"></div>
        {/* <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}> */}
          {plates}
        {/* </CSSTransitionGroup> */}
      </div>
    </div>
  );
};

export default LoadDiagram;
