import React from 'react';
import NavLink from './NavLink';

const Exercises = props =>
  <div>
    <h2>Current Routine: {props.routines[0].name}</h2>
    <div className="exerciseBreadCrumb">
      {props.routines[0].exercises.map((item, index) => {
        const path = `/exercises/${item.name}`;
        return (
          <div key={item.name} className="exerciseBreadCrumbItemContainer">
            <div className="exerciseBreadCrumbItem">
              <NavLink to={path}>{item.name}</NavLink>
            </div>
            {(index + 1) < props.routines[0].exercises.length &&
              <div>&gt;&gt;</div>
            }
          </div>
        );
      })}
    </div>
    {props.children && React.cloneElement(props.children, {
      exercise: [...props.routines[0].exercises.filter(item => item.name === props.params.name)][0],
    })}
  </div>;

Exercises.propTypes = {
  children: React.PropTypes.element,
  params: React.PropTypes.shape({
    name: React.PropTypes.string,
  }),
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
  params: {
    name: '',
  },
};

export default Exercises;
