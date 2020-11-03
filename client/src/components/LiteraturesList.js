import React from 'react';

import LiteratureCard from './LiteratureCard';

const LiteraturesList = ({ literatures, profile }) => {
  return !literatures ? (
    <h2>error</h2>
  ) : (
    <div className="literature-list">
      {literatures
        .filter((literature) => {
          if (!profile) return literature.status === 'Approved';
          else return literature;
        })
        .map((literature, i) => (
          <div style={{ position: 'relative' }}>
            {literature.status !== 'Approved' && (
              <div class="overlay" style={overlayStyle}>
                {literature.status === 'Pending' ? (
                  <p className="text-center text-warning">
                    Waiting to be verified
                  </p>
                ) : (
                  <p className="text-center text-danger">Rejected</p>
                )}
              </div>
            )}
            <LiteratureCard
              id={literature.id}
              title={literature.title}
              author={literature.author}
              year={literature.year}
              cover={literature.file + '.jpg'}
              key={i}
            />
          </div>
        ))}
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

LiteraturesList.defaultProps = {
  profile: false,
};

export default LiteraturesList;
