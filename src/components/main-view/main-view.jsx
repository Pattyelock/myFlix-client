import React from 'react';
import { Link } from 'react-router-dom';

const MainView = () => {
  const movies = [
    { id: 1, title: 'Inception' },
    { id: 2, title: 'The Shawshank Redemption' },
    { id: 3, title: 'Gladiator' },
  ];

  return (
    <div>
      <h1>My Movie List</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainView; // Default export
