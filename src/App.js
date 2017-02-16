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
      exercises: [{
        name: 'Squat',
        sets: 5,
        reps: 5,
        minInBetweenSets: 5,
        weight: 20,
      }, {
        name: 'Handstand',
        sets: 5,
        reps: 1,
        minInBetweenSets: 3,
        timeLengthOfExercise: 0.5,
        variations: ['Against Wall, Free Standing'],
        selectedVariation: 0,
      }],
    };
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
