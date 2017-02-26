export const INCREASE_CURRENT_SET = 'INCREASE_CURRENT_SET';
export const NEXT_EXERCISE = 'NEXT_EXERCISE';
export const PREVIOUS_EXERCISE = 'PREVIOUS_EXERCISE';
export const RESET_EXERCISE_TIMER = 'RESET_EXERCISE_TIMERS';
export const START_EXERCISE_TIMER = 'START_EXERCISE_TIMER';
export const INCREASE_EXERCISE_TIMER = 'INCREASE_EXERCISE_TIMER';


export const increaseCurrentSet = (routineId, exerciseId) => ({
  type: INCREASE_CURRENT_SET,
  routineId,
  exerciseId,
});


export const nextExercise = (routineId, currentExerciseId) => ({
  type: NEXT_EXERCISE,
  routineId,
  currentExerciseId,
});


export const previousExercise = (routineId, currentExerciseId) => ({
  type: PREVIOUS_EXERCISE,
  routineId,
  currentExerciseId,
});


export const resetExerciseTimer = (routineId, exerciseId) => ({
  type: RESET_EXERCISE_TIMER,
  routineId,
  exerciseId,
});


export const startExerciseTimer = (routineId, exerciseId) => ({
  type: START_EXERCISE_TIMER,
  routineId,
  exerciseId,
});


export const increaseExerciseTimer = (routineId, exerciseId) => ({
  type: INCREASE_EXERCISE_TIMER,
  routineId,
  exerciseId,
});
