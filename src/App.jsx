import React from 'react';
import { movies } from './data/movies';
import MovieList from './components/MovieList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1 className="logo">Кінотеатр "Панорама"</h1>
        <nav className="nav">
          <a href="#now-playing" className="navLink active">Сьогодні у кіно</a>
          <a href="#soon" className="navLink">Скоро</a>
          <a href="#contacts" className="navLink">Контакти</a>
        </nav>
      </header>
      <main>
        <MovieList movies={movies} />
      </main>
    </div>
  );
}

export default App;