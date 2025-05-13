import { useState } from 'react';
import MovieCard from './MovieCard';
import { movies } from '../data/movies';
import styles from '../components/MovieList.module.css';

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [minRating, setMinRating] = useState(0);

  const genres = ['all', ...new Set(movies.map(movie => movie.genre))];

  const filteredMovies = movies
    .filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
      const matchesRating = movie.rating >= minRating;
      return matchesSearch && matchesGenre && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title-asc': return a.title.localeCompare(b.title);
        case 'title-desc': return b.title.localeCompare(a.title);
        case 'time-early': return a.showtimes[0].localeCompare(b.showtimes[0]);
        case 'time-late': return b.showtimes[0].localeCompare(a.showtimes[0]);
        case 'rating-high': return b.rating - a.rating;
        case 'rating-low': return a.rating - b.rating;
        default: return 0;
      }
    });

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.filterSection}>
          <h3>Фільтри</h3>
          
          <div className={styles.filterGroup}>
            <label>Пошук:</label>
            <input
              type="text"
              placeholder="Назва фільму..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Жанр:</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className={styles.selectInput}
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'Всі жанри' : genre}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Мінімальний рейтинг: {minRating}</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className={styles.rangeInput}
            />
          </div>
        </div>

        <div className={styles.sortSection}>
          <h3>Сортування</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.selectInput}
          >
            <option value="default">За замовчуванням</option>
            <option value="title-asc">Назва (А-Я)</option>
            <option value="title-desc">Назва (Я-А)</option>
            <option value="time-early">Час (ранні)</option>
            <option value="time-late">Час (пізні)</option>
            <option value="rating-high">Рейтинг (високий)</option>
            <option value="rating-low">Рейтинг (низький)</option>
          </select>
        </div>
      </aside>

      <main className={styles.moviesContainer}>
        {filteredMovies.length > 0 ? (
          <div className={styles.moviesFlex}>
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <p>Фільмів не знайдено. Спробуйте змінити параметри пошуку.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MovieList;