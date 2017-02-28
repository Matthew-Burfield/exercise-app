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
          restPeriod: 180,
          holdPeriod: 30,
          preparationPeriod: 5,
          variations: ['Against Wall', 'Free Standing'],
          selectedVariation: 0,
        }),
        Map({
          name: 'Dip',
          sets: 5,
          currSets: 0,
          reps: 5,
          restPeriod: 180,
          variations: ['Assisted Ring Dips', 'Ring Dips', 'Weighted Ring Dips'],
          selectedVariation: 0,
        }),
        Map({
          name: 'Row',
          sets: 5,
          currSets: 0,
          reps: 5,
          restPeriod: 180,
          variations: ['Normal Row'],
          selectedVariation: 0,
        }),
        Map({
          name: 'Pullup',
          sets: 5,
          currSets: 0,
          reps: 5,
          restPeriod: 180,
          variations: ['Negative Pullup', 'Assisted Pullup', 'Full Ring Pullup', 'Ring Muscle Up'],
          selectedVariation: 2,
        }),
        Map({
          name: 'Pushup',
          sets: 5,
          currSets: 0,
          reps: 5,
          restPeriod: 180,
          variations: ['Normal Pushup', 'Ring Pushup', 'Reverse Ring Pushup'],
          selectedVariation: 2,
        }),
      ]),
    }),
  }),
});

export default defaultState;
