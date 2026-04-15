import { Link } from 'react-router-dom';

// Recibimos el objeto 'game' en inglés
const GameCard = ({ game }) => {
  return (
    <Link to={`/game/${game.id}`} className="game-card">
      <img src={game.background_image} alt={game.name} className="game-image" />
      <div className="game-info">
        <h3 className="game-title">{game.name}</h3>
        <p className="game-rating">⭐ Calificación: {game.rating}</p>
      </div>
    </Link>
  );
};

export default GameCard;
