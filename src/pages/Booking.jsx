import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movies } from '../data/movies';
import CinemaHall from '../components/CinemaHall';
import './Booking.css';

const Booking = () => {
  const { movieId } = useParams();
  const [selectedTime, setSelectedTime] = useState(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundMovie = movies.find(m => m.id === parseInt(movieId));
    setMovie(foundMovie);
    setLoading(false);
  }, [movieId]);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  if (loading) {
    return <div className="booking-page">Завантаження...</div>;
  }

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
              <h3>Оберіть час сеансу:</h3>
              <div className="showtimes">
                {movie.showtimes.map((time, index) => (
                  <button
                    key={index}
                    className={`time-badge ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {selectedTime && (
                <p className="selected-time-info">
                  Обраний час: <strong>{selectedTime}</strong>
                </p>
              )}
            </div>
          </div>
        </div>

        {selectedTime && (
          <div className="cinema-hall-container">
            <h3>Оберіть місця для сеансу о {selectedTime}</h3>
            <CinemaHall 
              movieId={movieId} 
              selectedTime={selectedTime} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;