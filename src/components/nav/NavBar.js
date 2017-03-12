import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export const NavBarTop = ({
  currentRoutine,
  isEditMode,
  handleCancelWorkout,
  handleSwitchEditMode }) => {

  NavBarTop.propTypes = {
    currentRoutine: React.PropTypes.number,
    isEditMode: React.PropTypes.bool.isRequired,
    handleCancelWorkout: React.PropTypes.func.isRequired,
    handleSwitchEditMode: React.PropTypes.func.isRequired,
  };

  NavBarTop.defaultProps = {
    currentRoutine: undefined,
  };

  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Exercise Tracker</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          {
            currentRoutine !== undefined &&
            <NavItem eventKey={1} onClick={handleCancelWorkout}>Cancel Workout</NavItem>
          }
          <NavItem eventKey={1} onClick={handleSwitchEditMode}>
            {isEditMode && 'Finish Editing'}
            {!isEditMode && 'Edit Routines'}
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

};

export const NavBarBottom = ({
  handlePrevExerciseNavigation,
  handleNextExerciseNavigation,
}) => {

  NavBarBottom.propTypes = {
    handlePrevExerciseNavigation: React.PropTypes.func.isRequired,
    handleNextExerciseNavigation: React.PropTypes.func.isRequired,
  };

  return (
    <Navbar fixedBottom>
      <Nav style={{ float: 'left', margin: 0 }}>
        <NavItem eventKey={1} onClick={handlePrevExerciseNavigation}>Prev</NavItem>
      </Nav>
      <Nav pullRight style={{ float: 'right', marginRight: -15, margin: 0 }}>
        <NavItem
          eventKey={1}
          onClick={handleNextExerciseNavigation}
        >Next
        </NavItem>
      </Nav>
    </Navbar>
  );

};
