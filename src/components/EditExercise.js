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


const EditExercise = (props) => {

  EditExercise.propTypes = {
    currentRoutine: React.PropTypes.number.isRequired,
    currentExercise: React.PropTypes.number.isRequired,
    exercise: React.PropTypes.shape({}).isRequired,
    handleOnChange: React.PropTypes.func.isRequired,
  };

  const {
    currentRoutine,
    currentExercise,
    exercise,
    handleOnChange,
  } = props;

  return (
    <Form horizontal>
      <FieldGroup
        id="formControlsText"
        label="Name"
        type="text"
        value={exercise.name}
        onChange={e => handleOnChange(currentRoutine, currentExercise, 'name', e)}
      />
      <FieldGroup
        id="formControlsText"
        label="Sets"
        type="text"
        value={exercise.sets}
        onChange={e => handleOnChange(currentRoutine, currentExercise, 'sets', e)}
      />
      <FieldGroup
        id="formControlsText"
        label="Reps"
        type="text"
        value={exercise.reps}
        onChange={e => handleOnChange(currentRoutine, currentExercise, 'reps', e)}
      />
      <FieldGroup
        id="formControlsText"
        label="Weight"
        type="text"
        value={exercise.weight}
        onChange={e => handleOnChange(currentRoutine, currentExercise, 'weight', e)}
      />
      <FieldGroup
        id="formControlsText"
        label="Prep Time (seconds)"
        type="text"
        value={exercise.timer.prepTime}
        onChange={e => handleOnChange(currentRoutine, currentExercise, 'prepTime', e)}
      />
      <FieldGroup
        id="formControlsText"
        label="Hold Time (seconds)"
        type="text"
        value={exercise.timer.holdTime}
        onChange={e => handleOnChange(currentRoutine, currentExercise, 'holdTime', e)}
      />
      <FieldGroup
        id="formControlsText"
        label="Rest Time (seconds)"
        type="text"
        value={exercise.timer.restTime}
        onChange={e => handleOnChange(currentRoutine, currentExercise, 'restTime', e)}
      />
    </Form>
  );
};

export default EditExercise;
