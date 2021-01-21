import React, { useState, useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import landingImage from '../assets/landing.svg';

import { Context } from '../context/Context';

// components
import Login from '../components/Login';
import Register from '../components/Register';

const Landing = () => {
  const [state] = useContext(Context);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const history = useHistory();

  return (
    <Container className="landing">
      <Row noGutters style={{ width: '100%' }}>
        <Col md={5}>
          <h1 className="tnr" style={{ fontFamily: 'Times New Roman' }}>
            <strong>
              source <i>of</i> intelligence
            </strong>
          </h1>
          <p>Sign-up and recieve unlimited access to all</p>
          <p>of your literatures - share your literatures.</p>
          <br />
          {state.isLogin ? (
            <Button
              variant="primary"
              className="mr-4 lg"
              onClick={() => history.push('/home')}
            >
              Home
            </Button>
          ) : (
            <>
              <Button
                variant="primary"
                className="mr-4 lg"
                onClick={() => setShowRegisterModal(true)}
              >
                Sign Up
              </Button>
              <Button
                variant="secondary"
                className="lg"
                onClick={() => setShowLoginModal(true)}
              >
                Sign In
              </Button>
            </>
          )}
        </Col>

        <img src={landingImage} alt="landing" className="landing-image" />

        <Login
          show={showLoginModal}
          onHide={() => setShowLoginModal(false)}
          noAcc={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
        <Register
          show={showRegisterModal}
          onHide={() => setShowRegisterModal(false)}
          haveAcc={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      </Row>
    </Container>
  );
};

export default Landing;
