import React from 'react';
import { limitPlateHeight } from '../utils/limitPlateHeight';
import shortid from 'shortid';
import '../css/loadDiagram.css';

const LoadDiagram = props => {
  const { barbellWeight, calcdPlates } = props;

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
            <div
              key={shortid.generate()}
              className="plate-container animate-slide-in-and-bounce"
              style={{ left: `${index * 32 + 32}px`, animationDelay: `${index*0.1}s` }}
            >
              <div
                className={`plate-container__plate center-vertically bg-${plate.color}`}
                style={{ height: `${limitPlateHeight(plate.value * 7, 45, 315)}px` }}
              />
              <div className="plate-container__plate--text center-vertically">{plate.value}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LoadDiagram;
