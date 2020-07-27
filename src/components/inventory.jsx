import React from 'react';
import { Row, Col } from 'react-bootstrap';
import InvPlateGroup from './invPlateGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/inventory.css';

const Inventory = props => {
  const { unit, barbell, availPlates, onUnitClick, onPlateGroupClick, onClear } = props;

  return (
    <>
      <div className="container">
        <Row className="d-flex justify-content-between">
          <h1>Unit</h1>
          <button className="btn-unit" variant="danger" onClick={e => onUnitClick(e)}>
            {unit}
          </button>
        </Row>
        <Row className="d-flex justify-content-between">
          <h1>Barbell</h1>
          <h1>{barbell[unit]}</h1>
        </Row>
        <Row className="d-flex justify-content-center">
          <h1>Available plates</h1>
        </Row>
      </div>
      <Row style={{ minWidth: '300px' }}>
        {availPlates[unit].map((plate, index) => {
          const { value, color, quantity } = plate;
          const plateGroupProps = { onClick: onPlateGroupClick, value, quantity, bgColor: color };
          return (
            <Col key={index} xs={4}>
              <InvPlateGroup {...plateGroupProps} />
            </Col>
          );
        })}
        <Col xs={4}>
          <div className="btn-clear-container text-center">
            <button className="btn-clear" onClick={() => onClear()}>
              <span className="center-vertically">clear</span>
            </button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Inventory;
