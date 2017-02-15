import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const NavBar = () =>
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Exercise Tracker</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#">Profile</NavItem>
        <NavItem eventKey={2} href="">Logout</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>;

export default NavBar;
