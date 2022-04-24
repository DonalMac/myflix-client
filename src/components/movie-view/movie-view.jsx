import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import "./movie-view.scss"

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
    };

    this.addFav = this.addFav.bind(this);
    this.removeFav = this.removeFav.bind(this);
  }

  getUser(token) {
    let user = localStorage.getItem("user");
    axios
      .get(`https://mac-myflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //assign the result to the state
        this.setState({
          name: response.data.Name,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch((e) => console.log("This is the problem"));
  }
  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  //add favorite
  addFav() {
    {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const id = this.props.movie._id;
      //prevent adding duplicate movies
      let userFavorites = this.state.favoriteMovies;
      let isFav = userFavorites.includes(id);
      if (!isFav) {
        axios
          .post(
            `https://mac-myflix.herokuapp.com/users/${user}/${id}`,
            {},

            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((response) => {
            console.log(response);
            alert(
              `${this.props.movie.Title} has been added to your list of favorites`
            );
            window.open(`/movies/${id}`, "_self");
          })
          .catch((e) => console.log(e));
      } else if (isFav) {
        alert(
          `${this.props.movie.Title} is already in your list of favorite movies!`
        );
      }
    }
  }
  //remove favorite
  removeFav() {
    {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const id = this.props.movie._id;

      axios
        .delete(
          `https://mac-myflix.herokuapp.com/users/${user}/${id}`,

          { headers: { Authorization: `Bearer ${token}` } },
          {}
        )
        .then((response) => {
          console.log(response);
          alert(
            `${this.props.movie.Title} has been deleted from your list of favorites`
          );
          window.open(`/movies/${id}`, "_self");
        })
        .catch((e) => console.log(e));
    }
  }
  render() {
    const { movie, onBackClick } = this.props;
    const { FavoriteMovies, Name, Password, Email, Birthday } = this.state;
    let movieId = this.props.movie._id;
    let userFav = this.state.favoriteMovies;
    let isFav = userFav.includes(movieId);

    return (
      <Row id="movie-row">
        <Card id="movie-view">
          <Card.Body>
            <Row >
              <Col md={4}><Card.Img variant="top" id="movie-image" src="https://via.placeholder.com/75.png" /></Col>

              <Col><Card.Title id="movie-title">{movie.Title}</Card.Title>
                <Card.Text id="movie-description">{movie.Description}</Card.Text>
                <Card.Text id="movie-director" >
                  Director:  <Link to={`/directors/${movie.Director.Name}`} >
                    {movie.Director.Name}
                  </Link></Card.Text>
                <Card.Text id="movie-genre" >
                  Genre: <Link to={`/genres/${movie.Genre.Name}`}>
                    {movie.Genre.Name}
                  </Link>
                </Card.Text></Col></Row>
            <Row id="movie-row"><Col>
              <Button variant="primary" onClick={() => { onBackClick(null); }}>Back to Movies</Button></Col>
              <Col>{!isFav && (<Button variant="primary" id='FavButton' onClick={this.addFav}> Add to favorites </Button>
              )}
                {isFav && (<Button variant="primary" id='FavButton' onClick={this.removeFav}>
                  Remove from favorites
                </Button>
                )}</Col>

            </Row>
          </Card.Body>
        </Card>
      </Row >
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,

    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,

    Featured: PropTypes.bool,

    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),

    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
