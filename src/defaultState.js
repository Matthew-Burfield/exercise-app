const defaultState = {
  editMode: false,
  currentWorkout: {
    currentRoutine: undefined,
    currentExercise: undefined,
  },
  routines: [{
    name: 'Full Body Workout',
    exercises: [{
      name: 'Handstand',
      sets: 5,
      reps: 1,
      timer: {
        prepTime: 5,
        holdTime: 30,
        restTime: 60,
      },
    }, {
      name: 'Plank',
      sets: 2,
      reps: 1,
      timer: {
        prepTime: 3,
        holdTime: 60,
        restTime: 60,
      },
    }, {
      name: 'Ring Hold',
      sets: 2,
      reps: 1,
      timer: {
        prepTime: 5,
        holdTime: 60,
        restTime: 60,
      },
    }, {
      name: 'Pull ups',
      sets: 5,
      reps: 5,
      timer: {
        restTime: 180,
      },
    }, {
      name: 'Dips',
      sets: 5,
      reps: 5,
      timer: {
        restTime: 180,
      },
    }, {
      name: 'Pushups',
      sets: 5,
      reps: 5,
      timer: {
        restTime: 180,
      },
    }, {
      name: 'Rows',
      sets: 5,
      reps: 5,
      timer: {
        restTime: 180,
      },
    }, {
      name: 'Squat',
      sets: 5,
      reps: 5,
      weight: 80,
      timer: {
        restTime: 180,
      },
    }, {
      name: 'Deadlift',
      sets: 5,
      reps: 5,
      timer: {
        restTime: 180,
      },
    }, {
      name: 'Kettle Bell Swings',
      sets: 2,
      timer: {
        prepTime: 5,
        holdTime: 60,
        restTime: 180,
      },
    }],
  }, {
    name: 'Second Routine',
    exercises: [],
  }, {
    name: 'Third Routine',
    exercises: [],
  }],
};

export default defaultState;
