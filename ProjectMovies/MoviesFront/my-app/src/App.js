
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import MovieCarousel from './components/MovieCarousel';
import MovieContainer from './components/MovieContainer';
import NoMatch from './components/NoMatch';
import "./components/styles.css";

const App = () => {
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

  return (
    <BrowserRouter>
    <h1>Movies.INC</h1>
      <div className="app-container">
        <nav className="navigation">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/manage" className="nav-link">Manage Movies</Link> 
        </nav>
        <Routes>
          <Route path="/" element={<MovieCarousel movies={movies} />} />
          <Route path="/manage" element={<MovieContainer />} /> 
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
