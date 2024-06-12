
import axios from 'axios';
import React from 'react';

const MovieItem = ({ movie, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(movie);
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/movies/${movie.id}`);
        onDelete(movie.id);
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  
  const formattedReleaseDate = movie.releaseDate; 

  return (
    <div className="movie-item">
      <img src={movie.poster} alt={movie.title} />
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <p><strong>IMDb ID:</strong> {movie.imdbId}</p>
        <p><strong>Release Date:</strong> {formattedReleaseDate}</p>
        <p><strong>Trailer:</strong> <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">Watch Trailer</a></p>
        <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
      </div>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default MovieItem;
