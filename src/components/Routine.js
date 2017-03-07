import React from 'react';
import Exercise from './Exercise';


const Routine = ({ routine, currentExercise, handleClick }) => {

  Routine.propTypes = {
    routine: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
    }).isRequired,
    currentExercise: React.PropTypes.number.isRequired,
    handleClick: React.PropTypes.func.isRequired,
  };

  const title = routine.name;

  return (
    <div>
      <div className="routineHeader">
        <h2 className="routineTitle">{title}</h2>
      </div>
      <Exercise
        exercise={routine.exercises[currentExercise]}
        currentExercise={currentExercise}
        handleClick={handleClick}
      />
    </div>
  );

};

export default Routine;
