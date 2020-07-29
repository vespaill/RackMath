import React from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import '../css/loadForm.css';

const SetsCalcForm = props => {
  return (
    <Form className="warmUpSetsForm" onSubmit={e => props.onSubmit(e)}>
      <InputGroup>
        <FormControl
          className="weight-input__form"
          type="number"
          name="loadInput"
          placeholder="weight"
          aria-label="weight"
          min="0"
          step="0.5"
          onFocus={e => { e.currentTarget.select(); }}
        />
        <InputGroup.Append>
          <InputGroup.Text className="weight-input__text">{props.unit} × </InputGroup.Text>
        </InputGroup.Append>
        <FormControl
          className="weight-input__form"
          type="number"
          name="numRepsInput"
          placeholder="reps"
          aria-label="weight"
          min="0"
          step="1"
          defaultValue="5"
          onFocus={e => { e.currentTarget.select(); }}
        />
        <InputGroup.Append>
          <InputGroup.Text className="weight-input__text"></InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
      <Button className="mx-auto d-block" variant="dark" type="submit">{props.btnText}</Button>
    </Form>
  );
};

export default SetsCalcForm;
