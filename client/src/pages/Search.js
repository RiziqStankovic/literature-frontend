import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Row, Col, DropdownButton, Dropdown, Alert } from 'react-bootstrap';

import SearchBar from '../components/SearchBar';
import LiteraturesList from '../components/LiteraturesList';
import Loading from '../components/Loading';

import { API } from '../config/config';

const Search = ({ location }) => {
  const [selected, setSelected] = useState('');
  const value = location.search.split('?q=')[1];

  const { isLoading, error, data: literatures, refetch } = useQuery(
    'searchLiterature',
    async () => {
      const { data } = await API.get(
        `/literature?title=${value}&year=${selected}`
      );
      const literatures = data.data;
      return literatures;
    }
  );

  useEffect(() => {
    refetch();
  }, [value, selected]);

  return isLoading || !literatures ? (
    <Loading />
  ) : error ? (
    <h1>Error</h1>
  ) : (
    <div>
      <SearchBar />
      <Row noGutters className="mt-5">
        <Col md={2}>
          <DropdownButton
            id="dropdown-basic-button"
            title="Year"
            onSelect={(e) => {
              setSelected(e);
            }}
          >
            <Dropdown.Item eventKey="0">All</Dropdown.Item>
            <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
            <Dropdown.Item eventKey="2019">2019</Dropdown.Item>
            <Dropdown.Item eventKey="2018">2018</Dropdown.Item>
            <Dropdown.Item eventKey="2017">2017</Dropdown.Item>
            <Dropdown.Item eventKey="2016">2016</Dropdown.Item>
          </DropdownButton>
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
