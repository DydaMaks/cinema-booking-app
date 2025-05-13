import { Link } from 'react-router-dom';
import styles from '../components/MovieCard.module.css';

const MovieCard = ({ movie }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(movie.rating);
    const hasHalfStar = movie.rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className={`${styles.star} ${styles.full}`}>★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className={`${styles.star} ${styles.half}`}>★</span>);
      } else {
        stars.push(<span key={i} className={styles.star}>★</span>);
      }
    }

    return stars;
  };

  return (
    <div className={styles.card}>
      <div className={styles.posterContainer}>
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className={styles.poster}
        />
        <div className={styles.genreBadge}>{movie.genre}</div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.rating}>
          {renderStars()}
          <span className={styles.ratingValue}>{movie.rating.toFixed(1)}</span>
        </div>
        <p className={styles.description}>{movie.description}</p>
        
        <div className={styles.showtimes}>
          {movie.showtimes.map((time, index) => (
            <button key={index} className={styles.timeButton}>
              {time}
            </button>
          ))}
        </div>
        
        <Link 
          to={`/booking/${movie.id}`} 
          className={styles.bookButton}
        >
          Забронювати
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;