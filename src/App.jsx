import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <Link to="/" className="logo">Кінотеатр "Панорама"</Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Фільми</Link>
            <Link to="/booking/1" className="nav-link">Бронювання</Link>
          </nav>
        </header>
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking/:movieId" element={<Booking />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;