import { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';

const Home = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Obtenemos la llave desde las variables de entorno de Vite
    const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

    const fetchGames = async () => {
      // Validación de seguridad local
      if (!API_KEY) {
        setError('Falta la API Key en el archivo .env');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Error al conectar con la API de juegos');
        }

        const data = await response.json();
        setGames(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (isLoading) {
    return <div className="state-message">Cargando juegos populares... ⏳</div>;
  }

  if (error) {
    return (
      <div className="container">
        <h2 className="state-message error-text">⚠️ {error}</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="title">Juegos Populares</h2>

      <div className="games-grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Home;
