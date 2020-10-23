import React, { useState } from 'react';
import { Table, DropdownButton, Dropdown } from 'react-bootstrap';
import { BsChevronLeft } from 'react-icons/bs';
import { useQuery } from 'react-query';

import { API } from '../../config/config';

import AddedLiteratures from '../../components/AddedLiteratures';
import Loading from '../../components/Loading';

const VerifyBook = () => {
  const [selected, setSelected] = useState('');
  const { isLoading, data, refetch } = useQuery('getAdminLiteratures', () =>
    API.get('/literatures?year=0')
  );
  return isLoading ? (
    <Loading />
  ) : (
    <div className="admin">
      <div class="admin-wrapper">
        <DropdownButton
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BsChevronLeft size="18px" className="mr-1" />
              Status
            </div>
          }
          id="dropdown"
          drop="left"
          variant="light"
          onSelect={(e) => {
            setSelected(e);
            console.log(selected);
          }}
        >
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="Approved">Approved</Dropdown.Item>
          <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
          <Dropdown.Item eventKey="Rejected">Cancel</Dropdown.Item>
        </DropdownButton>

        <h2 className="bold">Verification</h2>
        <Table hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>File</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.data
              .filter((literature) => {
                if (selected !== 'All')
                  return literature.status.includes(selected);
                else return literature;
              })
              .map((literature, index) => (
                <AddedLiteratures
                  no={index + 1}
                  literatureId={literature.id}
                  title={literature.title}
                  author={literature.author}
                  isbn={literature.isbn}
                  file={literature.file}
                  status={literature.status}
                  refetch={refetch}
                />
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default VerifyBook;
