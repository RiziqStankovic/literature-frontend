import React from 'react';

import logo from '../assets/logo.svg';

// component
import SearchBar from '../components/SearchBar';

const Home = () => {
  return (
    <div className="home-container">
      <img src={logo} alt="logo" className="mb-4" />
      <SearchBar />
    </div>
  );
};

export default Home;
