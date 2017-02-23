import React from 'react';
import { Button } from 'react-bootstrap';

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
    if (ex.get('isInRecovery')) {
      backgroundColor = bgRed;
      counterValue = ex.get('timeBetweenSets');
    } else if (ex.get('isCountingDown')) {
      backgroundColor = bgOrange;
      counterValue = ex.get('timeLengthOfExercise');
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
        {ex.get('isCountingDown') &&
          <CountdownTimer
            remainingTime={counterValue}
          />
        }
        {!ex.get('isCountingDown') && ex.get('timeLengthOfExercise') === undefined &&
          <Button
            bsSize="large"
            onClick={() => this.props.handleFinishedSetBtnClk(this.props.currentWorkout)}
          >
            Finished Set
          </Button>
        }
        {!ex.get('isCountingDown') && ex.get('timeLengthOfExercise') !== undefined &&
          <Button
            bsSize="large"
            onClick={() => this.props.handleStartTimerBtnClk(this.props.currentWorkout)}
          >
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
  handleStartTimerBtnClk: React.PropTypes.func,
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
  handleStartTimerBtnClk() {},
};

export default Exercise;
