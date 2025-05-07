import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import styles from './MovieList.module.css';

const MovieList = ({ movies, layout = 'grid' }) => {
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
        <div className={layout === 'grid' ? styles.moviesGrid : styles.moviesHorizontal}>
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <p>Фільми не знайдено</p>
        </div>
      )}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  layout: PropTypes.oneOf(['grid', 'horizontal'])
};

export default MovieList;