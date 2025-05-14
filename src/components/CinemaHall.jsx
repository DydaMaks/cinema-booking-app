import { useState, useEffect, useCallback } from 'react';
import { getAllBookedSeatsForMovie } from '../services/BookingService';
import BookingForm from './BookingForm';
import styles from '../components/cinemaHall.module.css';

const CinemaHall = ({ movieId, selectedTime }) => {
  const rows = 6;
  const seatsPerRow = 7;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadBookedSeats = useCallback(async () => {
    try {
      const seats = await getAllBookedSeatsForMovie(movieId, selectedTime);
      setBookedSeats(seats);
    } catch (error) {
      console.error('Помилка завантаження місць:', error);
    } finally {
      setIsLoading(false);
    }
  }, [movieId, selectedTime]);

  useEffect(() => {
    loadBookedSeats();
    
    const interval = setInterval(() => {
      loadBookedSeats();
    }, 3000);

    return () => clearInterval(interval);
  }, [loadBookedSeats]);

  const toggleSeat = (seatId) => {
    if (!bookedSeats.includes(seatId)) {
      setSelectedSeats(prev =>
        prev.includes(seatId)
          ? prev.filter(id => id !== seatId)
          : [...prev, seatId]
      );
    }
  };

  const handleBookingSuccess = () => {
    loadBookedSeats();
    setSelectedSeats([]);
    setShowForm(false);
  };

  if (isLoading) return <div className={styles.loading}>Завантаження місць...</div>;

  return (
    <div className={styles.hallContainer}>
      <div className={styles.screen}>ЕКРАН</div>
      <div className={styles.seatsGrid}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className={styles.row}>
            <div className={styles.rowLabel}>{rowIndex + 1}</div>
            {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
              const seatId = `${rowIndex + 1}-${seatIndex + 1}`;
              const isSelected = selectedSeats.includes(seatId);
              const isBooked = bookedSeats.includes(seatId);

              return (
                <button
                  key={`seat-${seatId}`}
                  className={`${styles.seat} ${
                    isBooked
                      ? styles.booked
                      : isSelected
                      ? styles.selected
                      : styles.available
                  }`}
                  onClick={() => toggleSeat(seatId)}
                  disabled={isBooked}
                  aria-label={`Місце ${seatId}`}
                >
                  {seatIndex + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      
      <div className={styles.legend}>
        <div><span className={`${styles.seat} ${styles.available}`}></span> Вільні</div>
        <div><span className={`${styles.seat} ${styles.selected}`}></span> Вибрані</div>
        <div><span className={`${styles.seat} ${styles.booked}`}></span> Зайняті</div>
      </div>

      {selectedSeats.length > 0 && !showForm && (
        <div className={styles.selectedInfo}>
          <h3>Ви вибрали місця: {selectedSeats.join(', ')}</h3>
          <button 
            onClick={() => setShowForm(true)}
            className={styles.confirmButton}
          >
            Забронювати
          </button>
        </div>
      )}

      {showForm && (
        <BookingForm
          movieId={movieId}
          selectedSeats={selectedSeats}
          selectedTime={selectedTime}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default CinemaHall;