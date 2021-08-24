import Meta from '../components/Meta';
import BestSellingRestaurants from '../containers/BestSellingRestaurants';
import React from 'react';
import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <div className="px-2">
      <Meta title="Home" />
      <SearchBar />
      <BestSellingRestaurants />
    </div>
  );
}
