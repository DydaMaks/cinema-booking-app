import { useParams } from 'react-router-dom';
import { movies } from '../data/movies';
import CinemaHall from '../components/CinemaHall';
import './Booking.css';

const Booking = () => {
  const { movieId } = useParams();
  const movie = movies.find(m => m.id === parseInt(movieId));

  if (!movie) {
    return (
      <div className="booking-page error-page">
        <h2>Фільм не знайдено</h2>
        <p>Будь ласка, поверніться на головну сторінку</p>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1 className="page-title">Бронювання: {movie.title}</h1>
        
        <div className="movie-info-section">
          <img src={movie.poster} alt={movie.title} className="movie-poster" />
          <div className="movie-details">
            <p className="movie-description">{movie.description}</p>
            <div className="showtimes-section">
              <h3>Доступні сеанси:</h3>
              <div className="showtimes">
                {movie.showtimes.map((time, index) => (
                  <span key={index} className="time-badge">{time}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="cinema-hall-container">
          <CinemaHall movieId={movieId} />
        </div>
      </div>
    </div>
  );
};

export default Booking;