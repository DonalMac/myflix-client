import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Card, Form, FormGroup, Container, FormControl, Button } from "react-bootstrap";

import { setUser, updateUser } from '../../actions/actions';

import './profile-view.scss';

class ProfileView extends React.Component {
  constructor() {
    super();

    this.removeFav = this.removeFav.bind(this);
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    let user = localStorage.getItem("user");
    axios
      .get(`https://mac-myflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {

        const data = response.data;
        //assign the result to the state
        this.props.setUser({
          name: data.Name,
          password: data.Password,
          email: data.Email,
          birthday: data.Birthday,
          favoriteMovies: data.FavoriteMovies,
        });
        console.log("Set User data?");
        console.log(this.props.user);
      })
      .catch((e) => console.log(e));
  }


  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  editProfile = (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://mac-myflix.herokuapp.com/users/${user}`,
        {
          Name: this.state.name,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {

        const data = response.data;

        this.props.updateUser({
          name: data.Name,
          password: data.Password,
          email: data.Email,
          birthday: data.Birthday,
        });
        console.log(data.Name)
        const newname = data.Name;
        console.log(newname)
        localStorage.setItem("user", newname);
        alert("profile updated successfully!");
        window.open("/", "_self");
      });
  };

  deleteProfile() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://mac-myflix.herokuapp.com/users/${username}`,

        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert("profile deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch((e) => console.log(e));
  }

  setUsername(value) {
    this.setState({
      name: value,
    });
  }
  setPassword(value) {
    this.setState({
      password: value,
    });
  }
  setEmail(value) {
    this.setState({
      email: value,
    });
  }
  setBirthday(value) {
    this.setState({
      birthday: value,
    });
  }
  removeFav() {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const id = this.state.favoriteMovies;

    axios
      .delete(
        `https://mac-myflix.herokuapp.com/users/${user}/${id}`,

        { headers: { Authorization: `Bearer ${token}` } },
        {}
      )
      .then((response) => {
        console.log(response);
        alert("Movie deleted from favorites!");
        window.open(`/movies/${id}`, "_self");
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { movies } = this.props;
    const { favoriteMovies, name, password, email, birthday } = this.props.user || {};

    if (!name) {
      return null;
    }

    return (
      <>
        <Card.Body id="profileCard">
          <Card.Title id="card-titleDirReg">Hi {name}, View and update your details</Card.Title>
          <Form
            className="update-form"
            onSubmit={(e) => this.editProfile(
              e,
              this.name,
              this.password,
              this.email,
              this.birthday
            )}
          >
            <FormGroup>
              <Form.Label >Username</Form.Label>
              <Container id="profileContainer" className="d-flex flex-column flex-sm-row justify-content-between p-1">
                <FormControl
                  className="mb-3"
                  style={{ width: "40%" }}
                  type="text"
                  name="name"
                  placeholder={name}
                  disabled
                ></FormControl>

                <div
                  className="p-0 d-flex-column"
                  style={{ width: "50%" }}
                >
                  {" "}
                  <FormControl
                    type="text"
                    name="name"
                    placeholder="insert your new username here"
                    onChange={(e) => this.setUsername(e.target.value)}
                    required />
                  <Form.Text className="text-muted">
                    Your username should be at least 4 characters long
                  </Form.Text>
                </div>
              </Container>
            </FormGroup>

            <FormGroup>
              <Form.Label >Password</Form.Label>
              <Container id="profileContainer" className="d-flex flex-column flex-sm-row justify-content-between p-1">
                <FormControl
                  className="mb-3"
                  style={{ width: "40%" }}
                  type="text"
                  name="password"
                  placeholder={password}
                  disabled
                ></FormControl>

                <div
                  className="p-0 d-flex-column"
                  style={{ width: "50%" }}
                >
                  {" "}
                  <FormControl
                    type="text"
                    name="password"
                    placeholder="insert your new password here"
                    onChange={(e) => this.setPassword(e.target.value)}
                    required />
                  <Form.Text className="text-muted">
                    Your password should be at least 8 characters long
                  </Form.Text>
                </div>
              </Container>
            </FormGroup>

            <FormGroup>
              <Form.Label >Email</Form.Label>
              <Container id="profileContainer" className="d-flex flex-column flex-sm-row justify-content-between p-1">
                <FormControl
                  className="mb-3"
                  style={{ width: "40%" }}
                  type="email"
                  name="email"
                  placeholder={email}
                  disabled
                ></FormControl>

                <div
                  className="p-0 d-flex-column"
                  style={{ width: "50%" }}
                >
                  {" "}
                  <FormControl
                    type="email"
                    name="email"
                    placeholder="insert your new email here"
                    onChange={(e) => this.setEmail(e.target.value)}
                    required />
                </div>
              </Container>
            </FormGroup>

            <FormGroup>
              <Form.Label >Birth date</Form.Label>
              <Container id="profileContainer" className="d-flex flex-column flex-sm-row justify-content-between p-1">
                <FormControl
                  className="mb-3"
                  style={{ width: "40%" }}
                  type="text"
                  name="birthday"
                  placeholder={birthday}
                  disabled
                ></FormControl>

                <div
                  className="p-0 d-flex-column"
                  style={{ width: "50%" }}
                >
                  {" "}
                  <FormControl
                    type="date"
                    name="birthday"
                    placeholder="insert your new email here"
                    onChange={(e) => this.setBirthday(e.target.value)}
                    required />
                </div>
              </Container>
            </FormGroup>

            <Container id="profileContainer">
              <Button
                variant="primary"
                type="submit"
                onClick={this.editProfile}
              >
                Update profile info
              </Button>
            </Container>
          </Form>
        </Card.Body>



        <Card id="movie-cardDirReg" className="mt-2 mb-2">
          <Container className="p-1 text-center card-custom">
            <Button
              style={{ width: "80%" }}
              className="custom-btn-delete m-1"
              variant="danger"
              type="submit"
              onClick={this.deleteProfile}
            >
              Delete your entire profile
            </Button>{" "}
          </Container>
        </Card>


        <Card.Body id="movie-cardDirReg">
          {favoriteMovies.length === 0 && (
            <div className="titles h1 text-center">
              <h1>There are no movies in your list of favorites!</h1>
              <p className="h5">
                Head over to the{" "}
                <Link to={`/`}>
                  <Button variant="primary" type="submit">
                    List of movies
                  </Button>
                </Link>{" "}
                to add some
              </p>
            </div>
          )}
          <div className="d-flex row mt-3 ml-1 stretch" id="mini-cardBG">
            {favoriteMovies.length > 0 &&
              movies.map((movie) => {
                if (movie._id ===
                  favoriteMovies.find((fav) => fav === movie._id)) {
                  return (
                    <Card key={movie._id} id="movieMini-card">

                      <Card.Img variant="top" src={movie.ImagePath} />
                      <Link to={`/movies/${movie._id}`}>
                        <Card.Title id="card-title">{movie.Title}</Card.Title>
                      </Link>
                      <Card.Body>
                        <Card.Text id="card-textMini">{movie.Description}</Card.Text>
                      </Card.Body>

                      <Container className="d-flex justify-content-between">
                        <Button id="card-button" variant="primary"
                          onClick={this.removeFav}
                        >
                          Remove from List
                        </Button>
                      </Container>
                    </Card>
                  );
                }
              })}
          </div>
        </Card.Body>
      </>

    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    password: PropTypes.string,
    email: PropTypes.string,
    birthday: PropTypes.string,
  }),
  getUser: PropTypes.func,
  onBackClick: PropTypes.func,
  setUser: PropTypes.func,
  updateUser: PropTypes.func
};

const mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => {
      dispatch(setUser(user))
    },
    updateUser: (user) => {
      dispatch(updateUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);