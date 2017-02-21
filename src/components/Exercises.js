import React from 'react';
import NavLink from './NavLink';

const Exercises = (props) => {
  const data = props.data;
  return (<div>
    <div className="routineHeader">
      <h2 className="routineTitle">Current Routine: Full Body Workout</h2>
      <div className="exerciseBreadCrumb">
        {data.getIn(['routines', 'fullBodyWorkout', 'exercises']).keySeq().map((name, index) => {
          const path = `/exercises/${name}`;
          return (
            <div key={name} className="exerciseBreadCrumbItemContainer">
              <div className="exerciseBreadCrumbItem">
                <NavLink to={path}>{name}</NavLink>
              </div>
              {(index + 1) < data.getIn(['routines', 'fullBodyWorkout', 'exercises']).size &&
                <div>&gt;&gt;</div>
              }
            </div>
          );
        })}
      </div>
    </div>
    {props.children && React.cloneElement(props.children, {
      exercise: data.getIn(['routines', 'fullBodyWorkout', 'exercises', props.params.name]),
      handleFinishedSetBtnClk: props.handleFinishedSetBtnClk,
    })}
  </div>);
};

Exercises.propTypes = {
  children: React.PropTypes.element,
  params: React.PropTypes.shape({
    name: React.PropTypes.string,
  }),
  data: React.PropTypes.shape({
    getIn: React.PropTypes.function,
  }),
  handleFinishedSetBtnClk: React.PropTypes.func,
};

Exercises.defaultProps = {
  children: [],
  data: {},
  params: {
    name: '',
  },
  handleFinishedSetBtnClk() {},
};

export default Exercises;
