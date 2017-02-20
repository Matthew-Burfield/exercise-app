import React from 'react';

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: this.props.exercise.get('timeBetweenSets'),
      isCountingDown: false,
    };
    this.tick = this.tick.bind(this);
    this.handleFinishedSetBtnClk = this.handleFinishedSetBtnClk.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  tick() {
    this.setState(prevState => ({
      secondsRemaining: prevState.secondsRemaining - 1,
    }));
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
      this.resetTimer();
    }
  }

  resetTimer() {
    this.setState({
      secondsRemaining: this.props.exercise.get('timeBetweenSets'),
    });
  }

  handleFinishedSetBtnClk() {
    this.props.handleFinishedSetBtnClk(this.props.params.name);
    this.resetTimer();
    clearInterval(this.interval);
    this.interval = setInterval(this.tick, 1000);
  }

  render() {
    const ex = this.props.exercise;

    return (<div>
      <p><b>Name:</b> {this.props.params.name}</p>
      <p><b>Sets:</b> {ex.get('currSets')}/{ex.get('sets')}</p>
      <p><b>Reps:</b> {ex.get('reps')}</p>
      {/* {ex.selectedVariation !== '' && ex.variations.length > 0 &&
        <p><b>Current Variation:</b> {ex.variations[ex.selectedVariation]}</p>
      } */}
      {ex.get('weight') &&
        <p><b>weight:</b> {ex.get('weight')}</p>
      }
      <TimeBetweenSets
        secondsRemaining={this.state.secondsRemaining}
      />
      <button onClick={this.handleFinishedSetBtnClk}>
        Finished Set
      </button>
    </div>);
  }
}

const TimeBetweenSets = (props) => {
  const minUntilNextSet = Math.floor((props.secondsRemaining % (60 * 60)) / 60);
  const secUntilNextSet = Math.floor(props.secondsRemaining % 60);
  return (<p>
    <b>Time in between sets:</b> {minUntilNextSet} min {secUntilNextSet} sec
  </p>);
};

TimeBetweenSets.propTypes = {
  secondsRemaining: React.PropTypes.number.isRequired,
};

Exercise.propTypes = {
  params: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
  }).isRequired,
  exercise: React.PropTypes.shape({
    get: React.PropTypes.func,
    sets: React.PropTypes.number,
    currSets: React.PropTypes.number,
    reps: React.PropTypes.number,
    timeUntilNextSet: React.PropTypes.number,
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
