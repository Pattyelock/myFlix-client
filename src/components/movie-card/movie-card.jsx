// components/main-view/main-view.js
import './movie-card.scss';  // For MovieCard
import React from "react";
import "../main-view/main-view.scss";

const MovieCard = ({ movie }) => {
  return (
    <>
      <div>{movie?.Title}</div>
    </>
  );
};

export default MovieCard;
