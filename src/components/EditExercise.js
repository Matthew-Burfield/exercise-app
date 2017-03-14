import React from 'react';
import { Form, Col, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';


const FieldGroup = ({ id, label, value, help, ...props }) => {

  FieldGroup.propTypes = {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    help: React.PropTypes.string,
  };


  FieldGroup.defaultProps = {
    value: '',
    help: '',
  };


  return (
    <FormGroup controlId={id}>
      <Col componentClass={ControlLabel} xs={2}>
        {label}
      </Col>
      <Col xs={10}>
        <FormControl value={value} {...props} />
      </Col>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};


const EditExercise = ({ exercise }) => {

  EditExercise.propTypes = {
    exercise: React.PropTypes.shape({}).isRequired,
  };

  return (
    <Form horizontal>
      <FieldGroup
        id="formControlsText"
        label="Name"
        type="text"
        value={exercise.name}
      />
      <FieldGroup
        id="formControlsText"
        label="Sets"
        type="text"
        value={exercise.sets}
      />
      <FieldGroup
        id="formControlsText"
        label="Reps"
        type="text"
        value={exercise.reps}
      />
    </Form>
  );
};

export default EditExercise;
