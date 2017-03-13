import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import EditExercise from './EditExercise';


const EditRoutine = ({ routine, currentExercise, selectExercise }) => {

  EditRoutine.propTypes = {
    routine: React.PropTypes.shape({}).isRequired,
    currentExercise: React.PropTypes.number,
    selectExercise: React.PropTypes.func.isRequired,
  };

  EditRoutine.defaultProps = {
    currentExercise: undefined,
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
              >{exercise.name}
              </ListGroupItem>);
          })}
          <ListGroupItem
            key={'addNew'}
          >Add new exercise
          </ListGroupItem>
        </ListGroup>
      );
    }

    return (
      <EditExercise
        exercise={routine.exercises[currentExercise]}
        handleSaveExercise={() => { return console.log('here'); }}
      />
    );
  };

  return (
    render()
  );
};

export default EditRoutine;
