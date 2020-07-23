import React from 'react';
import '../../css/icons/barbell.css';

const Barbell = () => {
  return (
    <div className="barbell-icon">
      <div className="barbell">
        <div className="barbell__shaft"></div>
        <div className="plate-group--1">
          <div className="plate-group__plate--small"></div>
          <div className="plate-group__plate--med"></div>
          <div className="plate-group__plate--large"></div>
        </div>
        <div className="plate-group--2">
          <div className="plate-group__plate--small"></div>
          <div className="plate-group__plate--med"></div>
          <div className="plate-group__plate--large"></div>
        </div>
      </div>
    </div>
  );
};

export default Barbell;
