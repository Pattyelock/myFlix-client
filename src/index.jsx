import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.scss'; // Make sure the styles are applied correctly
import MainView from './components/main-view/main-view'; // Import MainView as a default export
import MovieView from './components/movie-view/movie-view'; // Import MovieView as a default export

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainView />} /> {/* This is the main page */}
        <Route path="/movie/:id" element={<MovieView />} /> {/* MovieView route */}
      </Routes>
    </Router>
  </React.StrictMode>
);
