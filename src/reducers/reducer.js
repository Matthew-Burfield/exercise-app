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
  REMOVE_PREPARATION_PERIOD,
  REMOVE_HOLD_PERIOD,
  REMOVE_REST_PERIOD,
  ADD_INTERVAL,
  UPDATE_TIMER_ON_MOUNT,
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
          timerStarted: new Date(),
          preparationPeriod: preparationPeriod || 0,
          holdPeriod: holdPeriod || 0,
          restPeriod: restPeriod || 0,
        }),
      );

    }


    case REDUCE_PREPARATION_PERIOD: {

      return state.updateIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer', 'preparationPeriod'],
        (val) => {

          if (val > 0) {

            return val - 1;

          }

          return val;

        },
      );

    }


    case REDUCE_HOLD_PERIOD: {

      return state.updateIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer', 'holdPeriod'],
        (val) => {

          if (val > 0) {

            return val - 1;

          }

          return val;

        },
      );

    }


    case REDUCE_REST_PERIOD: {

      return state.updateIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer', 'restPeriod'],
        (val) => {

          if (val > 0) {

            return val - 1;

          }

          return val;

        },
      );

    }


    case REMOVE_PREPARATION_PERIOD: {

      return state.deleteIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer', 'preparationPeriod'],
      );

    }


    case REMOVE_HOLD_PERIOD: {

      return state.deleteIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer', 'holdPeriod'],
      );

    }


    case REMOVE_REST_PERIOD: {

      return state.deleteIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer', 'restPeriod'],
      );

    }


    case ADD_INTERVAL: {

      return state.setIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer', 'interval'],
        action.interval,
      );

    }


    case UPDATE_TIMER_ON_MOUNT: {

      const exercise = state.getIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer'],
      );
      const preparationPeriod = exercise.get('preparationPeriod');
      const holdPeriod = exercise.get('holdPeriod');
      const restPeriod = exercise.get('restPeriod');
      let newPreparationPeriod = 0;
      let newHoldPeriod = 0;
      let newRestPeriod = 0;

      if (preparationPeriod > 0) {

        newPreparationPeriod = preparationPeriod - action.timeDiffInSec;

      }
      if (holdPeriod > 0 && newPreparationPeriod < 0) {

        newHoldPeriod = holdPeriod - Math.abs(newPreparationPeriod);

      }
      if (restPeriod > 0 && newHoldPeriod < 0) {

        newRestPeriod = restPeriod - Math.abs(newHoldPeriod);

      }

      let newState;
      if (preparationPeriod !== undefined) {

        newState = state.setIn(
          ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer', 'preparationPeriod'],
          newPreparationPeriod,
        );

      }
      if (newHoldPeriod !== undefined) {

        newState = newState.setIn(
          ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer', 'holdPeriod'],
          newHoldPeriod,
        );

      }
      if (restPeriod !== undefined) {

        newState = newState.setIn(
          ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'timer', 'restPeriod'],
          newRestPeriod,
        );

      }
      return newState;

    }


    default:
      return state;
  }

};

export default reducer;
