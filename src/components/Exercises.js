import React from 'react';
import NavLink from './NavLink';

const Exercises = (props, { children }) =>
  <div>
    <ul>
      {props.routines[0].exercises.map((item) => {
        const path = `/exercises/${item.name}`;
        return <li key={item.name}><NavLink to={path}>{item.name}</NavLink></li>;
      })}
    </ul>
    {children}
  </div>;

Exercises.propTypes = {
  routines: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    exercises: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      sets: React.PropTypes.number.isRequired,
      reps: React.PropTypes.number.isRequired,
      minInBetweenSets: React.PropTypes.number.isRequired,
      timeLengthOfExercise: React.PropTypes.number,
      variations: React.PropTypes.arrayOf(React.PropTypes.string),
      selectedVariation: React.PropTypes.number,
    })),
  })).isRequired,
};

Exercises.defaultProps = {
  children: [],
  routines: [],
};

export default Exercises;
