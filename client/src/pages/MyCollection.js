import React, { useContext } from 'react';
import { useQuery } from 'react-query';

import { Context } from '../context/Context';
import { API } from '../config/config';

import Loading from '../components/Loading';
import LiteraturesList from '../components/LiteraturesList';

const MyCollection = () => {
  const [state] = useContext(Context);
  const { id } = state.user;

  const { isLoading, data } = useQuery(
    'getUserBookmarks',
    async () => await API.get(`/bookmarks/${id}`)
  );

  let literatures;
  if (!isLoading) {
    literatures = data.data.data.map((data) => data.literature);
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <h2>My Collection</h2>

      <LiteraturesList literatures={literatures} />
    </div>
  );
};

export default MyCollection;
