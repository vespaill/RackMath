import React from 'react';
import '../css/barbellLoad.css';

const MAX_HEIGHT = 315;
const MIN_HEIGHT = 35;
const limit = value => {
  if (value >= MAX_HEIGHT) return MAX_HEIGHT;
  if (value <= MIN_HEIGHT) return MIN_HEIGHT;
  return value;
};

const BarbellLoad = props => {
  return (
    <div className="load">
      <div className="load__barbell"></div>
      {props.calculatedPlates.map((plateWeight, index) => (
        <div key={index} className="plate-container">
          <div
            className="plate-container__plate center-vertically"
            style={{ height: `${limit(plateWeight * 7)}px` }}
          >
            <span className="plate-container__plate--text center-vertically">
              {plateWeight}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarbellLoad;
