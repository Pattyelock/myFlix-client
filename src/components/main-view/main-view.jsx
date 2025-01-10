import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import "./main-view.scss";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  // Fetch movies from the deployed backend API
  useEffect(() => {
    axios
      .get("https://movie-api-main-2-81ab4bbd4cbf.herokuapp.com/movies")
      .then((response) => {
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
