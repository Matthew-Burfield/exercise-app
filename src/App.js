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
    this.state = {
      data: Map({
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
                timeBetweenSets: 180,
                timeLengthOfExercise: 0.5,
                variations: ['Against Wall', 'Free Standing'],
                selectedVariation: 0,
              }),
              Dip: Map({
                sets: 5,
                currSets: 0,
                reps: 5,
                timeBetweenSets: 180,
                variations: ['Assisted Ring Dips', 'Ring Dips', 'Weighted Ring Dips'],
                selectedVariation: 0,
              }),
              Row: Map({
                sets: 5,
                currSets: 0,
                reps: 5,
                timeBetweenSets: 180,
                variations: ['Normal Row'],
                selectedVariation: 0,
              }),
              Pullup: Map({
                sets: 5,
                currSets: 0,
                reps: 5,
                timeBetweenSets: 180,
                variations: ['Negative Pullup', 'Assisted Pullup', 'Full Ring Pullup', 'Ring Muscle Up'],
                selectedVariation: 2,
              }),
              Pushup: Map({
                sets: 5,
                currSets: 0,
                reps: 5,
                timeBetweenSets: 180,
                variations: ['Normal Pushup', 'Ring Pushup', 'Reverse Ring Pushup'],
                selectedVariation: 2,
              }),
            }),
          }),
        }),
      }),
    };
    this.handleFinishedSetBtnClk = this.handleFinishedSetBtnClk.bind(this);
  }

  /**
   * User has clicked the button to say they have finished their current set.
   * Start the timer loop and increase the number of sets.
   */
  handleFinishedSetBtnClk(exerciseName) {
    this.setState(({ data }) => ({
      data: data.updateIn(
        ['routines', 'fullBodyWorkout', 'exercises', exerciseName, 'currSets'], val => val + 1,
      ),
    }));
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        {this.props.children && React.cloneElement(this.props.children, {
          data: this.state.data,
          handleFinishedSetBtnClk: this.handleFinishedSetBtnClk,
        })}
      </div>
    );
  }
}

export default App;
