import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("https://movies-flix-hartung-46febebee5c5.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath || "https://via.placeholder.com/150",
            director: movie.Director || "Unknown Director",
            description: movie.Description || "No description available",
            genre: movie.Genre || "Unknown genre",
            actors: movie.Actors || []
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {user ? (
        <>
          {movies.length === 0 ? (
            <p>Loading movies...</p>
          ) : (
            movies.map((movie) => (
              <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard movie={movie} />
              </Col>
            ))
          )}
        </>
      ) : (
        <>
          {/* LoginView Row */}
          <Row className="justify-content-center mb-4">
            <Col md={5}>
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                  localStorage.setItem("user", JSON.stringify(user));
                  localStorage.setItem("token", token);
                }}
              />
            </Col>
          </Row>

          {/* "or" Separator */}
          <Row className="justify-content-center">
            <Col md={5} className="text-center">
              <p>or</p>
            </Col>
          </Row>

          {/* SignupView Row */}
          <Row className="justify-content-center">
            <Col md={5}>
              <SignupView />
            </Col>
          </Row>
        </>
      )}
    </Row>
  );
};
