import Meta from '../components/Meta';
import Discovery from '../containers/Discovery';
import React from 'react';
import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <div className="px-2">
      <Meta title="Home" />
      <SearchBar />
      <Discovery />
    </div>
  );
}
