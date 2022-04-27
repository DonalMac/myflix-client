import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import "./genre-view.scss"

export class GenreView extends React.Component {



  render() {
    const { genre, movies, onBackClick } = this.props;

    //console.log(this.props.movies);

    return (
      <Card.Body id="movie-cardDirReg">
        <Container className="genre-view">
          <Row >
            <Card.Title id="card-titleRegDir">{genre.Name}  </Card.Title>
          </Row>
          <Row >

            <Card.Body id="card-textRegDir">{genre.Description}  </Card.Body>

          </Row>

        </Container>
        <div className="d-flex row mt-3 ml-1" id="mini-cardBG">
          {movies.map((movie) => {
            if (movie.Genre.Name === genre.Name) {
              return (
                <div key={movie._id} >
                  <Card id="movieMini-card">
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Link to={`/movies/${movie._id}`}>
                      <Card.Title id="card-titleMini">{movie.Title}</Card.Title>
                    </Link>
                    <Card.Body >
                      <Card.Text id="card-textMini">{movie.Description}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            }
          })}
        </div>
        <Container className="d-flex justify-content-between">
          <Button
            className="custom-btn"
            type="submit"
            onClick={() => {
              onBackClick();
            }}
          >
            Go back
          </Button>
          <Link to={`/`}>
            <Button className="custom-btn" type="submit">
              Back to List
            </Button>
          </Link>
        </Container>
      </Card.Body>

    );
  }
}

GenreView.proptypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};