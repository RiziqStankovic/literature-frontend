import React from 'react';

const DetailItem = ({ name, data, style }) => {
  const classs = `bold dh ${style}`;
  return (
    <div className="detail">
      <p className={classs}>{name}</p>
      <p className="dd">{data}</p>
    </div>
  );
};

export default DetailItem;
