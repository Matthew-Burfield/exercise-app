import React from 'react';
import { Button } from 'react-bootstrap';

import {
  // increaseCurrentSet,
  // reducePreparationPeriod,
  // reduceHoldPeriod,
  // reduceRestPeriod,
  // addInterval,
  createTimer,
  updateCount,
  // clearTimer,
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


const Exercise = (props) => {
  const { exercise, dispatch, currentWorkout } = props;

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


  const isInRecovery = exercise.get('isInRecovery');
  const isCountingDown = exercise.get('isCountingDown');

  const countVal = exercise.get('timer');
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


  // const tick = (exerciseId) => {
  //   // console.log(props);
  //   const timer = exercise.get('timer');
  //   const preparationPeriod = timer.get('preparationPeriod');
  //   const holdPeriod = timer.get('holdPeriod');
  //   const restPeriod = timer.get('restPeriod');
  //
  //   if (preparationPeriod > 0) {
  //     dispatch(reducePreparationPeriod(exerciseId));
  //   } else if (holdPeriod > 0) {
  //     dispatch(reduceHoldPeriod(exerciseId));
  //   } else if (restPeriod > 0) {
  //     dispatch(reduceRestPeriod(exerciseId));
  //   } else {
  //     // All counting has finished.
  //     clearInterval(timer.get('interval'));
  //     dispatch(clearTimer(exerciseId));
  //   }
  // };


  const handleClick = (exerciseId) => {
    dispatch(createTimer(exerciseId));
    // const interval = setInterval(() => tick(
    //   exerciseId,
    // ), 1000);
    // dispatch(addInterval(exerciseId, interval));
  };

  const getCountValue = () => {
    const timer = exercise.get('timer');
    const timeDiff = timer ? (new Date() - timer.get('preparationPeriod')) / 1000 : '';
    dispatch(updateCount(currentWorkout, timeDiff));
    return timeDiff;
  };
};

export default Exercise;
