import React from 'react';
import shortid from 'shortid';
import '../css/loadValue.css';

const LoadValue = props => {
  const { prevCalcdLoad, calcdLoad, unit } = props;
  return (
    <div className="load-value center-vertically">
      {prevCalcdLoad > -1 && (
        <div key={shortid.generate()} className="load-value__prev badge badge-success animate-leave">
          {`${prevCalcdLoad} ${unit}`}
        </div>
      )}
      {calcdLoad > -1 && (
        <div key={shortid.generate()} className="load-value__cur badge badge-success animate-enter">
          {`${calcdLoad} ${unit}`}
        </div>
      )}
    </div>
  );
};

export default LoadValue;
