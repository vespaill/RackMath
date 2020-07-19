import React from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/inventory.css';
import InvPlateGroup from './invPlateGroup';

const calcBgColor = index => {
  return (
    ' bg-' +
    (input => {
      if (input % 6 === 0) return 'black';
      if (input % 5 === 0) return 'yellow';
      if (input % 4 === 0) return 'red';
      if (input % 3 === 0) return 'purple';
      if (input % 2 === 0) return 'green';
      return 'cyan';
    })(index)
  );
};

const Inventory = props => {
  const { unit, barbell, availablePlates } = props.data;
  return (
    <>
      <Row className="d-flex justify-content-between">
        <h1>Unit</h1>
        <h1>{unit}</h1>
      </Row>
      <Row className="d-flex justify-content-between">
        <h1>Barbell</h1>
        <h1>{barbell[unit]}</h1>
      </Row>
      <Row className="d-flex justify-content-center">
        <h1>Available plates</h1>
      </Row>
      <Row>
        {availablePlates[unit].map((plate, index) => {
          const { value, quantity } = plate;
          return (
            <Col key={index} xs={4}>
              <InvPlateGroup
                onClick={props.onClick}
                value={value}
                quantity={quantity}
                bgColor={calcBgColor(index)}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Inventory;
