import React from 'react';
import '../../css/icons/barbell.css'

const Barbell = () => {
  return (
    <div className="barbell">
      <div className="barbell__shaft"></div>
      <div className="barbell__weights">
        <div className="barbell__weights--1">
          <div className="weights__small"></div>
          <div className="weights__med"></div>
          <div className="weights__big"></div>
        </div>
        <div className="barbell__weights--2">
          <div className="weights__small"></div>
          <div className="weights__med"></div>
          <div className="weights__big"></div>
        </div>
      </div>
    </div>
  );
};

export default Barbell;
