// components/main-view/main-view.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MovieCard from "../movie-card/movie-card";
import "./main-view.scss";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  // Fetch movies from the deployed Heroku backend API
  useEffect(() => {
    axios
      .get("https://movie-api-main-2-81ab4bbd4cbf.herokuapp.com/movies")
      .then((response) => setMovies(response.data))
      .catch((err) => {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
      });
  }, []);

  return (
    <div className="movie-list">
      {error && <p className="error-message">{error}</p>}

      {movies.length > 0 ? (
        movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
  );
};

export default MainView;
