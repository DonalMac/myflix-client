import React from "react";
import { Button, Card, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export class ActorView extends React.Component {
  render() {
    const { actor, movie, onBackClick } = this.props;

    return (
      <Card>
        <Card.Body>
          <Container className="extra-info">
            <Col className="d-sm-flex justify-content-between justify-content-lg-start">
              <Card.Text className="label titles h3">Name: </Card.Text>
              <span className="card-text ml-3 titles h1">{actor[0].Name}</span>
            </Col>

            <Col className="d-sm-flex justify-content-between justify-content-lg-start">
              <Card.Text className="label titles h3">Bio: </Card.Text>
              <span className="card-text ml-3">{actor[0].Bio}</span>
            </Col>

            <Col className="d-sm-flex justify-content-between justify-content-lg-start">
              <Card.Text className="label titles h3">Born: </Card.Text>
              <span className="titles ml-3 h1">{actor[0].Birth}</span>
            </Col>

            {actor.Death && (
              <Col className="d-sm-flex justify-content-between justify-content-lg-start">
                <Card.Text className="label titles">Died: </Card.Text>
                <span className="titles ml-3 h5 ">{actor[0].Death}</span>
              </Col>
            )}

            <Col className="d-sm-flex justify-content-between justify-content-lg-start">
              <Card.Text className="label titles h3">Featured in: </Card.Text>
              <span className="titles ml-3 h1">{actor[0].Movies}</span>
            </Col>
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
          </Container>
        </Card.Body>
      </Card>
    );
  }
}