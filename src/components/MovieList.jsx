import { useState } from 'react';
import MovieCard from './MovieCard';
import { movies } from '../data/movies';
import styles from '../components/MovieList.module.css';

const MovieList = () => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const filteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Пошук фільмів..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredMovies.length > 0 ? (
          <div className={styles.moviesGrid}>
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>🎬</div>
            <p className={styles.noResultsText}>Фільми не знайдено</p>
          </div>
        )}
      </div>
    );
  };
  
  export default MovieList;