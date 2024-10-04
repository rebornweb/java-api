import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.clearAllMocks();
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, content: 'Cheddar', pricePerKilo: 22.50, color: 'Yellow', imageUrl: 'https://www.cheese.com/media/img/cheese-thumbs/-suggestion/Briefermier.jpg' },
        { id: 2, content: 'Brie', pricePerKilo: 12.00, color: 'White', imageUrl: 'https://www.cheese.com/media/img/cheese-thumbs/cheddar_large.jpg' },
      ]),
  })
) as jest.Mock;

describe('App Component', () => {
  it('fetches and displays cheeses', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Cheddar')).toBeInTheDocument();
      expect(screen.getByText('Brie')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/cheese');

    // Check types
    const cheeses = await (await fetch('http://localhost:8080/cheese')).json();
    expect(Array.isArray(cheeses)).toBe(true);
    expect(cheeses[0]).toHaveProperty('id');
    expect(cheeses[0]).toHaveProperty('content');
    expect(cheeses[0]).toHaveProperty('pricePerKilo');
    expect(cheeses[0]).toHaveProperty('color');
    expect(cheeses[0]).toHaveProperty('imageUrl');
  });
});
