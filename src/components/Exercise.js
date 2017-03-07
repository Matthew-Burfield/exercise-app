import React from 'react';
import { Button } from 'react-bootstrap';

// import {
//   // increaseCurrentSet,
//   reducePreparationPeriod,
//   removePreparationPeriod,
//   reduceHoldPeriod,
//   removeHoldPeriod,
//   reduceRestPeriod,
//   removeRestPeriod,
//   addInterval,
//   createTimer,
//   clearTimer,
// } from '../actions/actions';
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
const getBackgroundColour = (isCounting, firstCount, secondCount, thirdCount) => {

  const bgGreen = '#66BB6A';
  const bgRed = '#EF5350';
  const bgOrange = '#FFA726';

  if (!isCounting) {

    return bgGreen;

  } else if (firstCount > 0) {

    return 'yellow';

  } else if (secondCount > 0) {

    return bgOrange;

  } else if (thirdCount > 0) {

    return bgRed;

  }
  return 'white';

};

const getRemainingTime = (prepTime, holdTime, restTime) => {

  if (prepTime > 0) {

    return prepTime;

  } else if (holdTime > 0) {

    return holdTime;

  }
  return restTime;

};


const ExerciseData = ({ name, value, className }) => {

  ExerciseData.propTypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    className: React.PropTypes.string,
  };

  ExerciseData.defaultProps = {
    name: undefined,
    value: undefined,
    className: '',
  };

  if (value && value !== undefined) {

    return (
      <div className={className}>
        <p>
          {name && <b>{name}:</b>}
          <span> {value}</span>
        </p>
      </div>
    );

  }
  return null;

};


export class ExerciseDataWrapper extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    className: React.PropTypes.string,
  };

  static defaultProps = {
    name: undefined,
    value: undefined,
    className: '',
  };

  shouldComponentUpdate(nextProps) {

    if (this.props.name === nextProps.name &&
        this.props.value === nextProps.value &&
        this.props.className === nextProps.className) {

      return false;

    }
    return true;

  }

  render() {

    return <ExerciseData {...this.props} />;

  }
}

const Exercise = ({ exercise, currentExercise, handleClick }) => {

  Exercise.propTypes = {
    exercise: React.PropTypes.shape({
      name: React.PropTypes.string,
      sets: React.PropTypes.number,
      numSets: React.PropTypes.number,
      reps: React.PropTypes.number,
      weight: React.PropTypes.number,
      timer: React.PropTypes.shape({}),
    }),
    currentExercise: React.PropTypes.number.isRequired,
    handleClick: React.PropTypes.func.isRequired,
  };


  Exercise.defaultProps = {
    exercise: {
      name: '',
      sets: 0,
      numSets: 0,
      reps: 0,
      timer: {},
    },
  };

  const style = {
    backgroundColor: getBackgroundColour(exercise.timer.interval,
                                         exercise.timer.prepTimeVal,
                                         exercise.timer.holdTimeVal,
                                         exercise.timer.restTimeVal,
                                        ),
  };

  const numSets = exercise.numSets ? exercise.numSets.toString() : '0';
  const repTime = exercise.timer.holdTime ? `${exercise.timer.holdTime} sec hold` : undefined;
  const weight = exercise.weight ? `${exercise.weight}kg` : undefined;

  return (<div>
    <div className="currentExercise" style={style}>
      <ExerciseDataWrapper name="Name" value={exercise.name} />
      <ExerciseDataWrapper name="Sets" value={`${numSets} / ${exercise.sets.toString()}`} />
      <ExerciseDataWrapper name="Reps" value={exercise.reps.toString()} />
      <ExerciseDataWrapper name="Weight" value={weight} />
      <ExerciseDataWrapper value={repTime} />
      {exercise.timer.interval &&
        <CountdownTimer
          value={getRemainingTime(exercise.timer.prepTimeVal,
                                  exercise.timer.holdTimeVal,
                                  exercise.timer.restTimeVal,
                                 )
          }
        />
      }
      {!exercise.timer.interval &&
        <Button
          bsSize="large"
          onClick={() => { handleClick(currentExercise); }}
        >
          Finished Set
        </Button>
      }
    </div>
  </div>);

};

export default Exercise;
