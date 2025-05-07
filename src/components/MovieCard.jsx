import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <img src={movie.poster} alt={movie.title} className={styles.poster} />
      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.description}>{movie.description}</p>
        <div className={styles.details}>
          <span className={styles.genre}>{movie.genre}</span>
          <div className={styles.showtimes}>
            {movie.showtimes.map((time, index) => (
              <span key={index} className={styles.time}>{time}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    showtimes: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default MovieCard;