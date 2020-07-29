import React from 'react';
import '../css/loadValue.css';
import shortid from 'shortid';

const LoadValue = props => {
  const { prevCalcdLoad, calcdLoad, unit } = props;

  const id1 = shortid.generate();
  const id2 = shortid.generate();

  return (
    <div className="load-value center-vertically">
      {prevCalcdLoad > -1 && (
        <div key={id1} className="load-value__prev badge badge-success animate-leave">
          {`${prevCalcdLoad} ${unit}`}
        </div>
      )}
      {calcdLoad > -1 && (
        <div key={id2} className="load-value__cur badge badge-success animate-enter">
          {`${calcdLoad} ${unit}`}
        </div>
      )}
    </div>
  );
};

export default LoadValue;
