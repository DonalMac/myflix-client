// myflix-client/src/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';
import { Col, Row, Container, Button } from "react-bootstrap";
import "./main-view.scss"

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from "../navbar-view/navbar-view";
import { FooterView } from "../footer-view/footer-view";


class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      visible: true,
      whichComponentToShow: "LoginView"
    };
  }

  componentDidMount() {
    axios.get('https://mac-myflix.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // componentWillUnmount(){}

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  /* onRegistration(register) {
     this.setState({
         register
     });
 }*/

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!user && this.state.whichComponentToShow === "LoginView") {
      return (
        <Container fluid className="mainContainer">
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          <Button variant="light" className="LogRegPageButton"
            onClick={() => {
              this.setState({ whichComponentToShow: "Registration" });
            }}
          >To Registration
          </Button>

        </Container>

      );
    }
    if (!user && this.state.whichComponentToShow === "Registration") {
      return (
        <Container fluid className="mainContainer">
          <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />

          <Button variant="light" className="LogRegPageButton"
            onClick={() => {
              this.setState({ whichComponentToShow: "LoginView" })
            }}
          >Login
          </Button>
        </Container>

      );
    }





    //if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    //if (!register) return <RegistrationView onRegistration={(register) => this.onRegistration(register)} />;

    if (user === 'true' && movies.length === 0) return <div className="main-view" />;
    return (
      <Container fluid className="mainContainer">
        <Row>
          <NavbarView user={user} />

        </Row>
        <Row className="main-view justify-content-center">
          {selectedMovie
            ? (
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <MovieView movie={selectedMovie}
                  onBackClick={newSelectedMovie => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            )
            : (
              movies.map(movie => (
                <Col col={12} md={12} lg={4} xl={3}>
                  <MovieCard key={movie._id}
                    movie={movie}
                    onMovieClick={newSelectedMovie => {
                      this.setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              ))
            )
          }
        </Row>


      </Container>
    );
  }
}

export default MainView;