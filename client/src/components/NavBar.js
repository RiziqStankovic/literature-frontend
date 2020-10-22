import React, { useContext } from 'react';
import {
  Container,
  Navbar,
  Nav,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { Context } from '../context/Context';
import { BiExit } from 'react-icons/bi';

import logo from '../assets/logo.svg';

const NavBar = () => {
  const [state, dispatch] = useContext(Context);
  const history = useHistory();

  let match = useRouteMatch({
    path: '/admin',
    exact: false,
  });

  return (
    <nav id="nav">
      <Navbar bg="#161616" variant="dark">
        <Container>
          <Nav className="mr-auto">
            <Link to="/home">
              <img src={logo} alt="logo" />
            </Link>
          </Nav>
          {match && state.isAdmin && (
            <Nav>
              <OverlayTrigger
                trigger="click"
                key="bottom"
                placement="bottom"
                className="nav-item"
                overlay={
                  <Popover>
                    <Popover.Content>
                      <div
                        className="pop-item"
                        onClick={() =>
                          dispatch({
                            type: 'LOGOUT',
                          })
                        }
                      >
                        <BiExit size="20px" clasName="icon" color="red" />
                        <p className="ml-2">Logout</p>
                      </div>
                    </Popover.Content>
                  </Popover>
                }
              >
                <img
                  src={`http://localhost:5000/photos/${state.user.photo}`}
                  style={style}
                  className="nav-item"
                />
              </OverlayTrigger>
            </Nav>
          )}
        </Container>
      </Navbar>
    </nav>
  );
};

const style = {
  width: 50,
  height: 50,
  borderRadius: 50,
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.3)',
  objectFit: 'cover',
  cursor: 'pointer',
};

export default NavBar;
