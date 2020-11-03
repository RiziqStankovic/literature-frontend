import React, { useContext } from 'react';
import { Context } from '../context/Context';
import { Row, Col, Button } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { API } from '../config/config';

import LiteraturesList from './LiteraturesList';

import { PageLoading } from '../components/Loading';

const MyLiteratures = () => {
  const [state] = useContext(Context);
  const { id } = state.user;

  const { isLoading, data } = useQuery('getUserLiteratures', () =>
    API.get(`/literatures?user=${id}&sort=status`)
  );

  return (
    <div className="my-literatures mt-5">
      <h2 className="heading">My Literatures</h2>
      {isLoading ? (
        <PageLoading />
      ) : (
        <LiteraturesList literatures={data.data.data} profile />
      )}
    </div>
  );
};

const overlayStyle = {
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  top: '-5px',
  bottom: '-5px',
  left: '-5px',
  right: '-5px',
  zIndex: '10',
  backgroundColor: 'rgba(0,0,0,0.5)',
  borderRadius: 10,
};

export default MyLiteratures;
