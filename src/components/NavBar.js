import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import NavLink from './NavLink';

const NavBar = () =>
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

export default NavBar;
