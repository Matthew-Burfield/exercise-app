import React from 'react';
import NavLink from './NavLink';

const Exercises = props =>
  <div>
    <h2>Current Routine: Full Body Workout</h2>
    <div className="exerciseBreadCrumb">
      {props.routine.getIn(['routines', 'fullBodyWorkout', 'exercises']).keySeq().map((name, index) => {
        const path = `/exercises/${name}`;
        return (
          <div key={name} className="exerciseBreadCrumbItemContainer">
            <div className="exerciseBreadCrumbItem">
              <NavLink to={path}>{name}</NavLink>
            </div>
            {(index + 1) < props.routine.getIn(['routines', 'fullBodyWorkout', 'exercises']).size &&
              <div>&gt;&gt;</div>
            }
          </div>
        );
      })}
    </div>
    {props.children && React.cloneElement(props.children, {
      exercise: props.routine.getIn(['routines', 'fullBodyWorkout', 'exercises', props.params.name]),
      handleFinishedSetBtnClk: props.handleFinishedSetBtnClk,
    })}
  </div>;

Exercises.propTypes = {
  children: React.PropTypes.element,
  params: React.PropTypes.shape({
    name: React.PropTypes.string,
  }),
  routine: React.PropTypes.shape({
    getIn: React.PropTypes.function,
  }),
  handleFinishedSetBtnClk: React.PropTypes.func,
};

Exercises.defaultProps = {
  children: [],
  routine: {},
  params: {
    name: '',
  },
  handleFinishedSetBtnClk() {},
};

export default Exercises;
