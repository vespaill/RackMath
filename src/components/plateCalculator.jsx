import React from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import '../css/plateCalculator.css';
import BarbellLoad from './barbellLoad';

const PlateCalculator = props => {
  return (
    <>
      <Form onSubmit={e => props.onSubmit(e)}>
        <InputGroup>
          <FormControl
            className="weight-input__form mb-3"
            type="number"
            name="load"
            placeholder="Enter Weight"
            aria-label="weight"
          />
          <InputGroup.Append>
            <InputGroup.Text className="weight-input__text">
              {props.unit}
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <Button className="mx-auto d-block" variant="dark" type="submit">
          Submit
        </Button>
      </Form>
      <BarbellLoad calculatedPlates={props.calculatedPlates} />
    </>
  );
};

export default PlateCalculator;
