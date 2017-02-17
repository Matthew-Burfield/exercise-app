import React from 'react';

const Exercise = (props) => {
  const ex = props.exercise;

  return (<div>
    <p><b>Name:</b> {ex.name}</p>
    <p><b>Sets:</b> {ex.sets}</p>
    <p><b>Reps:</b> {ex.sets}</p>
    {ex.selectedVariation !== '' && ex.variations.length > 0 &&
      <p><b>Current Variation:</b> {ex.variations[ex.selectedVariation]}</p>
    }
    {ex.weight &&
      <p><b>weight:</b> {ex.weight}</p>
    }
    <p><b>Time in between sets:</b> {ex.minInBetweenSets} min</p>
  </div>);
};

Exercise.propTypes = {
  exercise: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    sets: React.PropTypes.number.isRequired,
    reps: React.PropTypes.number.isRequired,
    minInBetweenSets: React.PropTypes.number,
    variations: React.PropTypes.arrayOf(React.PropTypes.string),
    selectedVariation: React.PropTypes.number,
    weight: React.PropTypes.number,
    timeLengthOfExercise: React.PropTypes.number,
  }),
};

Exercise.defaultProps = {
  exercise: {
    name: '',
    sets: 0,
    reps: 0,
  },
};

export default Exercise;
