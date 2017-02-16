import React, { Component } from 'react';
import NavBar from './components/NavBar';
import './App.css';

class App extends Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      default_settings: [{
        weightUnit: 'kg',
        countdownTimerLength: 10,
        countdownTimerVoicePrompt: true,
      }],
      routines: [{
        name: 'Full Body Workout',
        exercises: [{
          name: 'Handstand',
          sets: 5,
          reps: 1,
          minInBetweenSets: 3,
          timeLengthOfExercise: 0.5,
          variations: ['Against Wall', 'Free Standing'],
          selectedVariation: 0,
        }, {
          name: 'Dip',
          sets: 5,
          reps: 5,
          minInBetweenSets: 3,
          variations: ['Assisted Ring Dips', 'Ring Dips', 'Weighted Ring Dips'],
          selectedVariation: 0,
        }, {
          name: 'Row',
          sets: 5,
          reps: 5,
          minInBetweenSets: 3,
          variations: ['Normal Row'],
          selectedVariation: 0,
        }, {
          name: 'Pullup',
          sets: 5,
          reps: 5,
          minInBetweenSets: 3,
          variations: ['Negative Pullup', 'Assisted Pullup', 'Full Ring Pullup', 'Ring Muscle Up'],
          selectedVariation: 2,
        }, {
          name: 'Pushup',
          sets: 5,
          reps: 5,
          minInBetweenSets: 3,
          variations: ['Normal Pushup', 'Ring Pushup', 'Reverse Ring Pushup'],
          selectedVariation: 2,
        }],
      }],
    };
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        {this.props.children && React.cloneElement(this.props.children, {
          ...this.state,
        })}
      </div>
    );
  }
}

export default App;
