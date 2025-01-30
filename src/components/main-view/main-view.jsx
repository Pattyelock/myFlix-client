import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import ProfileView from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { Row, Col } from 'react-bootstrap';

const MainView = () => {
  const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const storedToken = localStorage.getItem("token") || null;

  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("https://movie-api-main-2-81ab4bbd4cbf.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, movies]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <Router>
      <NavigationBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/movies" /> : <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
        }} />} />
        
        <Route path="/signup" element={<SignupView />} />
        
        <Route path="/movies" element={
          user ? (
            <Row>
              {filteredMovies.length > 0 ? filteredMovies.map((movie) => (
                <Col className='md-5' key={movie._id || movie.id}>
                  <MovieCard movie={movie} />
                </Col>
              )) : <div>The list is empty!</div>}
            </Row>
          ) : (
            <Navigate to="/" />
          )
        } />
        
        <Route path="/movies/:movieId" element={user ? <MovieView /> : <Navigate to="/" />} />
        
        <Route path="/profile" element={user ? <ProfileView user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default MainView;
