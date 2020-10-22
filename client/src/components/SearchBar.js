import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = () => {
  const history = useHistory();
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?q=${search}`);
  };
  return (
    <div>
      <Form inline onSubmit={(e) => handleSubmit(e)}>
        <Form.Control
          type="text"
          value={search}
          name="search"
          placeholder="Search for literature"
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 500 }}
        />
        <Button
          variant="primary"
          className="ml-2"
          type="submit"
          style={{
            padding: 5,
          }}
        >
          <AiOutlineSearch size="26px" color="white" />
        </Button>
      </Form>
    </div>
  );
};

export default SearchBar;
