import React from 'react';
import { Button } from 'react-bootstrap';

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeBetweenSets: this.props.exercise.get('timeBetweenSets'),
      timeLengthOfExercise: this.props.exercise.get('timeLengthOfExercise'),
      isCountingDown: false,
      isInRecovery: false,
    };
    this.tick = this.tick.bind(this);
    this.handleFinishedSetBtnClk = this.handleFinishedSetBtnClk.bind(this);
    this.handleStartTimerBtnClk = this.handleStartTimerBtnClk.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.createInterval = this.createInterval.bind(this);
  }

  tick(key) {
    this.setState(prevState => ({
      [key]: prevState[key] - 1,
    }));
    if (!this.state.isInRecovery && this.state.timeLengthOfExercise < 0) {
      this.handleFinishedSetBtnClk();
    }
    if (this.state.isInRecovery && this.state.timeBetweenSets < 0) {
      clearInterval(this.interval);
      this.resetTimer();
    }
  }

  resetTimer() {
    this.setState({
      timeBetweenSets: this.props.exercise.get('timeBetweenSets'),
      isCountingDown: false,
    });
  }

  handleFinishedSetBtnClk() {
    this.props.handleFinishedSetBtnClk(this.props.currentWorkout);
    this.resetTimer();
    this.startCountdown(true);
    this.createInterval('timeBetweenSets');
  }

  handleStartTimerBtnClk() {
    this.startCountdown();
    this.createInterval('timeLengthOfExercise');
  }

  startCountdown(isInRecovery = false) {
    this.setState({
      isCountingDown: true,
      isInRecovery,
    });
  }

  createInterval(counterValue) {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.tick(counterValue), 1000);
  }

  render() {
    const ex = this.props.exercise;
    const bgGreen = '#66BB6A';
    const bgRed = '#EF5350';
    const bgOrange = '#FFA726';


    /**
     * We need to determine the background color, which changes to:
     *  red if we are in recovering inbetween sets
     *  orange if we are currently timing a static hold
     *  green if we are waiting for the user to start the next set
     */
    let backgroundColor;
    let counterValue;
    if (this.state.isInRecovery) {
      backgroundColor = bgRed;
      counterValue = this.state.timeBetweenSets;
    } else if (this.state.isCountingDown) {
      backgroundColor = bgOrange;
      counterValue = this.state.timeLengthOfExercise;
    } else {
      backgroundColor = bgGreen;
      counterValue = '';
    }


    return (<div>
      <div className="currentExercise" style={{ backgroundColor }}>
        <p className="title"><b className="name">Name: </b>{ex.get('name')}</p>
        <p><b className="sets">Sets:</b> {ex.get('currSets')}/{ex.get('sets')}</p>
        <p><b className="reps">Reps:</b> {ex.get('reps')}</p>
        {/* {ex.selectedVariation !== '' && ex.variations.length > 0 &&
          <p><b>Current Variation:</b> {ex.variations[ex.selectedVariation]}</p>
        } */}
        {ex.get('weight') &&
          <p><b className="weights">weight:</b> {ex.get('weight')}</p>
        }
        {ex.get('weight') &&
          <p><b className="weights">weight:</b> {ex.get('weight')}</p>
        }
        {ex.get('timeLengthOfExercise') !== undefined &&
          <p>{ex.get('timeLengthOfExercise')} sec hold</p>
        }
        {this.state.isCountingDown &&
          <CountdownTimer
            remainingTime={counterValue}
          />
        }
        {!this.state.isCountingDown && ex.get('timeLengthOfExercise') === undefined &&
          <Button bsSize="large" onClick={this.handleFinishedSetBtnClk}>
            Finished Set
          </Button>
        }
        {!this.state.isCountingDown && ex.get('timeLengthOfExercise') !== undefined &&
          <Button bsSize="large" onClick={this.handleStartTimerBtnClk}>
            Start Timer
          </Button>
        }
      </div>
    </div>);
  }
}


/**
 * When displaying the counter, we want the seconds
 * remaining to display with two digits. I.e. 6 seconds
 * remaining should display as 06.
 * @param {[Integer]} number [The display number]
 */
const addLeadingZerosToNumber = (number) => {
  let returnVal;
  if (number.toString().length === 1) {
    returnVal = `0${number}`;
  } else {
    returnVal = number;
  }
  return returnVal;
};


/**
 * Display the countdown timer
 * @param {[type]} props [contains the time remaining in the countdown]
 */
const CountdownTimer = (props) => {
  const minUntilNextSet = Math.floor((props.remainingTime % (60 * 60)) / 60);
  const secUntilNextSet = addLeadingZerosToNumber(Math.floor(props.remainingTime % 60));

  return (
    <div className="setCountdownTimer">
      <p className="mobile">
        {minUntilNextSet} : {secUntilNextSet}
      </p>
      <p className="desktop">
        <b>Time in between sets: </b>{minUntilNextSet} min {secUntilNextSet} sec
      </p>
    </div>
  );
};

CountdownTimer.propTypes = {
  remainingTime: React.PropTypes.number.isRequired,
};

Exercise.propTypes = {
  currentWorkout: React.PropTypes.number,
  exercise: React.PropTypes.shape({
    get: React.PropTypes.func,
    sets: React.PropTypes.number,
    currSets: React.PropTypes.number,
    reps: React.PropTypes.number,
    timeUntilNextSet: React.PropTypes.number,
    variations: React.PropTypes.arrayOf(React.PropTypes.string),
    selectedVariation: React.PropTypes.number,
    weight: React.PropTypes.number,
    timeLengthOfExercise: React.PropTypes.number,
  }),
  handleFinishedSetBtnClk: React.PropTypes.func,
};

Exercise.defaultProps = {
  currentWorkout: 0,
  exercise: {
    name: '',
    sets: 0,
    currSets: 0,
    reps: 0,
    get() {
      return '';
    },
  },
  handleFinishedSetBtnClk() {},
};

export default Exercise;
