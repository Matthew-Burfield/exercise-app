export const INCREASE_CURRENT_SET = 'INCREASE_CURRENT_SET';
export const NEXT_EXERCISE = 'NEXT_EXERCISE';
export const PREVIOUS_EXERCISE = 'PREVIOUS_EXERCISE';
export const REDUCE_PREPARATION_PERIOD = 'REDUCE_PREPARATION_PERIOD';
export const REDUCE_HOLD_PERIOD = 'REDUCE_HOLD_PERIOD';
export const REDUCE_REST_PERIOD = 'REDUCE_REST_PERIOD';
export const CLEAR_TIMER = 'CLEAR_TIMER';
export const CREATE_TIMER = 'CREATE_TIMER';
export const ADD_INTERVAL = 'ADD_INTERVAL';


export const increaseCurrentSet = exerciseId => ({
  type: INCREASE_CURRENT_SET,
  exerciseId,
});


export const nextExercise = currentExerciseId => ({
  type: NEXT_EXERCISE,
  currentExerciseId,
});


export const previousExercise = currentExerciseId => ({
  type: PREVIOUS_EXERCISE,
  currentExerciseId,
});


export const reducePreparationPeriod = exerciseId => ({
  type: REDUCE_PREPARATION_PERIOD,
  exerciseId,
});


export const reduceHoldPeriod = exerciseId => ({
  type: REDUCE_HOLD_PERIOD,
  exerciseId,
});


export const reduceRestPeriod = exerciseId => ({
  type: REDUCE_REST_PERIOD,
  exerciseId,
});


export const clearTimer = exerciseId => ({
  type: CLEAR_TIMER,
  exerciseId,
});


export const createTimer = exerciseId => ({
  type: CREATE_TIMER,
  exerciseId,
});


export const addInterval = (exerciseId, interval) => ({
  type: ADD_INTERVAL,
  exerciseId,
  interval,
});
