const BOOKINGS_KEY = 'cinema_bookings_final_v2';

export const saveBooking = async (bookingData) => {
  try {
    const bookings = getBookings();
    const newBooking = {
      ...bookingData,
      id: Date.now().toString(),
      movieId: bookingData.movieId.toString(),
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify([...bookings, newBooking]));
    return newBooking;
  } catch (error) {
    console.error('Помилка збереження бронювання:', error);
    throw error;
  }
};

export const getBookingsForMovie = (movieId, showtime = null) => {
  const bookings = getBookings();
  return bookings.filter(booking => {
    const matchesMovie = booking.movieId === movieId.toString();
    const matchesTime = showtime ? booking.showtime === showtime : true;
    return matchesMovie && matchesTime;
  });
};

export const getAllBookedSeatsForMovie = async (movieId, showtime) => {
  const bookings = getBookingsForMovie(movieId, showtime);
  return bookings.flatMap(booking => booking.selectedSeats);
};

const getBookings = () => {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
  } catch (error) {
    console.error('Помилка читання бронювань:', error);
    return [];
  }
};