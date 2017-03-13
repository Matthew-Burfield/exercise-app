import React from 'react';

import ListOfRoutines from './ListOfRoutines';
import EditRoutine from './EditRoutine';

const EditMode = (props) => {

  EditMode.propTypes = {
    currentRoutine: React.PropTypes.number,
    currentExercise: React.PropTypes.number,
    routines: React.PropTypes.arrayOf(
      React.PropTypes.shape({}),
    ).isRequired,
    handleRoutineSelection: React.PropTypes.func.isRequired,
    selectExercise: React.PropTypes.func.isRequired,
  };

  EditMode.defaultProps = {
    currentRoutine: undefined,
    currentExercise: undefined,
  };

  return (
    <div>
      {
        props.currentRoutine === undefined &&
        <ListOfRoutines
          routines={props.routines}
          handleRoutineSelection={props.handleRoutineSelection}
          customStyle={{ fontStyle: 'italic' }}
        />
      }
      {
        props.currentRoutine !== undefined &&
        <EditRoutine
          routine={props.routines[props.currentRoutine]}
          currentExercise={props.currentExercise}
          handleSaveExercise={() => { return console.log('here'); }}
          selectExercise={props.selectExercise}
        />
      }
    </div>
  );
};

export default EditMode;
