import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddMovieForm from './AddMovieForm';
import MovieItem from './MovieItem';
const MovieContainer = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const onMovieAdded = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const onMovieEdit = (updatedMovie) => {
    setMovies(movies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie));
  };

  const onMovieDelete = (movieId) => {
    setMovies(movies.filter(movie => movie.id !== movieId));
  };

  return (
    <div>
      <AddMovieForm onMovieAdded={onMovieAdded} />
      {movies.map(movie => (
        <MovieItem
          key={movie.id}
          movie={movie}
          onEdit={onMovieEdit}
          onDelete={onMovieDelete}
        />
      ))}
    </div>
  );
};

export default MovieContainer;
