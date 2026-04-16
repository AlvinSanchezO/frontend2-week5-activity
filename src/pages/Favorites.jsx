import { useState } from 'react'; // Ya no necesitamos useEffect para esto
import GameCard from '../components/GameCard';

const Favorites = () => {
  // Inicializamos el estado directamente con una función
  const [favorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  return (
    <div className="container">
      <h2 className="title">Mis Juegos Favoritos ❤️</h2>

      {favorites.length === 0 ? (
        <div className="state-message">
          <p>Aún no has agregado ningún juego a tu lista.</p>
        </div>
      ) : (
        <div className="games-grid">
          {favorites.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
