import React from 'react';
import NavLink from './NavLink';

const Dashboard = () =>
  <div className="dashboard">
    <div>
      <h1>Choose a routine</h1>
      <h2>and start working out!</h2>
    </div>
    <div className="routine-outer-container">
      <div className="routine-inner-container">
        <NavLink className="routine" to="/exercises">Start working out</NavLink>
        {/* <button className="routine">Legs</button> */}
      </div>
      {/* <div className="routine-inner-container">
        <button className="routine">Core and back</button>
        <button className="routine">Chest</button>
      </div> */}
    </div>
  </div>;

export default Dashboard;
