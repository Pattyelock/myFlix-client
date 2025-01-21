import './login-view.scss';
import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // API call to log in
    fetch('https://movie-api-main-2-81ab4bbd4cbf.herokuapp.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Username: username, Password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          onLoggedIn(data.user);
        } else {
          setErrorMessage('Invalid username or password');
        }
      })
      .catch(() => {
        setErrorMessage('An error occurred. Please try again.');
      });
  };

  return (
    <Container className="login-view mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <Form onSubmit={handleSubmit}>
        {errorMessage && (
          <Alert variant="danger" className="text-center">
            {errorMessage}
          </Alert>
        )}
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </Container>
  );
};
