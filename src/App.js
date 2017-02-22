import React, { Component } from 'react';
import { Map, List } from 'immutable';
import NavBar from './components/NavBar';
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
              }),
              Map({
                name: 'Dip',
                sets: 5,
                currSets: 0,
                reps: 5,
                timeBetweenSets: 180,
                variations: ['Assisted Ring Dips', 'Ring Dips', 'Weighted Ring Dips'],
                selectedVariation: 0,
              }),
              Map({
                name: 'Row',
                sets: 5,
                currSets: 0,
                reps: 5,
                timeBetweenSets: 180,
                variations: ['Normal Row'],
                selectedVariation: 0,
              }),
              Map({
                name: 'Pullup',
                sets: 5,
                currSets: 0,
                reps: 5,
                timeBetweenSets: 180,
                variations: ['Negative Pullup', 'Assisted Pullup', 'Full Ring Pullup', 'Ring Muscle Up'],
                selectedVariation: 2,
              }),
              Map({
                name: 'Pushup',
                sets: 5,
                currSets: 0,
                reps: 5,
                timeBetweenSets: 180,
                variations: ['Normal Pushup', 'Ring Pushup', 'Reverse Ring Pushup'],
                selectedVariation: 2,
              }),
            ]),
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
  handleFinishedSetBtnClk(exerciseIndex) {
    this.setState(({ data }) => ({
      data: data.updateIn(
        ['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'currSets'], val => val + 1,
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
