import React from 'react';
import { Container } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';
import AddLiteratureForm from '../../components/AddLiteratureForm';

const AddLiterature = () => {
  let match = useRouteMatch({
    path: '/admin',
  });

  match && require('./admin.css');

  return (
    <div className="admin">
      <Container>
        <h2>Add Literatures</h2>
        <AddLiteratureForm type="admin" />
      </Container>
    </div>
  );
};

export default AddLiterature;
