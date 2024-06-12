
import axios from 'axios';
import React, { useState } from 'react';
import "../components/styles.css";

const MovieModal = ({ movie, onClose }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedMovie, setEditedMovie] = useState({ ...movie });

  if (!movie) return null;

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie({ ...editedMovie, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/movies/${editedMovie.id}`, editedMovie);
      console.log(response.data);
      setEditMode(false);
      onClose(); 
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/movies/${movie.id}`);
        onClose(); 
       
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {editMode ? (
     
          <form onSubmit={handleEditSubmit}>
            <label>
              IMDb ID:
              <input type="text" name="imdbId" value={editedMovie.imdbId} onChange={handleEditChange} />
            </label>
            <label>
              Title:
              <input type="text" name="title" value={editedMovie.title} onChange={handleEditChange} />
            </label>
            <label>
              Release Date:
              <input type="text" name="releaseDate" value={editedMovie.releaseDate} onChange={handleEditChange} />
            </label>
            <label>
              Trailer Link:
              <input type="text" name="trailerLink" value={editedMovie.trailerLink} onChange={handleEditChange} />
            </label>
            <label>
              Poster URL:
              <input type="text" name="poster" value={editedMovie.poster} onChange={handleEditChange} />
            </label>
            <label>
              Genres (comma-separated):
              <input type="text" name="genres" value={editedMovie.genres.join(', ')} onChange={handleEditChange} />
            </label>
            <button type="submit">Save Changes</button>
          </form>
        ) : (
         
          <>
            <h2>{movie.title}</h2>
            <img src={movie.poster} alt={movie.title} />
            <p><strong>IMDb ID:</strong> {movie.imdbId}</p>
            <p><strong>Release Date:</strong> {movie.releaseDate}</p>
            <p><strong>Trailer:</strong> <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">Watch Trailer</a></p>
            <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
            <div className="modal-actions">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
