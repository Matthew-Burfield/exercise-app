import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';


const FieldGroup = ({ id, label, help, ...props }) => {

  FieldGroup.propTypes = {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    help: React.PropTypes.string,
  };


  FieldGroup.defaultProps = {
    help: '',
  };


  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};


const EditExercise = ({ exercise }) => {

  EditExercise.propTypes = {
    exercise: React.PropTypes.shape({}).isRequired,
  };

  return (
    <form>
      <FieldGroup
        id="formControlsText"
        label="Name"
        type="text"
        placeholder={exercise.name}
      />
    </form>
  );
};

export default EditExercise;
