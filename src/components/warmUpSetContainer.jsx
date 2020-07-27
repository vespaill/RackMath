import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../css/warmUpSetContainer.css';

const WarmUpSetContainer = props => {
  const { unit, percentage, weight, numReps, isWorkingSet, btnText } = props;
  const workSetClass = isWorkingSet ? ' working-weight' : '';

  return (
    <div className={'set-container d-flex justify-content-between' + workSetClass}>
      <div className="percent-container">
        <span className="percentage badge badge-warning">{Math.round(percentage * 100)}%</span>
      </div>
      <span className="set">{`${weight} ${unit} × ${numReps}`}</span>
      <Link to="/home">
        <Button className="btn btn-dark" onClick={() => props.onClick(weight)}>
          {btnText}
        </Button>
      </Link>
    </div>
  );
};

export default WarmUpSetContainer;
