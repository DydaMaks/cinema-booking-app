const BOOKINGS_KEY = 'cinema_bookings_v2';

export const saveBooking = (bookingData) => {
  try {
    const bookings = getBookings();
    const newBooking = {
      ...bookingData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify([...bookings, newBooking]));
    return true;
  } catch (error) {
    console.error('Помилка збереження бронювання:', error);
    return false;
  }
};

export const getBookingsForMovie = (movieId) => {
  const bookings = getBookings();
  return bookings.filter(booking => booking.movieId === movieId.toString());
};

export const getAllBookedSeatsForMovie = (movieId) => {
  const bookings = getBookingsForMovie(movieId);
  return bookings.flatMap(booking => booking.selectedSeats);
};

export const isSeatAvailable = (movieId, seatId) => {
  const bookedSeats = getAllBookedSeatsForMovie(movieId);
  return !bookedSeats.includes(seatId);
};

const getBookings = () => {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
  } catch (error) {
    console.error('Помилка читання бронювань:', error);
    return [];
  }
};