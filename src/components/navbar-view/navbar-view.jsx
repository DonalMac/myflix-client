import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navbar, Col, Nav, NavDropdown } from 'react-bootstrap';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import './navbar-view.scss';


export function NavbarView({ visibilityFilter }) {
  let user = localStorage.getItem("user");
  let location = useLocation();

  const isVis = () => {
    if ((location.pathname.includes('directors')) || (location.pathname.includes('genres') || (location.pathname.includes('users')))) {
      return false;
    } else {
      return true;
    }
  };



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

      <Navbar.Brand id="navbar-brand" as={Link} to={"/"}>my<span id="navSpan">Flix</span></Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      {isAuth() && (
        <Navbar.Collapse >
          <Nav className="me-auto" >
            <Nav.Link id="navText" to={`/`}>Hi, {user}</Nav.Link>
            <Nav.Link id="navText"
              onClick={() => {
                onLoggedOut();
              }}
            >
              Logout
            </Nav.Link>
            <NavDropdown title="My Account" id="navText">
              <NavDropdown.Item as={Link} to={`/users/${user}`}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Privacy</NavDropdown.Item>

              <NavDropdown.Item href="#action/3.4">
                Terms and Conditions
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>
          {isVis() && (

            <Nav.Item className="nav-item-large justify-content-end d-none d-md-flex">
              <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </Nav.Item>
          )}
        </Navbar.Collapse>

      )}
    </Navbar>
  );
}