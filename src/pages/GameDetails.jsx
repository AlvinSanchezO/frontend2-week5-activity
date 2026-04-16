import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  // NOTA: Reemplaza esto con tu API Key de RAWG
  const API_KEY = '2a3f6a90fc644427b42cddeff0bbe478';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        const data = await response.json();
        setGame(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading)
    return <div className="state-message">Cargando detalles del juego...</div>;
  if (!game)
    return (
      <div className="state-message error-text">
        No se pudo cargar la información.
      </div>
    );

  return (
    <div className="container">
      <div className="game-details-content">
        <img
          src={game.background_image}
          alt={game.name}
          className="details-banner"
        />

        <h2 className="title">{game.name}</h2>

        <div className="game-specs">
          <span>
            📅 <strong>Lanzamiento:</strong> {game.released}
          </span>
          <span>
            ⭐ <strong>Rating:</strong> {game.rating} / 5
          </span>
          <span>
            🎮 <strong>Plataformas:</strong>{' '}
            {game.platforms?.map((p) => p.platform.name).join(', ')}
          </span>
        </div>

        <div className="game-description">
          <h3>Sobre este juego</h3>
          {/* dangerouslySetInnerHTML se usa porque la API de RAWG envía la descripción en formato HTML */}
          <div dangerouslySetInnerHTML={{ __html: game.description }} />
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
