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


/**
 * [getCounterValue description]
 * @param  {Boolean} isInRecovery                [description]
 * @param  {Boolean} isCountingDown              [description]
 * @param  {[type]}  timeBetweenSetsm            [description]
 * @param  {[type]}  timeLengthOfExerciseCounter [description]
 * @return {[type]}                              [description]
 */
const getCounterValue = (
  isInRecovery,
  isCountingDown,
  timeBetweenSetsm,
  timeLengthOfExerciseCounter,
) => {
  if (isInRecovery) {
    return timeBetweenSetsm;
  } else if (isCountingDown) {
    return timeLengthOfExerciseCounter;
  }
  return '';
};


export const tick = (dispatch, timer, exerciseId) => {
  const preparationPeriod = timer.get('preparationPeriod');
  const holdPeriod = timer.get('holdPeriod');
  const restPeriod = timer.get('restPeriod');

  if (preparationPeriod > 0) {
    dispatch(reducePreparationPeriod(exerciseId));
  } else if (holdPeriod > 0) {
    dispatch(reduceHoldPeriod(exerciseId));
  } else if (restPeriod > 0) {
    dispatch(reduceRestPeriod(exerciseId));
  } else {
    // All counting has finished.
    clearInterval(timer.get('interval'));
    dispatch(clearTimer(exerciseId));
  }
};


const handleClick = (dispatch, exercise, exerciseId) => {
  dispatch(createTimer(exerciseId));
  const interval = setInterval(() => tick(
    dispatch,
    exercise.get('timer'),
    exerciseId,
  ), 1000);
  dispatch(addInterval(exerciseId, interval));
};


const Exercise = ({ exercise, dispatch, currentWorkout }) => {
  const isInRecovery = exercise.get('isInRecovery');
  const isCountingDown = exercise.get('isCountingDown');
  const timeLengthOfExerciseCounter = exercise.get('timeLengthOfExerciseCounter');
  const backgroundColor = getBackgroundColour(
    isInRecovery,
    isCountingDown,
  );
  const counterValue = getCounterValue(
    isInRecovery,
    isCountingDown,
    exercise.get('timeBetweenSets'),
    timeLengthOfExerciseCounter,
  );

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
      {isCountingDown &&
        <CountdownTimer
          remainingTime={counterValue}
        />
      }
      {!isCountingDown && timeLengthOfExerciseCounter === undefined &&
        <Button
          bsSize="large"
          onClick={() => handleClick(dispatch, exercise, currentWorkout)}
        >
          {timeLengthOfExerciseCounter === undefined && 'Finished Set'}
          {timeLengthOfExerciseCounter !== undefined && 'Start Timer'}
        </Button>
      }
    </div>
  </div>);
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
  dispatch: React.PropTypes.func,
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
  dispatch: () => {},
};

export default Exercise;
