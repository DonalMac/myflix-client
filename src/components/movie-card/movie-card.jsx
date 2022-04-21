import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss"

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Container >
  < CardGroup id="card" >
      <Card id="movie-card" >
        <Link to={`/movies/${movie._id}`}>
          <Card.Img
            variant="top"
            src={movie.ImagePath}
            className="img-responsive"
          />
        </Link>

        <Card.Body >
          <Card.Title id="card-title">
            {movie.Title}
          </Card.Title>

          <Card.Text id="card-text">{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>

              <Button id="card-button" variant="primary">
                Open
              </Button>

          </Link>
        </Card.Body>
      </Card>
  </CardGroup>
  </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
