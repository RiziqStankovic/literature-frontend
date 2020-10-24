import React, { useState, useContext } from 'react';
import { useMutation } from 'react-query';
import { Form, Button, Alert } from 'react-bootstrap';
import { BiBookAdd } from 'react-icons/bi';
import { CgAttachment } from 'react-icons/cg';

import { Context } from '../context/Context';
import AlertModal from './AlertModal';
import { ActionLoading } from './Loading';

import { API } from '../config/config';

const AddLiteratureForm = ({ type }) => {
  const [state] = useContext(Context);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    checked: false,
    publication: '',
    pages: '',
    isbn: '',
    file: '',
  });

  const [fileName, setFileName] = useState('');

  const { title, author, checked, publication, pages, isbn, file } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [addLiterature] = useMutation(async () => {
    setShowErrorAlert(false);

    const date = publication.split('-');
    const month = months[date[1] - 1];

    const formData = new FormData();

    formData.append('title', title);
    formData.append('author', author);
    formData.append('month', month);
    formData.append('year', date[0]);
    formData.append('pages', pages);
    formData.append('isbn', isbn);
    formData.append('file', file);
    formData.append(
      'status',
      state.user.role === 'admin' ? 'Approved' : 'Pending'
    );

    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await API.post('/literature', formData, config);
      setLoading(false);
      setShowSuccessAlert(true);
      setFormData({
        title: '',
        author: '',
        publication: '',
        pages: '',
        isbn: '',
        file: '',
      });
      setShowErrorAlert(false);
    } catch (error) {
      console.log(error.response.data.message);
      console.log(error);
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
    }
    setLoading(false);
  });

  const handleSubmit = (e) => {
    setLoading(false);
    e.preventDefault();
    addLiterature();
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Control
            type="text"
            value={title}
            name="title"
            required
            placeholder="Title"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            value={author}
            name="author"
            required
            placeholder="Author"
            onChange={(e) => handleChange(e)}
            disabled={checked}
          />
        </Form.Group>
        {type === 'user' && (
          <Form.Group>
            <Form.Check
              type="checkbox"
              value={state.user.fullName}
              label="Me as Author"
              onChange={(e) => {
                if (e.target.checked)
                  setFormData({
                    ...formData,
                    author: e.target.value,
                    checked: true,
                  });
                else setFormData({ ...formData, author: '', checked: false });
              }}
            />
          </Form.Group>
        )}
        <Form.Group>
          <Form.Control
            type="text"
            value={publication}
            name="publication"
            placeholder="Publication Date"
            onFocus={(e) => (e.target.type = 'month')}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            value={pages}
            name="pages"
            placeholder="Pages"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            value={isbn}
            name="isbn"
            placeholder="ISBN"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <div
            className="form-control"
            onClick={() => document.getElementsByName('file')[0].click()}
            style={{ width: 'max-content', cursor: 'pointer' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {file ? file.name : 'Attach File'}
              <CgAttachment size="20px" className="ml-1" />
            </div>
          </div>
          <Form.File
            name="file"
            accept=".pdf"
            onChange={(e) => {
              setFormData({
                ...formData,
                file: !e.target.files[0] ? file : e.target.files[0],
              });
            }}
            style={{ display: 'none' }}
          />
        </Form.Group>

        <Alert variant="danger" show={showErrorAlert}>
          {errorMessage}
        </Alert>

        <Button variant="primary" type="submit" className="float-right">
          {loading ? (
            <ActionLoading />
          ) : (
            <>
              Add Literature <BiBookAdd size="20px" />
            </>
          )}
        </Button>
      </Form>

      <AlertModal
        show={showSuccessAlert}
        onHide={() => setShowSuccessAlert(false)}
        label={
          type === 'admin'
            ? 'Book added successfully'
            : 'Thank you for adding your own book to our website, please wait 1 x 24 hours to verify whether this book is your writing'
        }
      />
    </div>
  );
};

export default AddLiteratureForm;
