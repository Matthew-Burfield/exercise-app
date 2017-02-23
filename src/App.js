import React, { Component } from 'react';
import { Map, List } from 'immutable';
import { NavBarTop, NavBarBottom } from './components/NavBar';
import './App.scss';

class App extends Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: Map({
        currentWorkout: 0,
        default_settings: Map({
          weightUnit: 'kg',
          countdownTimerLength: 10,
          countdownTimerVoicePrompt: true,
        }),
        routines: Map({
          fullBodyWorkout: Map({
            exercises: List([
              Map({
                name: 'Handstand',
                sets: 5,
                currSets: 0,
                reps: 1,
                timeBetweenSets: 180,
                timeLengthOfExercise: 30,
                variations: ['Against Wall', 'Free Standing'],
                selectedVariation: 0,
                isCountingDown: false,
                isInRecovery: false,
              }),
              Map({
                name: 'Dip',
                sets: 5,
                currSets: 0,
                reps: 5,
                timeBetweenSets: 180,
                variations: ['Assisted Ring Dips', 'Ring Dips', 'Weighted Ring Dips'],
                selectedVariation: 0,
                isInRecovery: false,
              }),
              Map({
                name: 'Row',
                sets: 5,
                currSets: 0,
                reps: 5,
                timeBetweenSets: 180,
                variations: ['Normal Row'],
                selectedVariation: 0,
                isInRecovery: false,
              }),
              Map({
                name: 'Pullup',
                sets: 5,
                currSets: 0,
                reps: 5,
                timeBetweenSets: 180,
                variations: ['Negative Pullup', 'Assisted Pullup', 'Full Ring Pullup', 'Ring Muscle Up'],
                selectedVariation: 2,
                isInRecovery: false,
              }),
              Map({
                name: 'Pushup',
                sets: 5,
                currSets: 0,
                reps: 5,
                timeBetweenSets: 180,
                variations: ['Normal Pushup', 'Ring Pushup', 'Reverse Ring Pushup'],
                selectedVariation: 2,
                isInRecovery: false,
              }),
            ]),
          }),
        }),
      }),
    };
    this.handleFinishedSetBtnClk = this.handleFinishedSetBtnClk.bind(this);
    this.nextExercise = this.nextExercise.bind(this);
    this.previousExercise = this.previousExercise.bind(this);
    this.tick = this.tick.bind(this);
    this.handleStartTimerBtnClk = this.handleStartTimerBtnClk.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.createInterval = this.createInterval.bind(this);
  }

  /**
   * User has clicked the button to say they have finished their current set.
   * Start the timer loop and increase the number of sets.
   */
  handleFinishedSetBtnClk(exerciseIndex) {
    this.setState(({ data }) => ({
      data: data.updateIn(
        ['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'currSets'], val => val + 1,
      ),
    }));
    this.resetTimer();
    this.startCountdown(true);
    this.createInterval(exerciseIndex, 'timeBetweenSets');
  }

  /**
   * Increase the currentWorkout. This will rerender the screen to the next exercise.
   * TODO: Prevent the currentWorkout from being larger than the routine length
   */
  nextExercise() {
    this.setState(prevState => ({
      data: prevState.data.set('currentWorkout', prevState.data.get('currentWorkout') + 1),
    }));
  }

  /**
   * Descrease the currentWorkout. This will rerender the screen to the next exercise.
   * TODO: Prevent the currentWorkout from going lower than 0
   */
  previousExercise() {
    this.setState(prevState => ({
      data: prevState.data.set('currentWorkout', prevState.data.get('currentWorkout') - 1),
    }));
  }


  tick(exerciseIndex, key) {
    const isInRecovery = this.state.data.getIn(['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'isInRecovery']);
    const timeLengthOfExercise = this.state.data.getIn(['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'timeLengthOfExercise']);
    const timeBetweenSets = this.state.data.getIn(['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'timeBetweenSets']);

    this.setState(prevState => ({
      data: prevState.data.updateIn(
        ['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, key], val => val - 1,
      ),
    }));

    if (!isInRecovery && timeLengthOfExercise < 0) {
      this.handleFinishedSetBtnClk(exerciseIndex);
    }
    if (isInRecovery && timeBetweenSets < 0) {
      clearInterval(this.interval);
      this.resetTimer();
    }
  }

  resetTimer(exerciseIndex) {
    this.setState(({ data }) => ({
      data: data.setIn(
        ['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'timeBetweenSets'], 180,
        ['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'isCountingDown'], false,
      ),
    }));
  }

  handleStartTimerBtnClk(exerciseIndex) {
    this.startCountdown(exerciseIndex, false);
    this.createInterval(exerciseIndex, 'timeLengthOfExercise');
  }

  startCountdown(exerciseIndex, isInRecovery = false) {
    this.setState(({ data }) => ({
      data: data.setIn(
        ['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'isCountingDown'], true,
        ['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'isInRecovery'], isInRecovery,
      ),
    }));
  }

  createInterval(exerciseIndex, counterValue) {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.tick(exerciseIndex, counterValue), 1000);
  }

  render() {
    return (
      <div className="App">
        <NavBarTop />
        {this.props.children && React.cloneElement(this.props.children, {
          data: this.state.data,
          handleFinishedSetBtnClk: this.handleFinishedSetBtnClk,
          handleStartTimerBtnClk: this.handleStartTimerBtnClk,
        })}
        <NavBarBottom
          handleNextExercise={this.nextExercise}
          handlePreviousExercise={this.previousExercise}
        />
      </div>
    );
  }
}

export default App;
