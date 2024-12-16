import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './movie-view.scss';

const MovieView = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/movies") // Fetch all movies
      .then((response) => setMovies(response.data))
      .catch((err) => {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
      });
  }, []);
  
  
  if (error) {
    return <div className="movie-view"><h1>{error}</h1></div>;
  }

  if (!movie) {
    return <div className="movie-view"><h1>Loading movie details...</h1></div>;
  }

  return (
    <div className="movie-view">
      {/* Safely render movie properties */}
      <h1>{movie?.title || 'Title Not Available'}</h1>
      <p>{movie?.description || 'No Description Available'}</p>
      <p>Genre: {movie?.genre?.name || 'Unknown'}</p>
      <p>Director: {movie?.director?.name || 'Not Listed'}</p>
    </div>
  );
};

export default MovieView;
