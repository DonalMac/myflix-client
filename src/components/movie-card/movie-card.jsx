import React from "react";
import PropTypes from "prop-types";
import { Button, Card, CardGroup, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss"

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (

      < CardGroup id="card" >
        <Card id="movie-card" >
          <Card.Body  >
            <Row id="card-body">
              <Col md={4}><Link to={`/movies/${movie._id}`}>
                <Card.Img variant="top" src="https://via.placeholder.com/75.png" id="movieView-image" />
              </Link></Col>


              <Col md={8}><Card.Title id="card-title">{movie.Title}</Card.Title></Col></Row></Card.Body >
          <Card.Body >
            <Card.Text id="card-text">{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button id="card-button" variant="primary">Open</Button>
            </Link>
          </Card.Body>
        </Card>
      </CardGroup >

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
