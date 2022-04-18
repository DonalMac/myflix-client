import React from "react";

import { Navbar, Container, Nav, Button, Offcanvas, NavDropdown, Form, FormControl } from 'react-bootstrap';

//import './navbar-view.scss';


export function FooterView({ user }) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  return (
    <Navbar id="navbar" fixed="bottom">
      <Container id="navbar-container">
        <Navbar.Brand id="navbar-brand" href="#">my<span>Flix</span></Navbar.Brand>
        <Nav id="nav" className="me-auto">
          <Nav.Link id="nav-link" href="#home">Account</Nav.Link>
          <Nav.Link id="nav-link" href="#features">Watchlist</Nav.Link>
          <Nav.Link id="nav-link" href="#pricing">Register</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}