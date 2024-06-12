import React from 'react';
import AddMovieForm from './AddMovieForm';

const CreateMoviePage = () => {
  const handleMovieAdded = (newMovieData) => {
    console.log("New Movie Added:", newMovieData);
  };

  return (
    <div className="create-movie-page">
      <h1>Create New Movie</h1>
      <AddMovieForm onMovieAdded={handleMovieAdded} />
    </div>
  );
};

export default CreateMoviePage;