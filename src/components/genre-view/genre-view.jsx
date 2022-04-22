import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  render() {
    const { genre, movie, onBackClick } = this.props;

    return (
      <Card>
        <Card.Body>
          <Container className="genre-view">
            <Row >
              <Card.Title >{genre.Name}  </Card.Title>
            </Row>
            <Row >

              <Card.Body>{genre.Description}  </Card.Body>

            </Row>

          </Container>
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
      </Card>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};