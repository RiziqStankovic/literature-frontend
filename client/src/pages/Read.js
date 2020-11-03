import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import PDFViewer from '../components/PDF/AllPages';
import { PageLoading } from '../components/Loading';
import { API, fileURL } from '../config/config';

const Read = () => {
  const { id } = useParams();

  const config = {
    crossdomain: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    },
  };

  const { isLoading, error, data: literature } = useQuery(
    'getLiterature',
    async () => {
      const { data } = await API.get(`/literature/${id}`, config);
      const literature = data.data;
      return literature;
    }
  );

  return isLoading ? (
    <PageLoading />
  ) : error ? (
    <h1>Error!</h1>
  ) : (
    <div>
      <PDFViewer url={`${fileURL}/${literature.file}`} />
    </div>
  );
};

export default Read;
