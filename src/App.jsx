import React from 'react';
import { movies } from './data/movies';
import MovieList from './components/MovieList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Кінотеатр "Синема"</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;