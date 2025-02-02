import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProfileView() {
  const [user, setUser] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Fetch user data from the API (you can use a logged-in user's token)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/me');
        setUser(response.data);
        setFavoriteMovies(response.data.favoriteMovies);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleRemoveFavorite = async (movieId) => {
    try {
      await axios.delete(`/api/users/me/favorites/${movieId}`);
      setFavoriteMovies(favoriteMovies.filter((movie) => movie._id !== movieId));
    } catch (error) {
      console.error('Error removing favorite movie:', error);
    }
  };

  const handleDeregister = async () => {
    try {
      await axios.delete('/api/users/me');
      // Handle logout or redirect to login
    } catch (error) {
      console.error('Error deregistering user:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-view">
      <h2>User Profile</h2>
      <div>
        <h3>Registration Details</h3>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</p>
      </div>

      <div>
        <h3>Favorite Movies</h3>
        <ul>
          {favoriteMovies.length === 0 ? (
            <p>You have no favorite movies yet.</p>
          ) : (
            favoriteMovies.map((movie) => (
              <li key={movie._id}>
                <span>{movie.title}</span>
                <button onClick={() => handleRemoveFavorite(movie._id)}>Remove from Favorites</button>
              </li>
            ))
          )}
        </ul>
      </div>

      <div>
        <button onClick={handleDeregister}>Deregister</button>
      </div>
    </div>
  );
}

export default ProfileView;
