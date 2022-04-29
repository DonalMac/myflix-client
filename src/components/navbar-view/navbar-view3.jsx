import { Link } from "react-router-dom";
import { Navbar, Col, Nav, NavDropdown, Container } from 'react-bootstrap';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import './navbar-view.scss';


export function Navbar({ visibilityFilter }) {
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
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse >
          <Nav className="align-items-md-center me-auto">

            <NavDropdown className="navbar-dropdown mb-3 mb-md-0" title="Account" href="/">
              <NavDropdown.Item href={`/users/${user}`}>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => { onLoggedOut() }}>Logout</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item className="justify-content-end d-flex d-md-none">
              <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

