import { Link } from 'react-router-dom';
import styles from '../components/MovieCard.module.css';

const MovieCard = ({ movie }) => {
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