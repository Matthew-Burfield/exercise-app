import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import { previousExercise, nextExercise } from '../actions/actions';
import NavLink from './NavLink';

export const NavBarTop = () =>
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <NavLink to="/">Exercise Tracker</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/">Profile</NavItem>
        <NavItem eventKey={2} href="/">Logout</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>;

export const NavBarBottom = props =>
  <Navbar fixedBottom>
    <Nav style={{ float: 'left', margin: 0 }}>
      <NavItem eventKey={1} onClick={() => props.dispatch(previousExercise(0, 0))}>Prev</NavItem>
    </Nav>
    <Nav pullRight style={{ float: 'right', marginRight: -15, margin: 0 }}>
      <NavItem eventKey={1} onClick={() => props.dispatch(nextExercise(0, 0))}>Next</NavItem>
    </Nav>
  </Navbar>;

NavBarBottom.propTypes = {
  dispatch: React.PropTypes.func,
};
