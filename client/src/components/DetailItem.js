import React from 'react';

const DetailItem = ({ name, data, style }) => {
  return (
    <div className="detail mb-4">
      <p
        className="mb-2"
        style={{ fontSize: '1.3rem', fontWeight: '600', ...style }}
      >
        {name}
      </p>
      <p className="grey" style={{ fontSize: '1rem' }}>
        {data}
      </p>
    </div>
  );
};

export default DetailItem;
