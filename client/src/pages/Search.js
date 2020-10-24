import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  Row,
  Col,
  Form,
  Alert,
  Button,
  Accordion,
  Card,
} from 'react-bootstrap';
import { BiChevronDownCircle } from 'react-icons/bi';

import SearchBar from '../components/SearchBar';
import LiteraturesList from '../components/LiteraturesList';
import { PageLoading } from '../components/Loading';

import { API } from '../config/config';

const Search = ({ location }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [sort, setSort] = useState('');
  const value = location.search.split('?q=')[1];

  const { isLoading, error, data: literatures, refetch } = useQuery(
    'searchLiterature',
    async () => {
      const { data } = await API.get(
        `/literature?title=${value}&from=${from}&to=${to}&sort=${sort}`
      );
      const literatures = data.data;
      return literatures;
    }
  );

  useEffect(() => {
    refetch();
  }, [value]);

  return isLoading || !literatures ? (
    <PageLoading />
  ) : error ? (
    <h1>Error</h1>
  ) : (
    <div>
      <SearchBar />
      <Row className="mt-5">
        <Col md={2}>
          <a
            className={
              from === '' && to === '' ? 'nav-link active' : 'nav-link'
            }
            onClick={async (e) => {
              e.preventDefault();
              await setFrom('');
              await setTo('');
              refetch();
            }}
          >
            Anytime
          </a>
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Filter by Year <BiChevronDownCircle size="20px" />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      refetch();
                    }}
                  >
                    <Form.Row>
                      <Col>
                        <Form.Control
                          size="sm"
                          type="number"
                          name="from"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                        />
                      </Col>
                      <Col md={2}>
                        <small>to</small>
                      </Col>
                      <Col>
                        <Form.Control
                          size="sm"
                          type="number"
                          name="to"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                        />
                      </Col>
                    </Form.Row>
                    <Form.Row className="mt-2">
                      <Col>
                        <Button type="submit" block size="sm">
                          Submit
                        </Button>
                      </Col>
                    </Form.Row>
                  </Form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Sort by
                <BiChevronDownCircle size="20px" />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Form>
                    <Form.Check
                      type="radio"
                      label="Title"
                      name="sort"
                      value="title"
                      onChange={async () => {
                        await setSort('title');
                        refetch();
                      }}
                    />
                    <Form.Check
                      type="radio"
                      label="Year"
                      name="sort"
                      value="year"
                      onChange={async () => {
                        await setSort('year');
                        refetch();
                      }}
                    />
                  </Form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
        <Col md={10}>
          {literatures.length === 0 ? (
            <Alert variant="warning">Not Found</Alert>
          ) : (
            <LiteraturesList literatures={literatures} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Search;
