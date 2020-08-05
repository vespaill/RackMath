import React from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/loadForm.css';

const LoaderForm = props => {
  return (
    <Form onSubmit={e => props.onSubmit(e)}>
      <InputGroup>
        <FormControl
          className="text-right"
          type="number"
          inputmode="numeric"
          pattern="[0-9]*"
          name="loadInput"
          placeholder={props.placeholder}
          aria-label="weight"
          min="0"
          step="0.5"
          onFocus={e => { e.currentTarget.select(); }}
        />
        <InputGroup.Append>
          <InputGroup.Text className="weight-input__text">
            {props.unit}
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
      <div>
        <Button className="mx-auto d-block" variant="dark" type="submit">
          {props.btnText}
        </Button>
      </div>
    </Form>
  );
};

export default LoaderForm;
