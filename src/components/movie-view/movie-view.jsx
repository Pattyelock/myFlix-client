import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './movie-view.scss';

const MovieView = () => {
  const { id } = useParams(); // Extract movie ID from URL
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch movie by ID
    axios
      .get(`http://localhost:8080/movies/${id}`) // Update to fetch a single movie
      .then((response) => {
        console.log("Fetched movie:", response.data);
        setMovie(response.data); // Set the movie data
      })
      .catch((err) => {
        console.error("Failed to fetch movie:", err);
        setError("Failed to load movie details. Please try again later.");
      });
  }, [id]); // Dependency on `id` ensures fetch happens when ID changes

  if (error) {
    return (
      <div className="movie-view">
        <h1>{error}</h1>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-view">
        <h1>Loading movie details...</h1>
      </div>
    );
  }

  return (
    <div className="movie-view">
      {/* Render movie details safely */}
      <h1>{movie.title || 'Title Not Available'}</h1>
      <p>{movie.description || 'No Description Available'}</p>
      <p>Genre: {movie.genre?.name || 'Unknown'}</p>
      <p>Director: {movie.director?.name || 'Not Listed'}</p>
    </div>
  );
};

export default MovieView;
