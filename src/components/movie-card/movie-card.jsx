import React from "react";
feature/bootstrap-styling
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Link } from "react-router-dom";
import "./movie-card.scss";


export const MovieCard = ({ movie }) => {
  return (
 feature/bootstrap-styling
    <Card className="h-100">
      {}
      <Link to={`/movies/${movie.id}`} className="text-decoration-none">
        <Card.Img variant="top" src={movie.image} className="w-100" />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
        </Card.Body>
      </Link>
    </Card>

    <div className="movie-card">
      <h3>{movie.Title}</h3>
      <Link to={`/movies/${movie._id}`} className="movie-link">
        <p>View Details</p>
      </Link>
    </div>

  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string,
    genre: PropTypes.string,
  }).isRequired,
};