import React from 'react';
import './admin.css';
import { Container } from 'react-bootstrap';
import AddLiteratureForm from '../../components/AddLiteratureForm';

const AddLiterature = () => {
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
