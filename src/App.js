import React, { Component } from 'react';
import { Map } from 'immutable';
import NavBar from './components/NavBar';
import './App.css';

class App extends Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = Map({
      default_settings: Map({
        weightUnit: 'kg',
        countdownTimerLength: 10,
        countdownTimerVoicePrompt: true,
      }),
      routines: Map({
        fullBodyWorkout: Map({
          exercises: Map({
            Handstand: Map({
              sets: 5,
              currSets: 0,
              reps: 1,
              minInBetweenSets: 3,
              timeLengthOfExercise: 0.5,
              variations: ['Against Wall', 'Free Standing'],
              selectedVariation: 0,
            }),
            Dip: Map({
              sets: 5,
              currSets: 0,
              reps: 5,
              minInBetweenSets: 3,
              variations: ['Assisted Ring Dips', 'Ring Dips', 'Weighted Ring Dips'],
              selectedVariation: 0,
            }),
            Row: Map({
              sets: 5,
              currSets: 0,
              reps: 5,
              minInBetweenSets: 3,
              variations: ['Normal Row'],
              selectedVariation: 0,
            }),
            Pullup: Map({
              sets: 5,
              currSets: 0,
              reps: 5,
              minInBetweenSets: 3,
              variations: ['Negative Pullup', 'Assisted Pullup', 'Full Ring Pullup', 'Ring Muscle Up'],
              selectedVariation: 2,
            }),
            Pushup: Map({
              sets: 5,
              currSets: 0,
              reps: 5,
              minInBetweenSets: 3,
              variations: ['Normal Pushup', 'Ring Pushup', 'Reverse Ring Pushup'],
              selectedVariation: 2,
            }),
          }),
        }),
      }),
    });
    this.handleFinishedSetBtnClk = this.handleFinishedSetBtnClk.bind(this);
  }

  handleFinishedSetBtnClk(exerciseName) {
    const newState = this.state.setIn(
      ['routines', 'Full Body Workout', 'exercises', exerciseName, 'currSets'], val => val + 1,
    );
    this.setState({
      newState,
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        {this.props.children && React.cloneElement(this.props.children, {
          routine: this.state,
          handleFinishedSetBtnClk: this.handleFinishedSetBtnClk,
        })}
      </div>
    );
  }
}

export default App;
