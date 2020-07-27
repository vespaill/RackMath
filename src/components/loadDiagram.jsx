import React from 'react';
import { limitPlateHeight } from '../utils/limitPlateHeight';
import '../css/loadDiagram.css';

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
      <div className="load-value badge badge-success" style={{ opacity: calcdLoad > -1 ? '100%' : '0' }}>
        {`${calcdLoad} ${unit}`}
      </div>
    </>
  );
};

export default LoadDiagram;
