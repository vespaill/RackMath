import React from 'react';
import '../../css/icons/barbell.css'

const Barbell = () => {
  return (
    <div class="barbell">
      <div class="barbell__shaft"></div>
      <div class="barbell__weights">
        <div class="barbell__weights--1">
          <div class="weights__small"></div>
          <div class="weights__med"></div>
          <div class="weights__big"></div>
        </div>
        <div class="barbell__weights--2">
          <div class="weights__small"></div>
          <div class="weights__med"></div>
          <div class="weights__big"></div>
        </div>
      </div>
    </div>
  );
};

export default Barbell;
