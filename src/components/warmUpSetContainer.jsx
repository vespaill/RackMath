import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../css/warmUpSetContainer.css';

const WarmUpSetContainer = props => {
  const { unit, load, percentage } = props;
  return (
    <div className="set-container d-flex justify-content-between">
      <div className="percent-container">
        <span className="percentage badge badge-warning">{percentage*100}%</span>
      </div>
      <span className="set">{`${load} ${unit}`}</span>
      <Link to="/home">
        <Button className="btn btn-dark" onClick={() => props.onClick(load)}>
          Load
        </Button>
      </Link>
    </div>
  );
};

export default WarmUpSetContainer;
