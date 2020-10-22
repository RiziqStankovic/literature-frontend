import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const NavLink = ({ to, label, onClick = '' }) => {
  let match = useRouteMatch({
    path: to,
    exact: true,
  });

  return (
    <Nav.Link onClick={onClick}>
      <Link to={to} className={match ? 'active' : ''}>
        {label}
      </Link>
    </Nav.Link>
  );
};

export default NavLink;
