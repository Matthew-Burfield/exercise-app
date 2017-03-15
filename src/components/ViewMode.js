import React from 'react';

import { NavBarBottom } from './nav/NavBar';
import Routine from './Routine';
import ListOfRoutines from './ListOfRoutines';

const ViewMode = (props) => {

  ViewMode.propTypes = {
    currentRoutine: React.PropTypes.number,
    currentExercise: React.PropTypes.number,
    routines: React.PropTypes.arrayOf(
      React.PropTypes.shape({}),
    ).isRequired,
    handleRoutineSelection: React.PropTypes.func.isRequired,
    handleClick: React.PropTypes.func.isRequired,
    handleExerciseNavigation: React.PropTypes.func.isRequired,
  };

  ViewMode.defaultProps = {
    currentRoutine: undefined,
    currentExercise: 0,
  };

  return (
    <div>
      {
        props.currentRoutine === undefined &&
        <ListOfRoutines
          routines={props.routines}
          handleRoutineSelection={props.handleRoutineSelection}
        />
      }
      {props.currentRoutine !== undefined &&
        <Routine
          routine={props.routines[props.currentRoutine]}
          currentExercise={props.currentExercise}
          handleClick={props.handleClick}
        />
      }
      {props.currentRoutine !== undefined &&
        <NavBarBottom
          currentExercise={props.currentExercise}
          handleExerciseNavigation={props.handleExerciseNavigation}
        />
      }
    </div>
  );
};

export default ViewMode;
