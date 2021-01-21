import React from 'react';
import { Container } from 'react-bootstrap';
import AddLiteratureForm from '../../components/AddLiteratureForm';

const AddLiterature = () => {
  return (
    <div className="admin">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body {
              background-color: #f9f9f9;
            }`,
        }}
      />
      <Container>
        <h2>Add Literatures</h2>
        <AddLiteratureForm type="admin" />
      </Container>
    </div>
  );
};

export default AddLiterature;
