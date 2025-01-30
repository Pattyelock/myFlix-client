import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './components/Movies';
import ProfileView from './components/ProfileView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
