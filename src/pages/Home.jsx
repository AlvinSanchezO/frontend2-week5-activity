import { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';

const Home = () => {
  // 1. Declaración de Estados en Inglés
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // IMPORTANTE: Reemplazar con la llave real de RAWG en clase
    const API_KEY = '2a3f6a90fc644427b42cddeff0bbe478';

    // 2. Función asíncrona nombrada convencionalmente
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('No se pudieron cargar los juegos');
        }

        const data = await response.json();
        setGames(data.results); // Guardamos los resultados
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Apagamos el estado de carga
      }
    };

    fetchGames();
  }, []); // El arreglo vacío asegura que solo se ejecute una vez al montar

  // 3. Renderizado condicional basado en los estados
  if (isLoading) {
    return <h2 className="state-message">Cargando juegos... ⏳</h2>;
  }

  if (error) {
    return <h2 className="state-message error-text">Error: {error} ❌</h2>;
  }

  // 4. Renderizado principal
  return (
    <div className="container">
      <h2 className="title">Juegos Populares</h2>

      <div className="games-grid">
        {/* Iteramos sobre el arreglo 'games' */}
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Home;
