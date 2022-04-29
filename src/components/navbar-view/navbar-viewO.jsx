import { Link } from "react-router-dom";
import { Navbar, Col, Nav, NavDropdown } from 'react-bootstrap';

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
    <Navbar id="navbar" fixed="top" position="sticky" expand="lg">
      <Col>
        <Navbar.Brand id="navbar-brand" as={Link} to={"/"}>my<span id="navSpan">Flix</span></Navbar.Brand></Col>

      <Col id="navLink">

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {isAuth() && (
          <Navbar.Collapse >
            <Nav className="me-auto" >
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

            <Nav.Item className="nav-item-large justify-content-end d-none d-md-flex">
              <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </Nav.Item>
          </Navbar.Collapse>


        )}



      </Col>
    </Navbar>
  );
}