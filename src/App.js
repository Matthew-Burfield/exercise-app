import React from 'react';

import { NavBarTop, NavBarBottom } from './components/nav/NavBar';
import Routine from './components/Routine';
import ListOfRoutines from './components/ListOfRoutines';
import './App.scss';


class App extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      editMode: false,
      currentWorkout: {
        currentRoutine: undefined,
        currentExercise: undefined,
      },
      routines: [{
        name: 'Full Body Workout',
        exercises: [{
          name: 'Squat',
          sets: 5,
          reps: 5,
          weight: 80,
          timer: {
            restTime: 60,
          },
        }, {
          name: 'Handstand',
          sets: 5,
          reps: 1,
          timer: {
            prepTime: 5,
            holdTime: 30,
            restTime: 60,
          },
        }],
      }, {
        name: 'Second Routine',
        exercises: [],
      }, {
        name: 'Third Routine',
        exercises: [],
      }],
    };
    this.tick = this.tick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePrevExerciseNavigation = this.handlePrevExerciseNavigation.bind(this);
    this.handleNextExerciseNavigation = this.handleNextExerciseNavigation.bind(this);
    this.handleRoutineSelection = this.handleRoutineSelection.bind(this);
    this.handleCancelWorkout = this.handleCancelWorkout.bind(this);
    this.handleSwitchEditMode = this.handleSwitchEditMode.bind(this);
  }

  tick(currentExercise) {

    const newState = Object.assign({}, this.state);
    const currCounter = newState.routines[0].exercises[currentExercise].timer;
    if (currCounter.restTimeVal <= 0) {

      clearInterval(currCounter.interval);
      delete currCounter.interval;
      delete currCounter.prepTimeVal;
      delete currCounter.holdTimeVal;
      delete currCounter.restTimeVal;
      this.setState(
        newState,
      );

    } else {
      if (currCounter.prepTimeVal > 0) {
        currCounter.prepTimeVal -= 1;
      } else if (currCounter.holdTimeVal > 0) {
        currCounter.holdTimeVal -= 1;
      } else if (currCounter.restTimeVal > 0) {
        currCounter.restTimeVal -= 1;
      }

      this.setState(
        newState,
      );
    }
  }

  handleClick(currentExercise) {

    if (!this.state.routines[0].exercises[currentExercise].timer.interval) {

      const interval = setInterval(() => { this.tick(currentExercise); }, 1000);
      const newState = Object.assign({}, this.state);
      const currExercise = newState.routines[0].exercises[currentExercise];
      const currCounter = currExercise.timer;

      currCounter.interval = interval;
      if (!Object.prototype.hasOwnProperty.call(currExercise, 'numSets')) {
        currExercise.numSets = 0;
      }
      currExercise.numSets += 1;

      if (Object.prototype.hasOwnProperty.call(currCounter, 'prepTime')) {
        currCounter.prepTimeVal = currCounter.prepTime;
      }

      if (Object.prototype.hasOwnProperty.call(currCounter, 'holdTime')) {
        currCounter.holdTimeVal = currCounter.holdTime;
      }

      if (Object.prototype.hasOwnProperty.call(currCounter, 'restTime')) {
        currCounter.restTimeVal = currCounter.restTime;
      }

      this.setState(
        newState,
      );
    }
  }

  handleRoutineSelection(e) {
    const newState = Object.assign({}, this.state);
    const index = this.state.routines.findIndex((item) => {
      return (item.name === e.target.innerText);
    });

    newState.currentWorkout = {
      currentRoutine: index,
      currentExercise: 0,
    };

    this.setState(
      newState,
    );
  }

  handlePrevExerciseNavigation() {

    const newState = Object.assign({}, this.state);

    newState.currentWorkout.currentExercise -= 1;
    if (newState.currentWorkout.currentExercise < 0) {
      newState.currentWorkout.currentExercise = 0;
    }

    this.setState(
      newState,
    );
  }

  handleNextExerciseNavigation() {

    const newState = Object.assign({}, this.state);
    const currentRoutine = newState.currentWorkout.currentRoutine;
    const maxExercises = newState.routines[currentRoutine].exercises.length;

    newState.currentWorkout.currentExercise += 1;
    if (newState.currentWorkout.currentExercise > maxExercises - 1) {
      newState.currentWorkout.currentExercise = maxExercises - 1;
    }

    this.setState(
      newState,
    );
  }

  handleCancelWorkout() {
    this.setState({
      currentWorkout: {
        currentRoutine: undefined,
        currentExercise: undefined,
      },
    });
  }

  handleSwitchEditMode() {
    this.setState((prevState) => {
      return { editMode: !prevState.editMode };
    });
  }

  render() {

    return (
      <div className="App">
        <NavBarTop
          currentRoutine={this.currentRoutine}
          isEditMode={this.state.editMode}
          handleCancelWorkout={this.handleCancelWorkout}
          handleSwitchEditMode={this.handleSwitchEditMode}
        />
        {
          !this.state.editMode &&
          <ViewMode
            currentRoutine={this.state.currentWorkout.currentRoutine}
            currentExercise={this.state.currentWorkout.currentExercise}
            routines={this.state.routines}
            handleRoutineSelection={this.handleRoutineSelection}
            handleClick={this.handleClick}
            handlePrevExerciseNavigation={this.handlePrevExerciseNavigation}
            handleNextExerciseNavigation={this.handleNextExerciseNavigation}
          />
        }
        {
          this.state.editMode &&
          <h1>Edit Mode</h1>
        }
      </div>
    );

  }

}

const ViewMode = (props) => {

  ViewMode.propTypes = {
    currentRoutine: React.PropTypes.number,
    currentExercise: React.PropTypes.number,
    routines: React.PropTypes.arrayOf(
      React.PropTypes.shape({}),
    ).isRequired,
    handleRoutineSelection: React.PropTypes.func.isRequired,
    handleClick: React.PropTypes.func.isRequired,
    handlePrevExerciseNavigation: React.PropTypes.func.isRequired,
    handleNextExerciseNavigation: React.PropTypes.func.isRequired,
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
          handlePrevExerciseNavigation={props.handlePrevExerciseNavigation}
          handleNextExerciseNavigation={props.handleNextExerciseNavigation}
        />
      }
    </div>
  );
};

export default App;
