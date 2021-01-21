import React from 'react';
import { Row, Col } from 'react-bootstrap';

const MyProfileData = (props) => {
  return (
    <Row className="data" noGutters>
      <Col md={1}>{props.icon}</Col>
      <Col>
        <p className="bold">{props.data}</p>
        <p className="grey">{props.label}</p>
      </Col>
    </Row>
  );
};

export default MyProfileData;
