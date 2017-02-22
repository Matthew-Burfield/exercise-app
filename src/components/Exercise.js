import React from 'react';
import { Button } from 'react-bootstrap';

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeBetweenSets: this.props.exercise.get('timeBetweenSets'),
      timeLengthOfExercise: this.props.exercise.get('timeLengthOfExercise'),
      isCountingDown: false,
    };
    this.tick = this.tick.bind(this);
    this.handleFinishedSetBtnClk = this.handleFinishedSetBtnClk.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  tick(key) {
    this.setState(prevState => ({
      [key]: prevState.timeBetweenSets - 1,
    }));
    if (this.state.timeBetweenSets <= 0) {
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
    this.setState({
      isCountingDown: true,
    });
    clearInterval(this.interval);
    this.interval = setInterval(() => this.tick('timeBetweenSets'), 1000);
  }

  render() {
    const ex = this.props.exercise;
    const bgGreen = '#66BB6A';
    const bgRed = '#EF5350';
    // const bgOrange = '#FFA726';
    const backgroundColor = this.state.isCountingDown ? bgRed : bgGreen;

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
        {this.state.isCountingDown &&
          <TimeBetweenSets
            timeBetweenSets={this.state.timeBetweenSets}
          />
        }
        {!this.state.isCountingDown &&
          <Button bsSize="large" onClick={this.handleFinishedSetBtnClk}>
            Finished Set
          </Button>
        }
      </div>
    </div>);
  }
}

const addLeadingZerosToNumber = (number) => {
  let returnVal;
  if (number.toString().length === 1) {
    returnVal = `0${number}`;
  } else {
    returnVal = number;
  }
  return returnVal;
  // return number.toString().length === 1 ? `0${number}` : number;
};

const TimeBetweenSets = (props) => {
  const minUntilNextSet = Math.floor((props.timeBetweenSets % (60 * 60)) / 60);
  const secUntilNextSet = addLeadingZerosToNumber(Math.floor(props.timeBetweenSets % 60));

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

TimeBetweenSets.propTypes = {
  timeBetweenSets: React.PropTypes.number.isRequired,
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
