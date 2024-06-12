
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../components/styles.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/movies');
     
        const validMovies = response.data.filter(movie => movie.imdbId && movie.title);
        setMovies(validMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
     
      <ul className="movie-list">
        {movies.map(movie => (
          <li key={movie.id} className="movie-item">
            <h3 className="movie-title">{movie.title}</h3>
            <div className="movie-info">
              <label>IMDb ID:</label> {movie.imdbId}
            </div>
            <div className="movie-info">
              <label>Release Date:</label> {movie.releaseDate}
            </div>
            <div className="movie-info">
              <label>Trailer Link:</label> <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">{movie.trailerLink}</a>
            </div>
            <div className="movie-info">
              <label>Poster:</label> <img src={movie.poster} alt={movie.title} />
            </div>
            <div className="movie-info">
              <label>Genres:</label> {movie.genres.join(', ')}
            </div>
            <div className="movie-backdrops">
              {movie.backdrops.map((backdrop, index) => (
                <img key={index} src={backdrop} alt={`Backdrop ${index + 1}`} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
