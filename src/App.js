import React from 'react';

import { NavBarTop, NavBarBottom } from './components/nav/NavBar';
import Routine from './components/Routine';
import './App.scss';


class App extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      currentWorkout: {
        currentRoutine: 0,
        currentExercise: 0,
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
      }],
    };
    this.tick = this.tick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePrevExerciseNavigation = this.handlePrevExerciseNavigation.bind(this);
    this.handleNextExerciseNavigation = this.handleNextExerciseNavigation.bind(this);
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

    newState.currentWorkout.currentExercise += 1;
    if (newState.currentWorkout.currentExercise < 0) {
      newState.currentWorkout.currentExercise = 0;
    }

    this.setState(
      newState,
    );
  }

  render() {

    const currentRoutine = this.state.currentWorkout.currentRoutine;

    return (
      <div className="App">
        <NavBarTop />
        {currentRoutine === undefined &&
          <div>List of Routines</div>
        }
        {currentRoutine !== undefined &&
          <Routine
            routine={this.state.routines[this.state.currentWorkout.currentRoutine]}
            currentExercise={this.state.currentWorkout.currentExercise || 0}
            handleClick={this.handleClick}
          />
        }
        <NavBarBottom
          handlePrevExerciseNavigation={this.handlePrevExerciseNavigation}
          handleNextExerciseNavigation={this.handleNextExerciseNavigation}
        />
      </div>
    );

  }

}

export default App;
