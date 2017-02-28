import React from 'react';
import { Button } from 'react-bootstrap';

import {
  // increaseCurrentSet,
  reducePreparationPeriod,
  reduceHoldPeriod,
  reduceRestPeriod,
  addInterval,
  createTimer,
  clearTimer,
} from '../actions/actions';
import CountdownTimer from './CountdownTimer';

/**
 * We need to determine the background color, which changes to:
 * red if we are in recovering inbetween sets
 * orange if we are currently timing a static hold
 * green if we are waiting for the user to start the next set
 * @param  {Boolean} isInRecovery   Is true if the app is currently counting
 *                                  down for rest between sets
 * @param  {Boolean} isCountingDown Is true if the exercise is counting down a
 *                                  static hold
 * @return {[type]}                 Return the corresponding background HEX
 *                                  value as a string
 */
const getBackgroundColour = (isInRecovery, isCountingDown) => {
  const bgGreen = '#66BB6A';
  const bgRed = '#EF5350';
  const bgOrange = '#FFA726';

  if (isInRecovery) {
    return bgRed;
  } else if (isCountingDown) {
    return bgOrange;
  }
  return bgGreen;
};


class Exercise extends React.Component {

  static propTypes = {
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
    dispatch: React.PropTypes.func,
  };


  static defaultProps = {
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
    dispatch: () => {},
  };


  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  tick() {
    // console.log(props);
    const timer = this.props.exercise.get('timer');
    const preparationPeriod = timer.get('preparationPeriod');
    const holdPeriod = timer.get('holdPeriod');
    const restPeriod = timer.get('restPeriod');

    if (preparationPeriod > 0) {
      this.props.dispatch(reducePreparationPeriod(this.props.currentWorkout));
    } else if (holdPeriod > 0) {
      this.props.dispatch(reduceHoldPeriod(this.props.currentWorkout));
    } else if (restPeriod > 0) {
      this.props.dispatch(reduceRestPeriod(this.props.currentWorkout));
    } else {
      // All counting has finished.
      clearInterval(timer.get('interval'));
      this.props.dispatch(clearTimer(this.props.currentWorkout));
    }
  }


  handleClick() {
    this.props.dispatch(createTimer(this.props.currentWorkout));
    const interval = setInterval(this.tick, 1000);
    this.props.dispatch(addInterval(this.props.currentWorkout, interval));
  }


  render() {
    const { exercise } = this.props;
    const isInRecovery = exercise.get('isInRecovery');
    const isCountingDown = exercise.get('isCountingDown');
    const timer = exercise.get('timer');
    const timeLengthOfExerciseCounter = exercise.get('timeLengthOfExerciseCounter');
    const backgroundColor = getBackgroundColour(
      isInRecovery,
      isCountingDown,
    );
    const remainingTime =
      exercise.getIn(['timer', 'preparationPeriod']) ||
      exercise.getIn(['timer', 'holdPeriod']) ||
      exercise.getIn(['timer', 'restPeriod']) ||
      '';


    return (<div>
      <div className="currentExercise" style={{ backgroundColor }}>
        <div><p className="title"><b className="name">Name: </b>{exercise.get('name')}</p></div>
        <div><p><b className="sets">Sets:</b> {exercise.get('currSets')}/{exercise.get('sets')}</p></div>
        <div><p><b className="reps">Reps:</b> {exercise.get('reps')}</p></div>
        {/* {ex.selectedVariation !== '' && ex.variations.length > 0 &&
          <p><b>Current Variation:</b> {ex.variations[ex.selectedVariation]}</p>
        } */}
        {exercise.get('weight') &&
          <div><p><b className="weights">weight:</b> {exercise.get('weight')}</p></div>
        }
        {exercise.get('timeLengthOfExercise') !== undefined &&
          <div><p>{exercise.get('timeLengthOfExercise')} sec hold</p></div>
        }
        {timer &&
          <CountdownTimer
            remainingTime={remainingTime}
          />
        }
        {!timer &&
          <Button
            bsSize="large"
            onClick={this.handleClick}
          >
            {timeLengthOfExerciseCounter === undefined && 'Finished Set'}
            {timeLengthOfExerciseCounter !== undefined && 'Start Timer'}
          </Button>
        }
      </div>
    </div>);
  }
}

export default Exercise;
