/* global global */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';

// Mock del componente GameCard para simplificar el test
vi.mock('../components/GameCard', () => ({
  default: ({ game }) => <div data-testid="game-card">{game.name}</div>,
}));

describe('Home Component', () => {
  beforeEach(() => {
    // Limpiar los mocks antes de cada test
    vi.clearAllMocks();
  });

  it('should render loading message initially', () => {
    // Mock de fetch que nunca resuelve (para simular loading)
    global.fetch = vi.fn(() => new Promise(() => {}));

    render(<Home />);

    expect(screen.getByText(/Cargando juegos/i)).toBeInTheDocument();
  });

  it('should render games after successful fetch', async () => {
    const mockGames = [
      { id: 1, name: 'The Witcher 3' },
      { id: 2, name: 'Elden Ring' },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: mockGames }),
      })
    );

    render(<Home />);

    // Esperar a que se carguen los juegos
    await waitFor(() => {
      expect(screen.queryByText(/Cargando juegos/i)).not.toBeInTheDocument();
    });

    // Verificar que se renderizaron los GameCard
    const gameCards = screen.getAllByTestId('game-card');
    expect(gameCards).toHaveLength(2);
    expect(screen.getByText('The Witcher 3')).toBeInTheDocument();
    expect(screen.getByText('Elden Ring')).toBeInTheDocument();
  });

  it('should render error message when fetch fails', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    );

    render(<Home />);

    // Esperar a que aparezca el mensaje de error
    await waitFor(() => {
      expect(
        screen.getByText(/Error: No se pudieron cargar los juegos/i)
      ).toBeInTheDocument();
    });
  });
});
