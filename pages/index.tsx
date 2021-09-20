import Meta from '../components/Meta';
import Discovery from '../containers/Discovery';
import React from 'react';
import SearchBar from '../components/SearchBar';
import { getGreetings } from '../helpers';
import FSL from '../components/Loading/fullScreen';

export default function Home() {
  const greeting = getGreetings();
  const greetingMessage = `Good ${greeting}`;
  return (
    <div style={{ height: 1500 }} className="bg-brand-green">
      <h1 className="text-3xl mx-5 text-white mb-5 font-semibold">{greetingMessage}</h1>
      <div className="h-full w-full bg-white rounded-t-3xl">
        <Meta title="Home" />
        <SearchBar />
        <Discovery />
      </div>
    </div>
  );
}
