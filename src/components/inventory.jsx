import React from 'react';
import { Row, Col } from 'react-bootstrap';
import InvPlateGroup from './invPlateGroup';
import Header from './common/header';
import '../css/inventory.css';

const Inventory = props => {
  const { unit, barbell, availPlates, onUnitClick, onPlateGroupClick, onClear } = props;

  return (
    <>
      <Header>
        <h1>Unit</h1>
        <button className="btn-unit" onClick={e => onUnitClick(e)}>
          {unit}
        </button>
      </Header>
      <Header>
        <h1>Barbell</h1>
        <h1>{barbell[unit]}</h1>
      </Header>
      <Header>
        <h1>Available plates</h1>
      </Header>
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
