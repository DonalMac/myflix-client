import React from 'react';
import PropTypes from 'prop-types';
import { CardGroup, Container, Button, Card } from "react-bootstrap";

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Container id="card">
        <CardGroup id="card">
          <Card id="movie-card">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
              <Card.Title id="card-title">{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Button id="card-button" onClick={() => onMovieClick(movie)} variant="link">Open</Button>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  onMovieClick: PropTypes.func.isRequired
};