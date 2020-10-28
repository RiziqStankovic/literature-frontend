import React, { useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { Row, Col, Button } from 'react-bootstrap';
import {
  BsBookmarkPlus,
  BsBookmarkDash,
  BsCloudDownload,
  BsChevronRight,
} from 'react-icons/bs';

import { Context } from '../context/Context';
import { API } from '../config/config';

// component
import { PageLoading } from '../components/Loading';
import DetailItem from '../components/DetailItem';
import AlertModal from '../components/AlertModal';

const Detail = () => {
  const { id } = useParams();
  const history = useHistory();

  const [showAddAlert, setShowAddAlert] = useState(false);
  const [showRmvAlert, setShowRmvAddAlert] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [state, dispatch] = useContext(Context);
  const userId = state.user.id;

  const { isLoading, error, data: literature } = useQuery(
    'getLiterature',
    async () => {
      const { data } = await API.get(`/literature/${id}`);
      const literature = data.data;
      if (literature.bookmarks.some((bookmark) => bookmark.userId === userId))
        setBookmarked(true);
      return literature;
    }
  );

  const [bookmark] = useMutation((id) => API.post(`/bookmark/${id}`));

  const [unbookmark] = useMutation((id) => API.delete(`/unbookmark/${id}`));

  const addBookmark = () => {
    setShowAddAlert(true);
    bookmark(id);
    setBookmarked(true);
  };

  const removeBookmark = () => {
    setShowRmvAddAlert(true);
    unbookmark(id);
    setBookmarked(false);
  };

  return isLoading ? (
    <PageLoading />
  ) : error ? (
    <h1>Error!</h1>
  ) : (
    <>
      <Row>
        <Col md={5}>
          <img
            src="http://localhost:5000/covers/cover.jpg"
            alt="cover"
            style={cover}
          />
        </Col>
        <Col>
          <p
            className="tnr bold m-0"
            style={{ fontSize: 48, lineHeight: '1em' }}
          >
            {literature.title}
          </p>
          <p className="grey mt-3 mb-4" style={{ fontSize: 24 }}>
            {literature.author}
          </p>
          <div className="mb-5">
            <DetailItem
              name="Publication date"
              data={`${literature.month} ${literature.year}`}
            />
            <DetailItem name="Pages" data={literature.pages} />
            <DetailItem
              name="ISBN"
              data={literature.isbn}
              style={{ color: '#af2e1c' }}
            />
          </div>
          <Button
            href={`http://localhost:5000/files/${literature.file}`}
            className="mr-3"
          >
            Download <BsCloudDownload />
          </Button>
          <Button onClick={() => history.push(`/read/${literature.id}`)}>
            Read <BsChevronRight />
          </Button>
        </Col>
        <Col md={1}>
          {bookmarked ? (
            <Button
              variant="primary"
              className="mr-3"
              onClick={() => {
                removeBookmark();
              }}
            >
              <BsBookmarkDash size="20px" />
            </Button>
          ) : (
            <Button
              variant="primary"
              className="mr-3"
              onClick={() => {
                addBookmark();
              }}
            >
              <BsBookmarkPlus size="20px" />
            </Button>
          )}
        </Col>
      </Row>
      <AlertModal
        show={showAddAlert}
        onHide={() => setShowAddAlert(false)}
        label="Your book has been added successfully"
      />
      <AlertModal
        show={showRmvAlert}
        onHide={() => setShowRmvAddAlert(false)}
        label="Your book has been removed successfully"
      />
    </>
  );
};

const cover = {
  width: '400px',
  height: '540px',
  borderRadius: '10px',
  objectFit: 'cover',
};

export default Detail;
