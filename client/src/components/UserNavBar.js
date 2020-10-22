import React, { useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

import logo from '../assets/logo.svg';

import NavLink from './NavLink';

const UserNavBar = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <nav>
      <Navbar bg="#161616" variant="dark" className="p-0">
        <Container>
          <Nav className="mr-auto">
            <NavLink to="/profile" label="Profile" />
            <NavLink to="/my-collection" label="My Collection" />
            <NavLink to="/add-literature" label="Add Literature" />
            <NavLink
              to="/"
              label="Logout"
              onClick={() =>
                dispatch({
                  type: 'LOGOUT',
                })
              }
            />
          </Nav>
          <Nav>
            <Link to="/home">
              <img src={logo} alt="logo" />
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </nav>
  );
};

export default UserNavBar;
