import React from 'react';

const Exercise = (props) => {
  const ex = props.exercise;

  return (<div>
    <p><b>Name:</b> {props.params.name}</p>
    <p><b>Sets:</b> {ex.get('currSets')}/{ex.get('sets')}</p>
    <p><b>Reps:</b> {ex.get('reps')}</p>
    {/* {ex.selectedVariation !== '' && ex.variations.length > 0 &&
      <p><b>Current Variation:</b> {ex.variations[ex.selectedVariation]}</p>
    } */}
    {ex.get('weight') &&
      <p><b>weight:</b> {ex.get('weight')}</p>
    }
    <p><b>Time in between sets:</b> {ex.get('minInBetweenSets')} min</p>
    <button onClick={() => props.handleFinishedSetBtnClk(props.params.name)}>Finished Set</button>
  </div>);
};

Exercise.propTypes = {
  params: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
  }).isRequired,
  exercise: React.PropTypes.shape({
    sets: React.PropTypes.number,
    currSets: React.PropTypes.number,
    reps: React.PropTypes.number,
    minInBetweenSets: React.PropTypes.number,
    variations: React.PropTypes.arrayOf(React.PropTypes.string),
    selectedVariation: React.PropTypes.number,
    weight: React.PropTypes.number,
    timeLengthOfExercise: React.PropTypes.number,
  }),
  handleFinishedSetBtnClk: React.PropTypes.func,
};

Exercise.defaultProps = {
  exercise: {
    name: '',
    sets: 0,
    currSets: 0,
    reps: 0,
  },
  handleFinishedSetBtnClk() {},
};

export default Exercise;
