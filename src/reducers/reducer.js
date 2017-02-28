import { Map } from 'immutable';

import {
  INCREASE_CURRENT_SET,
  NEXT_EXERCISE,
  PREVIOUS_EXERCISE,
  RESET_EXERCISE_TIMER,
  START_EXERCISE_TIMER,
  INCREASE_EXERCISE_TIMER,
  CREATE_TIMER,
  REDUCE_PREPARATION_PERIOD,
  REDUCE_HOLD_PERIOD,
  REDUCE_REST_PERIOD,
} from '../actions/actions';
import defaultState from '../defaultState';

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case INCREASE_CURRENT_SET: {
      return state.updateIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'currSets'],
        val => val + 1,
      );
    }


    case NEXT_EXERCISE: {
      const numExercises = state.getIn(['routines', 'fullBodyWorkout', 'exercises']).size - 1;

      let currentWorkout = state.get('currentWorkout');
      currentWorkout += 1;
      currentWorkout = currentWorkout > numExercises ? numExercises : currentWorkout;

      return state.set('currentWorkout', currentWorkout);
    }


    case PREVIOUS_EXERCISE: {
      let currentWorkout = state.get('currentWorkout');
      currentWorkout -= 1;
      currentWorkout = currentWorkout < 0 ? 0 : currentWorkout;

      return state.set('currentWorkout', currentWorkout);
    }


    case RESET_EXERCISE_TIMER: {
      state.setIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timeBetweenSets'], 180,
      );
      state.setIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'isCountingDown'], false,
      );
      return state.setIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'isInRecovery'], false,
      );
    }


    case START_EXERCISE_TIMER: {
      state.setIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'isCountingDown'], true,
      );
      return state.setIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'isInRecovery'], false,
      );
    }


    case INCREASE_EXERCISE_TIMER: {
      return state.updateIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer'], val => val - 1,
      );
    }


    case CREATE_TIMER: {
      const exercise = state.getIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId],
      );
      const preparationPeriod = exercise.get('preparationPeriod');
      const holdPeriod = exercise.get('holdPeriod');
      const restPeriod = exercise.get('restPeriod');
      return state.setIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer'], Map({
          preparationPeriod: preparationPeriod || 0,
          holdPeriod: holdPeriod || 0,
          restPeriod: restPeriod || 0,
        }),
      );
    }


    case REDUCE_PREPARATION_PERIOD: {
      return state.updateIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer', 'preparationPeriod'],
        val => val - 1,
      );
    }


    case REDUCE_HOLD_PERIOD: {
      return state.updateIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer', 'holdPeriod'],
        val => val - 1,
      );
    }


    case REDUCE_REST_PERIOD: {
      return state.updateIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer', 'restPeriod'],
        val => val - 1,
      );
    }


    default:
      return state;
  }
};
export default reducer;
