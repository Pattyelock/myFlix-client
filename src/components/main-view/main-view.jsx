// components/main-view/main-view.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import axios from "axios";
import MovieCard from "../movie-card/movie-card";
import "./main-view.scss";
import MovieView from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  // Fetch movies from the deployed Heroku backend API
  useEffect(() => {
    axios
      .get("https://movie-api-main-2-81ab4bbd4cbf.herokuapp.com/movies")
      .then((response) => {
        console.log(response, "response here");
        setMovies(response.data);
      })
      .catch((err) => {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="my-flix">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {error && <p className="error-message">{error}</p>}
                {movies.map((movie) => (
                  <Link key={movie._id} to={`/movie/${movie._id}`}>
                    <MovieCard movie={movie} />
                  </Link>
                ))}
              </>
            }
          />
          <Route path="/movie/:id" element={<MovieView movies={movies} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default MainView;
