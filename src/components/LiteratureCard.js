import React from 'react';
import { useHistory } from 'react-router-dom';

import { coverURL } from '../config/config';

const Literature = ({ id, title, author, year, cover }) => {
  const history = useHistory();
  return (
    <div
      className="literature-card"
      onClick={() => history.push(`/detail/${id}`)}
    >
      <img
        src={`${coverURL}/${cover}`}
        alt={title}
        className="mb-3"
        style={{
          width: 200,
          height: 270,
          objectFit: 'cover',
          borderRadius: 10,
        }}
      />

      <p
        className="title tnr mb-2"
        style={{
          fontWeight: '700',
          fontSize: 20,
          lineHeight: '23px',
        }}
      >
        {title}
      </p>
      <div className="author grey">
        <p>{author}</p>
        <p>{year}</p>
      </div>
    </div>
  );
};

export default Literature;
