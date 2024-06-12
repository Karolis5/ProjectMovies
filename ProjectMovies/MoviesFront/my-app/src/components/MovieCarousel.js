
import React, { useState } from 'react';
import Slider from 'react-slick';
import MovieModal from './MovieModal';

const MovieCarousel = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className="movie-carousel">
        <Slider {...settings}>
          {movies.map(movie => (
            <div key={movie.id} className="movie-slide" onClick={() => openModal(movie)}>
              <img src={movie.poster} alt={movie.title} />
            
            </div>
          ))}
        </Slider>
      </div>
      {isModalOpen && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </>
  );
};

export default MovieCarousel;
