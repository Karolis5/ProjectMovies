package MovieApp.Movies.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovieById(String id) {
        Optional<Movie> movie = movieRepository.findById(id);
        return movie.orElse(null);
    }

    public Movie addMovie(Movie movie) {
        // Logic to add a new movie
        return movieRepository.save(movie);
    }

    public Movie updateMovie(String id, Movie movie) {
        // Logic to update an existing movie
        Optional<Movie> existingMovie = movieRepository.findById(id);
        if (existingMovie.isPresent()) {
            // Update the movie details
            Movie updatedMovie = existingMovie.get();
            updatedMovie.setTitle(movie.getTitle());
            // Set other fields from 'movie' to 'updatedMovie'
            return movieRepository.save(updatedMovie);
        }
        return null;
    }

    public void deleteMovie(String id) {
        movieRepository.deleteById(id);
    }
}