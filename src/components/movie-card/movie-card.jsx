// components/main-view/main-view.js
import React from "react";
import "../main-view/main-view.scss";

const MovieCard = ({ movie }) => {
  return (
    <>
      <div>{movie?.Title}</div>
      <div>{movie?.Director?.Name}</div>
      <img src="https://imgur.com/T7c3vTl.png" />
    </>
  );
};

export default MovieCard;
