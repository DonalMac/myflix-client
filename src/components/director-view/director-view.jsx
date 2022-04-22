import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Col, Row, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  render() {
    const { director, movie, onBackClick } = this.props;

    return (
      <Card border="primary">
        <Card.Body>
          <Container className="director-view">
            <Row >
              <Card.Title >{director.Name}  </Card.Title>
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