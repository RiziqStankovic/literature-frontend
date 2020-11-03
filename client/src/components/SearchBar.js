import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
  search: yup.string().required(),
});

const SearchBar = () => {
  const history = useHistory();

  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          history.push(`/search?q=${values.search}`);
        }}
        initialValues={{
          search: '',
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form inline onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                value={values.search}
                name="search"
                placeholder="Search for literature"
                onChange={handleChange}
                style={{ width: 500 }}
                isInvalid={!!errors.search}
              />
              <Button
                className="ml-2"
                type="submit"
                style={{
                  padding: 5,
                }}
              >
                <AiOutlineSearch size="26px" color="white" />
              </Button>
              <Form.Control.Feedback type="invalid">
                Please enter a query in the search box above.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchBar;
