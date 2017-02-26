import { Map, List } from 'immutable';

const defaultState = Map({
  currentWorkout: 0,
  default_settings: Map({
    weightUnit: 'kg',
    countdownTimerLength: 10,
    countdownTimerVoicePrompt: true,
  }),
  routines: Map({
    fullBodyWorkout: Map({
      exercises: List([
        Map({
          name: 'Handstand',
          sets: 5,
          currSets: 0,
          reps: 1,
          timeBetweenSets: 180,
          timeLengthOfExercise: 30,
          timeLengthOfExerciseCounter: 30,
          variations: ['Against Wall', 'Free Standing'],
          selectedVariation: 0,
          isCountingDown: false,
          isInRecovery: false,
        }),
        Map({
          name: 'Dip',
          sets: 5,
          currSets: 0,
          reps: 5,
          timeBetweenSets: 180,
          variations: ['Assisted Ring Dips', 'Ring Dips', 'Weighted Ring Dips'],
          selectedVariation: 0,
          isInRecovery: false,
        }),
        Map({
          name: 'Row',
          sets: 5,
          currSets: 0,
          reps: 5,
          timeBetweenSets: 180,
          variations: ['Normal Row'],
          selectedVariation: 0,
          isInRecovery: false,
        }),
        Map({
          name: 'Pullup',
          sets: 5,
          currSets: 0,
          reps: 5,
          timeBetweenSets: 180,
          variations: ['Negative Pullup', 'Assisted Pullup', 'Full Ring Pullup', 'Ring Muscle Up'],
          selectedVariation: 2,
          isInRecovery: false,
        }),
        Map({
          name: 'Pushup',
          sets: 5,
          currSets: 0,
          reps: 5,
          timeBetweenSets: 180,
          variations: ['Normal Pushup', 'Ring Pushup', 'Reverse Ring Pushup'],
          selectedVariation: 2,
          isInRecovery: false,
        }),
      ]),
    }),
  }),
});

export default defaultState;
