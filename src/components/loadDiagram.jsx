import React from 'react';
import { limitPlateHeight } from '../utils/limitPlateHeight';
import '../css/loadDiagram.css';
import LoadValue from './loadValue';

const LoadDiagram = props => {
  const { unit, barbellWeight, calcdPlates, calcdLoad } = props;

  return (
    <>
      <div className="load">
        <div className="load__barbell--shaft">
          <div>{barbellWeight}</div>
        </div>
        <div className="load__barbell--sleeve-threshold" />
        <div className="load__plate-group">
          <div style={{ opacity: '0px' }} className="plate-container" />
          {calcdPlates.map((plate, index) => (
            <div key={index} className="plate-container" style={{ left: `${index * 32 + 32}px` }}>
              <div
                className={`plate-container__plate center-vertically bg-${plate.color}`}
                style={{ height: `${limitPlateHeight(plate.value * 7, 45, 315)}px` }}
              />
              <div className="plate-container__plate--text center-vertically">{plate.value}</div>
            </div>
          ))}
        </div>
      </div>
      <LoadValue unit={unit} value={calcdLoad} />
    </>
  );
};

export default LoadDiagram;
