import React, { useState, useContext } from 'react';
import { useMutation } from 'react-query';
import { Form, Button, Alert } from 'react-bootstrap';
import { BiBookAdd } from 'react-icons/bi';
import { CgAttachment, CgOverflow } from 'react-icons/cg';
import BeatLoader from 'react-spinners/BeatLoader';

import { Context } from '../context/Context';
import Loading from './Loading';
import AlertModal from './AlertModal';

import { API } from '../config/config';

import pdfFile from '../assets/68-194-1-PB.pdf';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const AddLiteratureForm = ({ type }) => {
  const [state] = useContext(Context);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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
      setFileName('');
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
          <Form.File
            id="custom-file-translate-html"
            name="file"
            accept=".pdf"
            label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {file ? file.name : 'Attach File'}
                <CgAttachment size="20px" className="ml-1" />
              </div>
            }
            onChange={(e) => {
              setFormData({
                ...formData,
                file: !e.target.files[0] ? file : e.target.files[0],
              });
            }}
            custom
          />
        </Form.Group>

        <Alert variant="danger" show={showErrorAlert}>
          {errorMessage}
        </Alert>

        <Button variant="primary" type="submit" className="float-right">
          {loading ? (
            <BeatLoader
              css={override}
              size={5}
              color={'#ffffff'}
              loading={loading}
            />
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
        label="Thank you for adding literature to our website, please wait 1 x 24 hours to verify"
      />
    </div>
  );
};

export default AddLiteratureForm;
