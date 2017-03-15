import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import EditExercise from './EditExercise';


const EditRoutine = ({
  routine,
  currentExercise,
  selectExercise,
  handleOnChange,
}) => {

  EditRoutine.propTypes = {
    routine: React.PropTypes.shape({}).isRequired,
    currentRoutine: React.PropTypes.number.isRequired,
    currentExercise: React.PropTypes.number,
    handleOnChange: React.PropTypes.func.isRequired,
    selectExercise: React.PropTypes.func.isRequired,
  };

  EditRoutine.defaultProps = {
    currentExercise: undefined,
  };

  const addExercise = () => {
    return null;
  };

  const render = () => {
    if (currentExercise === undefined) {
      return (
        <ListGroup>
          <h1>{routine.name}</h1>
          {routine.exercises.map((exercise, index) => {
            return (
              <ListGroupItem
                key={exercise.name}
                onClick={() => selectExercise(index)}
                style={{ fontStyle: 'italic' }}
              >{exercise.name}
              </ListGroupItem>);
          })}
          <ListGroupItem
            key={'addNew'}
            onClick={addExercise}
            style={{ fontStyle: 'italic' }}
          >Add new exercise
          </ListGroupItem>
        </ListGroup>
      );
    }

    return (
      <EditExercise
        exercise={routine.exercises[currentExercise]}
        handleOnChange={handleOnChange}
      />
    );
  };

  return (
    render()
  );
};

export default EditRoutine;
