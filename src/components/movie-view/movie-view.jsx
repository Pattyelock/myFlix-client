import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./movie-view.scss";

const MovieView = ({ movies }) => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const movie = movies.find((m) => m._id === id);
  console.log(id, "id", movie);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/movies") // Fetch all movies
  //     .then((response) => setMovies(response.data))
  //     .catch((err) => {
  //       console.error("Failed to fetch movies:", err);
  //       setError("Failed to load movies. Please try again later.");
  //     });
  // }, []);

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
      {/* Safely render movie properties */}
      <h1>{movie?.Title || "Title Not Available"}</h1>
      <p>{movie?.Description || "No Description Available"}</p>
      <p>Genre: {movie?.Genre?.Name || "Unknown"}</p>
      <p>Director: {movie?.Director?.Name || "Not Listed"}</p>
      <Link key={movie._id} to={`/`}>
        <p>Go Back</p>
      </Link>
    </div>
  );
};

export default MovieView;
