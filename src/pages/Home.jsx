import MovieList from '../components/MovieList';

const Home = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Фільми в прокаті</h1>
      <MovieList />
    </div>
  );
};

export default Home;