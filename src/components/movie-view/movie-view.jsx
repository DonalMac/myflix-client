import React from 'react';
import PropTypes from 'prop-types';


import { Card, Col, Container, Row, Button } from "react-bootstrap";
import './movie-view.scss';

export class MovieView extends React.Component {


  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card id="movie-view">
              <Card.Body>
                <Card.Img id="movie-view-image" src="https://via.placeholder.com/350x150.png" />
                <Card.Title as="h2" className="movie-title">{movie.Title}</Card.Title>
                <Card.Text as="h5" className="movie-description">
                  {movie.Description}</Card.Text>
                <Card.Text as="h5" id="movie-director" className="movie-director">
                  Director: {movie.Director.Name}</Card.Text>
                <Card.Text as="h5" id="movie-genre" className="movie-gerne">
                  Genre: {movie.Genre.Name}</Card.Text>

                <Button variant="primary" onClick={() => { onBackClick(null); }}>Back to Movies</Button>
                <Button variant="primary" id='FavButton' onClick={() => { }}>Add to Favourites</Button>

              </Card.Body>

            </Card>

          </Col>
        </Row>
      </Container>
    );
  }
}


MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    })
  }).isRequired
};