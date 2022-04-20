import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="m-1">
        <Link to={`/movies/${movie._id}`}>
          <Card.Img
            variant="top"
            src={movie.ImagePath}
            className="img-responsive"
          />
        </Link>

        <Card.Body>
          <Card.Title className="titles custom-card-title text-center">
            {movie.Title}
          </Card.Title>

          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Container className="text-center">
              <Button className="custom-btn" variant="link">
                Open
              </Button>
            </Container>
          </Link>
        </Card.Body>
      </Card>
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