import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import image from '../assets/nf2.svg';

const NotFound = () => {
  return (
    <Container className="landing">
      <Row noGutters style={{ width: '100%' }}>
        <Col md={5}>
          <h1 className="tnr bold" style={{ fontFamily: 'Times New Roman' }}>
            <i>Oops!</i>
          </h1>
          <p>Sorry, we can't find the page that</p>
          <p>you are looking for :(</p>
        </Col>
        <img src={image} alt="not-found" className="landing-image" />
      </Row>
    </Container>
  );
};

export default NotFound;
