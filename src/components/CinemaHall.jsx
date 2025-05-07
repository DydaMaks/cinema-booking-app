import { useState } from 'react';
import styles from '../components/cinemaHall.module.css';

const CinemaHall = ({ movieId }) => {
    const rows = 6;
    const seatsPerRow = 8;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats] = useState(() => {
      const seats = [];
      for (let i = 0; i < rows * seatsPerRow * 0.2; i++) {
        seats.push(`${Math.floor(Math.random() * rows) + 1}-${Math.floor(Math.random() * seatsPerRow) + 1}`);
      }
      return seats;
    });
  
    const toggleSeat = (seatId) => {
      setSelectedSeats(prev =>
        prev.includes(seatId)
          ? prev.filter(id => id !== seatId)
          : [...prev, seatId]
      );
    };
  
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
                    onClick={() => !isBooked && toggleSeat(seatId)}
                    disabled={isBooked}
                    data-number={seatIndex + 1}
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
  
        {selectedSeats.length > 0 && (
          <div className={styles.selectedInfo}>
            <h3>Ви вибрали місця: {selectedSeats.join(', ')}</h3>
            <button className={styles.confirmButton}>Підтвердити бронювання</button>
          </div>
        )}
      </div>
    );
  };
  
  export default CinemaHall;