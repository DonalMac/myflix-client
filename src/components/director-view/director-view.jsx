import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./director-view.scss"

export class DirectorView extends React.Component {
  render() {
    const { director, movies, onBackClick } = this.props;

    return (

      <Card.Body id="movie-cardDirReg">
        <Container className="director-view">
          <Row >
            <Card.Title id="card-titleDirReg" >{director.Name}  </Card.Title>
          </Row>
          <Row >

            <Card.Body>{director.Bio}  </Card.Body>

          </Row>
          <Row >
            <Card.Subtitle > Birth:  {director.Birth}  </Card.Subtitle>
          </Row>

          {director.Death && (
            <Row >
              <Card.Text > Death:  {director.Death}  </Card.Text>
            </Row>
          )}
        </Container>
        <Row className="d-flex row mt-3 ml-1 stretch" >

          {movies.map(movie => {
            if (movie.Director.Name === director.Name) {
              return (
                <Col md={12} lg={4}>
                  <div key={movie._id}>
                    <Card id="movieMini-card">
                      <Card.Img variant="top" src={movie.ImagePath} />
                      <Link to={`/movies/${movie._id}`}>
                        <Card.Title id="card-titleMini">{movie.Title}</Card.Title>
                      </Link>
                      <Card.Body>
                        <Card.Text id="card-textMini">{movie.Description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              );
            }
          })}

        </Row>
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
      </Card.Body >

    );
  }
}

DirectorView.proptypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birth: PropTypes.number,
    Death: PropTypes.number,
  }).isRequired,
};