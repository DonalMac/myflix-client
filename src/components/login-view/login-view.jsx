import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Container, Button, Card, CardGroup, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";

import './login-view.scss';

export function LoginView(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // Declare hook for each input
  const [nameErr, setNameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!name) {
      setNameErr('A Username or Name is Required');
      isReq = false;
    } else if (name.length < 2) {
      setNameErr('Username or Name must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be 6 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://mac-myflix.herokuapp.com/login', {
        Name: name,
        Password: password

      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
          console.log('Bazinga! Logged in');

        })
        .catch(e => {
          console.log('Unable to find user')
        });
    }
  };

  return (

    <Col className="login-view" sm={10} md={12} lg={6} xl={5}>

      <CardGroup id="cardBody">
        <Card>
          <Card.Body>
            <Card.Header id="cardTitle" as="h4">Please Login to your myFlix account.</Card.Header>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your Name" />
                {/* code added here to display validation error */}
                {nameErr && <p>{nameErr}</p>}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
                {/* code added here to display validation error */}
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Group>
              <Button variant="primary" className="LogRegButton" type="submit" onClick={handleSubmit}>
                Login
              </Button>
              <Link to={"/register"}>
                <Button variant="dark" className="LogRegPageButton">To Registration
                </Button>
              </Link>

            </Form>
          </Card.Body>
        </Card>
      </CardGroup>

    </Col>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};