import React from 'react';
import PropTypes from 'prop-types';
import { CardGroup, CardImg, Container, Button, Card } from "react-bootstrap";



import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Container >
        < CardGroup id="card" >
          <Card id="movie-card">
            <Card.Img variant="top" src="https://via.placeholder.com/75.png" />
            <Card.Body>
              <Card.Title id="card-title">{movie.Title}</Card.Title>
              <Card.Text id="card-text">{movie.Description}</Card.Text>
              <Button variant="primary" id="card-button" onClick={() => onMovieClick(movie)}>Open</Button>
            </Card.Body>
          </Card>
        </CardGroup >
      </Container >
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