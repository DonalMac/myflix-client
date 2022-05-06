import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import './registration-view.scss';




export function RegistrationView(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // Declare hook for each input
  const [nameErr, setNameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!name) {
      setNameErr('A Username or Name Required');
      isReq = false;
    } else if (name.length < 2) {
      setNameErr('Username must be at least 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('A Password is Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Please enter an email address');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Please enter a valid email address');
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send request to the server for authentication */
      axios.post('https://mac-myflix.herokuapp.com/users', {
        Name: name,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);

          alert('Registration successful, please login!');
          window.open('/', '_self');
        })
        .catch(response => {
          console.error(response);
          alert('Unable to register');
        });
    }
  };

  return (


    <Col id="cardBody">
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Title id="cardTitle">Please Register for a myFlix account</Card.Title>
            <Form>
              <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Enter your Name" />
                {nameErr && <p>{nameErr}</p>}
              </Form.Group>

              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Enter a Password"
                  minLength="8" />
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address" />
                {emailErr && <p>{emailErr}</p>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={e => setBirthday(e.target.value)}
                  required
                  placeholder="Enter your birthdate YYYY-MM-DD" />
              </Form.Group>


              <Button variant="primary" className="LogRegButton"
                type="submit"
                onClick={handleSubmit}>
                Register
              </Button>
              <Link to={"/"}>
                <Button variant="dark" className="LogRegPageButton">To Login Page
                </Button>
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </CardGroup>
    </Col>
  );

}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.instanceOf(Date).isRequired,
  }),
};