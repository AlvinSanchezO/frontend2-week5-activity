import { useParams } from 'react-router-dom';

const GameDetails = () => {
  // Extraemos el ID de la URL
  const { id } = useParams();

  return (
    <div className="container">
      <h2 className="title">Detalles del Videojuego</h2>
      <p>
        Estás simulando la vista del juego con el ID secreto:{' '}
        <strong>{id}</strong>
      </p>
    </div>
  );
};

export default GameDetails;
