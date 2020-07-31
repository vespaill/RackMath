import React from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import Cog from './icons/cog';
import '../css/loadForm.css';

const SetsCalcForm = props => {
  const formControlProps = {
    type: 'number',
    min: '0',
    onFocus: e => {
      e.currentTarget.select();
    }
  };
  const maxWeight = props.unit === 'kg' ? 2840 : 7000;

  return (
    <Form onSubmit={e => props.onSubmit(e)}>
      <InputGroup>
        <FormControl name="loadInput" placeholder="weight" step="0.5" max={maxWeight} {...formControlProps} />
        <InputGroup.Append>
          <InputGroup.Text>{props.unit} × </InputGroup.Text>
        </InputGroup.Append>
        <FormControl name="numRepsInput" placeholder="reps" max="999" step="1" defaultValue="5" {...formControlProps} />
      </InputGroup>
      <div className="button-group">
        <Button className="calc-btn" type="submit" variant="dark">
          {props.btnText}
        </Button>
        <Button className="settings-btn" variant="dark">
          <Cog />
        </Button>
      </div>
    </Form>
  );
};

export default SetsCalcForm;