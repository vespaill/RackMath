import React from 'react';
import { limitPlateHeight } from '../utils/limitPlateHeight';
import '../css/loadDiagram.css';

const LoadDiagram = props => {
  return (
    <div className="load">
      <div className="load__barbell--shaft">
        <div>{props.barbell}</div>
      </div>
      <div className="load__barbell--sleeve-threshold" />

      <div className="load__plate-group">
        <div style={{ opacity: '0px' }} className="plate-container" />
        {props.calcdPlates.map((plate, index) => (
          <div
            key={index}
            style={{ left: `${index * 32 + 32}px` }}
            className="plate-container"
          >
            <div
              className={`plate-container__plate center-vertically bg-${plate.color}`}
              style={{
                height: `${limitPlateHeight(plate.value * 8, 35, 315)}px`
              }}
            />
            <div className="plate-container__plate--text center-vertically">
              {plate.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadDiagram;
