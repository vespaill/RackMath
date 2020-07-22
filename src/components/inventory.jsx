import React from 'react';
import { Row, Col } from 'react-bootstrap';
import InvPlateGroup from './invPlateGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/inventory.css';

const Inventory = props => {
  const { unit, barbell, availablePlates } = props.data;
  const { onUnitClick, onPlateGroupClick } = props;
  return (
    <>
      <div className="container">
        <Row className="d-flex justify-content-between">
          <h1>Unit</h1>
          <button className="unit-btn" variant="danger" onClick={() => onUnitClick()}>
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
      <Row style={{minWidth: '300px'}}>
        {availablePlates[unit].map((plate, index) => {
          const { value, color, quantity } = plate;
          return (
            <Col key={index} xs={4}>
              <InvPlateGroup
                onClick={onPlateGroupClick}
                value={value}
                quantity={quantity}
                bgColor={color}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Inventory;
