import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../css/setContainer.css';

const SetContainer = props => {
  const { unit, percentage, weight, numReps, isWorkingSet, btnText, animationDelay } = props;
  const workSetClass = isWorkingSet ? ' working-weight' : '';

  return (
    <div
      style={{ animationDelay }}
      className={'set-container d-flex justify-content-between animate-slide-in' + workSetClass}
    >
      <span className="percentage">{Math.round(percentage * 100)}%</span>
      <span className="set">{`${weight} ${unit} \u00D7 ${numReps}`}</span>
      <Link to="/home">
        <Button variant="dark" onClick={() => props.onClick(weight)}>
          {btnText}
        </Button>
      </Link>
    </div>
  );
};

export default SetContainer;
