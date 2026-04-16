import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  const addToFavorites = (e) => {
    // IMPORTANTE: Evita que al dar clic al botón se active el Link de la tarjeta
    e.preventDefault();
    e.stopPropagation();

    // Lógica de guardado en LocalStorage
    const currentFavs = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFav = currentFavs.some((fav) => fav.id === game.id);

    if (!isAlreadyFav) {
      const newFavs = [...currentFavs, game];
      localStorage.setItem('favorites', JSON.stringify(newFavs));
      alert(`❤️ ${game.name} guardado en favoritos`);
    } else {
      alert('Este juego ya está en tu lista');
    }
  };

  return (
    <div className="game-card-container">
      <Link to={`/game/${game.id}`} className="game-card">
        <img
          src={game.background_image}
          alt={game.name}
          className="game-image"
        />
        <div className="game-info">
          <h3 className="game-title">{game.name}</h3>
          <p className="game-rating">⭐ Calificación: {game.rating}</p>
        </div>
        {/* Botón de favorito */}
        <button
          onClick={addToFavorites}
          className="btn-favorite"
          title="Agregar a favoritos"
        >
          ❤️
        </button>
      </Link>
    </div>
  );
};

export default GameCard;
