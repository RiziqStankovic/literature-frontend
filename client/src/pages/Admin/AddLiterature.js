import React from 'react';
import AddLiteratureForm from '../../components/AddLiteratureForm';

const AddLiterature = () => {
  return (
    <div className="admin">
      <div class="admin-wrapper">
        <h2>Add Literatures</h2>
        <AddLiteratureForm type="admin" />
      </div>
    </div>
  );
};

export default AddLiterature;
