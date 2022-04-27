// myflix-client/src/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Col, Row, Container, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// #0
import { setMovies, setUser } from '../../actions/actions';

// we haven't written this one yet
import MoviesList from '../movies-list/movies-list';

import { LoginView } from "../login-view/login-view";
//import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { RegistrationView } from "../registration-view/registration-view";
import { Navbar } from "../navbar-view/navbar-view";

import "./main-view.scss"

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      //movies: [],
      user: null,
    };

  }

  // When token is present (user is logged in), get list of movies
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // Gets movies from API
  getMovies(token) {
    axios.get('https://mac-myflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property state to the *logged user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Name,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Name);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  // Set user
  setUser(user) {
    this.setState({ user });
    localStorage.setItem('user', JSON.stringify(user));
  }

  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <Container fluid className="mainContainer">
          <Row>
            <Navbar user={user} />
          </Row>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col lg={10} md={12}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );

                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />;

              }}

            />

            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col lg={10} md={12}>
                    <RegistrationView />
                  </Col>
                );
              }}
            />

            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <Col xs={12} sm={12} md={10} lg={8} xl={10}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <Col xs={12} sm={12} md={10} lg={8} xl={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre} movies={movies}

                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <Col xs={12} sm={12} md={10} lg={8} xl={8}>
                    <DirectorView
                      director={
                        movies.find((m) => m.Director.Name === match.params.name)
                          .Director} movies={movies}

                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path={`/users/${user}`}
              render={({ history }) => {
                if (!user) return <Redirect to="/" />
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                    <ProfileView
                      //history={history }
                      movies={movies}
                      user={user}
                      setUser={(user) => this.setUser(user)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container >
      </Router >

    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);