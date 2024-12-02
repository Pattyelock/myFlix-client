import { createRoot } from 'react-dom/client';
import React from 'react';
import MovieList from './components/MovieList'; // Import the MovieList component

// Import the styles
import './index.scss';

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <h1>My Flix App</h1>
      <MovieList /> {/* Include the MovieList component */}
    </div>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);
