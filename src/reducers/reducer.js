import {
  INCREASE_CURRENT_SET,
  NEXT_EXERCISE,
  PREVIOUS_EXERCISE,
  RESET_EXERCISE_TIMER,
  START_EXERCISE_TIMER,
  INCREASE_EXERCISE_TIMER,
} from '../actions/actions';
import defaultState from '../defaultState';

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case INCREASE_CURRENT_SET:
      return state.updateIn(
        ['routines', 'fullBodyWorkout', 'exercises', action.exerciseId, 'currSets'],
        val => val + 1,
      );


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
    default:
      return state;
  }
};
export default reducer;
