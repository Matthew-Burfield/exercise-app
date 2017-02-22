import React from 'react';
import NavLink from './NavLink';
import Exercise from './Exercise';


const Exercises = (props) => {
  const data = props.data;
  const currentWorkout = data.get('currentWorkout');

  return (<div>
    <div className="routineHeader">
      <h2 className="routineTitle">Current Routine: Full Body Workout</h2>
      <div className="exerciseBreadCrumb">
        {data.getIn(['routines', 'fullBodyWorkout', 'exercises']).entrySeq().forEach((e) => {
          const name = e[1].get('name');
          const path = `/exercises/${name}`;
          return (
            <div key={name} className="exerciseBreadCrumbItemContainer">
              <div className="exerciseBreadCrumbItem">
                <NavLink to={path}>{name}</NavLink>
              </div>
              {(e[0] + 1) < data.getIn(['routines', 'fullBodyWorkout', 'exercises']).size &&
                <div>&gt;&gt;</div>
              }
            </div>
          );
        })}
      </div>
    </div>
    <Exercise
      exercise={data.getIn(['routines', 'fullBodyWorkout', 'exercises', currentWorkout])}
      handleFinishedSetBtnClk={props.handleFinishedSetBtnClk}
    />
    {/* {props.children && React.cloneElement(props.children, {

    })} */}
  </div>);
};

Exercises.propTypes = {
  // children: React.PropTypes.element,
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
