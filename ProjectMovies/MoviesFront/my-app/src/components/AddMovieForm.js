import axios from 'axios';
import React, { useState } from 'react';
import './styles.css';

const AddMovieForm = ({ onMovieAdded }) => {
  const [formData, setFormData] = useState({
    imdbId: '',
    title: '',
    releaseDate: '',
    genres: [],
    poster: '',
    trailerLink: '',
    backdrops: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'genres' || name === 'backdrops') {
      const arrayValue = value.split(',').map(item => item.trim());
      setFormData({ ...formData, [name]: arrayValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/movies', formData);
      onMovieAdded(response.data);
      setFormData({
        imdbId: '',
        title: '',
        releaseDate: '',
        genres: [],
        poster: '',
        trailerLink: '',
        backdrops: [],
      });
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <div className="add-movie-form">
      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          IMDb ID:
          <input type="text" name="imdbId" value={formData.imdbId} onChange={handleInputChange} />
        </label>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </label>
        <label>
          Release Date:
          <input type="text" name="releaseDate" value={formData.releaseDate} onChange={handleInputChange} />
        </label>
        <label>
          Trailer Link:
          <input type="text" name="trailerLink" value={formData.trailerLink} onChange={handleInputChange} />
        </label>
        <label>
          Poster URL:
          <input type="text" name="poster" value={formData.poster} onChange={handleInputChange} />
        </label>
        <label>
          Backdrops (comma-separated URLs):
          <input type="text" name="backdrops" value={Array.isArray(formData.backdrops) ? formData.backdrops.join(', ') : ''} onChange={handleInputChange} />
        </label>
        <label>
          Genres (comma-separated):
          <input type="text" name="genres" value={Array.isArray(formData.genres) ? formData.genres.join(', ') : ''} onChange={handleInputChange} />
        </label>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
