import React, { Component } from 'react';
import NavBar from './components/NavBar';
import logo from './logo.svg';
import './App.css';

class App extends Component {
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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
