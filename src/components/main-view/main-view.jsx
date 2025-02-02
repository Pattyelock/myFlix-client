feature/bootstrap-styling
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

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies);


  useEffect(() => {
    if (!token) return;


    fetch("https://movie-api-main-2-81ab4bbd4cbf.herokuapp.com/movies", {

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

 feature/bootstrap-styling
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

  // Filter movies based on the search query
  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, movies]);

  // If no user, show the login/signup view
  if (!user) {
    return (
      <div className="auth-container">
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
          }}
        />
        <span className="separator">or</span>
        <SignupView />
      </div>
    );
  }

  // If a movie is selected, show MovieView
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }


          {/* "or" Separator */}
          <Row className="justify-content-center">
            <Col md={5} className="text-center">
              <p>or</p>
            </Col>
          </Row>


  // Main view displaying movies
  return (
    <BrowserRouter>
      <Row>
        {filteredMovies.map((movie) => (
          <Col className="md-5" key={movie._id || movie.id}>
            {" "}
            {/* Ensure the key is unique */}
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ))}
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
      </Row>
    </BrowserRouter>

  );
};
