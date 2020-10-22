import React from 'react';
import { Button } from 'react-bootstrap';

const PrimaryButton = ({ children }) => {
  return <button className="primary">{children}</button>;
};

export default PrimaryButton;
