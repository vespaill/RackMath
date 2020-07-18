import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/inventory.css';
import PlateGroup from './plateGroup';

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

const toKg = lbs => Math.round(lbs / 2.20462);

class Inventory extends Component {
  state = {
    unit: 'lbs',
    barbell: {
      lbs: 45,
      kg: toKg(45)
    },
    availablePlates: {
      lbs: [
        { value: 100, quantity: 0 },
        { value: 65, quantity: 0 },
        { value: 55, quantity: 0 },
        { value: 50, quantity: 0 },
        { value: 45, quantity: 8 },
        { value: 35, quantity: 0 },
        { value: 25, quantity: 8 },
        { value: 20, quantity: 0 },
        { value: 15, quantity: 0 },
        { value: 12.5, quantity: 0 },
        { value: 10, quantity: 8 },
        { value: 7.5, quantity: 0 },
        { value: 5, quantity: 8 },
        { value: 2.5, quantity: 8 },
        { value: 1.25, quantity: 0 },
        { value: 1, quantity: 0 },
        { value: 0.75, quantity: 0 },
        { value: 0.5, quantity: 0 },
        { value: 0.25, quantity: 0 }
      ],
      kg: [
        { value: 50, quantity: 0 },
        { value: 45, quantity: 0 },
        { value: 35, quantity: 0 },
        { value: 30, quantity: 0 },
        { value: 25, quantity: 0 },
        { value: 20, quantity: 0 },
        { value: 15, quantity: 0 },
        { value: 12.5, quantity: 0 },
        { value: 10, quantity: 0 },
        { value: 7.5, quantity: 0 },
        { value: 5, quantity: 0 },
        { value: 3, quantity: 0 },
        { value: 2.5, quantity: 0 },
        { value: 2, quantity: 0 },
        { value: 1.5, quantity: 0 },
        { value: 1.25, quantity: 0 },
        { value: 1, quantity: 0 },
        { value: 0.75, quantity: 0 },
        { value: 0.5, quantity: 0 },
        { value: 0.25, quantity: 0 }
      ]
    }
  };

  handlePlateGroupClick(value) {
    const { unit } = this.state;
    const original = { ...this.state.availablePlates };
    const index = original[unit].findIndex(element => element.value === value);
    original[unit][index].quantity = (original[unit][index].quantity + 2) % 10;

    this.setState({ availablePlates: original });
  }

  render() {
    const { unit, barbell, availablePlates } = this.state;
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
                <PlateGroup
                  onClick={() => this.handlePlateGroupClick(value)}
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
  }
}

export default Inventory;
