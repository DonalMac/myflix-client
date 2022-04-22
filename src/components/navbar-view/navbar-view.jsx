import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button, Offcanvas, NavDropdown, Form, FormControl } from 'react-bootstrap';

import './navbar-view.scss';


export function Navbar() {
  let user = localStorage.getItem("user");

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar id="navbar" fixed="top" position="sticky">
      <Navbar.Brand id="navbar-brand" as={Link} to={"/"}>my<span id="navSpan">Flix</span></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />




      {isAuth() && (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to={`/`}>Hi, {user}</Nav.Link>
            <Nav.Link
              onClick={() => {
                onLoggedOut();
              }}
            >
              Logout
            </Nav.Link>
            <NavDropdown title="My Account" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={`/users/${user}`}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Privacy</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Terms and Conditions
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}