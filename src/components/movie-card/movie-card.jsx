import React from "react";
import { Link } from "react-router-dom";
import "./movie-card.scss";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <h3>{movie.Title}</h3>
      <Link to={`/movies/${movie._id}`} className="movie-link">
        <p>View Details</p>
      </Link>
    </div>
  );
};

export default MovieCard;
