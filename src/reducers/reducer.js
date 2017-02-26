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

    case INCREASE_CURRENT_SET: {
      const numExercises = this.state.data.getIn(['routines', 'fullBodyWorkout', 'exercises']).size;
      let currentWorkout = this.state.data.get('currentWorkout');

      currentWorkout += 1;
      if (currentWorkout > numExercises - 1) {
        currentWorkout = numExercises - 1;
      }

      return state.data.set('currentWorkout', currentWorkout);
    }


    case NEXT_EXERCISE:
    case PREVIOUS_EXERCISE:
    case RESET_EXERCISE_TIMER:
    case START_EXERCISE_TIMER:
    case INCREASE_EXERCISE_TIMER:
      break;
    default:
      return state;
  }
  return state;
};
export default reducer;

//
// /**
//  * User has clicked the button to say they have finished their current set.
//  * Start the timer loop and increase the number of sets.
//  */
// handleFinishedSetBtnClk(exerciseIndex) {
//   this.setState(prevState => ({
//     data: prevState.data.updateIn(
//       ['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'currSets'], val => val + 1,
//     ),
//   }));
//   this.resetTimer(exerciseIndex);
//   this.startCountdown(exerciseIndex, true);
//   this.createInterval(exerciseIndex, 'timeBetweenSets');
// }
//

//
// /**
//  * Descrease the currentWorkout. This will rerender the screen to the next exercise.
//  */
// previousExercise() {
//   let currentWorkout = this.state.data.get('currentWorkout') - 1;
//   currentWorkout = currentWorkout < 0 ? 0 : currentWorkout;
//
//   this.setState(prevState => ({
//     data: prevState.data.set('currentWorkout', currentWorkout),
//   }));
// }
//
//
// tick(exerciseIndex, key) {
//   const isInRecovery = this.state.data.getIn(['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'isInRecovery']);
//   const timeLengthOfExercise = this.state.data.getIn(['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'timeLengthOfExerciseCounter']);
//   const timeBetweenSets = this.state.data.getIn(['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'timeBetweenSets']);
//
//   this.setState(prevState => ({
//     data: prevState.data.updateIn(
//       ['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, key], val => val - 1,
//     ),
//   }));
//
//   if (!isInRecovery && timeLengthOfExercise <= 0) {
//     this.handleFinishedSetBtnClk(exerciseIndex);
//   }
//   if (isInRecovery && timeBetweenSets <= 0) {
//     clearInterval(this.interval);
//     this.resetTimer(exerciseIndex);
//   }
// }
//
// resetTimer(exerciseIndex) {
//   this.setState(prevState => ({
//     data: prevState.data.setIn(
//       ['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'timeBetweenSets'], 180,
//     ),
//   }));
//   this.setState(prevState => ({
//     data: prevState.data.setIn(
//       ['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'isCountingDown'], false,
//     ),
//   }));
//   this.setState(prevState => ({
//     data: prevState.data.setIn(
//       ['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'isInRecovery'], false,
//     ),
//   }));
// }
//
// handleStartTimerBtnClk(exerciseIndex) {
//   this.startCountdown(exerciseIndex, false);
//   this.createInterval(exerciseIndex, 'timeLengthOfExerciseCounter');
// }
//
// startCountdown(exerciseIndex, isInRecovery = false) {
//   this.setState(prevState => ({
//     data: prevState.data.setIn(
//       ['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'isCountingDown'], true,
//     ),
//   }));
//   this.setState(prevState => ({
//     data: prevState.data.setIn(
//       ['routines', 'fullBodyWorkout', 'exercises', exerciseIndex, 'isInRecovery'], isInRecovery,
//     ),
//   }));
// }
//
// createInterval(exerciseIndex, counterValue) {
//   clearInterval(this.interval);
//   this.interval = setInterval(() => this.tick(exerciseIndex, counterValue), 1000);
// }
