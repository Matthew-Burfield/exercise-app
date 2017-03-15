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
    exercise: React.PropTypes.shape({}).isRequired,
    handleOnChange: React.PropTypes.func.isRequired,
  };

  const {
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
        onChange={e => handleOnChange('name', e)}
      />
      <FieldGroup
        id="formControlsText"
        label="Sets"
        type="text"
        value={exercise.sets.toString()}
        onChange={e => handleOnChange('sets', e)}
      />
      {exercise.reps &&
        <FieldGroup
          id="formControlsText"
          label="Reps"
          type="text"
          value={exercise.reps.toString()}
          onChange={e => handleOnChange('reps', e)}
        />
      }
      {exercise.weight &&
        <FieldGroup
          id="formControlsText"
          label="Weight"
          type="text"
          value={exercise.weight.toString()}
          onChange={e => handleOnChange('weight', e)}
        />
      }
      {exercise.timer.prepTime &&
        <FieldGroup
          id="formControlsText"
          label="Prep Time (seconds)"
          type="text"
          value={exercise.timer.prepTime.toString()}
          onChange={e => handleOnChange('prepTime', e)}
        />
      }
      {exercise.timer.holdTime &&
        <FieldGroup
          id="formControlsText"
          label="Hold Time (seconds)"
          type="text"
          value={exercise.timer.holdTime.toString()}
          onChange={e => handleOnChange('holdTime', e)}
        />
      }
      <FieldGroup
        id="formControlsText"
        label="Rest Time (seconds)"
        type="text"
        value={exercise.timer.restTime.toString()}
        onChange={e => handleOnChange('restTime', e)}
      />
    </Form>
  );
};

export default EditExercise;
