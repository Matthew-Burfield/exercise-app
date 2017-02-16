import React from 'react';
import NavLink from './NavLink';

const Exercises = ({ children }) =>
  <div>
    <ul>
      <li><NavLink to="/exercises/squat">Squat</NavLink></li>
      <li><NavLink to="/exercises/Pushup">Pushup</NavLink></li>
      <li><NavLink to="/exercises/Deadlift">Deadlift</NavLink></li>
      <li><NavLink to="/exercises/Handstand">Handstand</NavLink></li>
      <li><NavLink to="/exercises/Dip">Dip</NavLink></li>
    </ul>
    {children}
  </div>;

Exercises.propTypes = {
  children: React.PropTypes.node,
};

Exercises.defaultProps = {
  children: [],
};

export default Exercises;
