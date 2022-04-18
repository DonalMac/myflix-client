import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Col, Row } from 'react-bootstrap';

import './login-view.scss';

import { NavbarView } from "../navbar-view/navbar-view";



export function LoginView(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(name) */
    props.onLoggedIn(name);
  };

  return (

    <><NavbarView /><Row>
      <Col id="cardBody">
        <CardGroup>
          <Card>
            <Card.Body >
              <Card.Title>Please Login</Card.Title>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control type="text" onChange={e => setName(e.target.value)} placeholder="Enter your Name" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
                </Form.Group>
                <Button variant="primary" className="LogRegButton" type="submit" onClick={handleSubmit}>
                  Login
                </Button>

              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row></>


  );
}


LoginView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired
};