import React from 'react';
import { useParams } from 'react-router-dom';
import './movie-view.scss';

const MovieView = () => {
  const { id } = useParams();

  return (
    <div className="movie-view">
      <h1>Movie Details</h1>
      <p>Showing details for movie with ID: {id}</p>
      {/* Additional details can be added here */}
    </div>
  );
};

export default MovieView;
