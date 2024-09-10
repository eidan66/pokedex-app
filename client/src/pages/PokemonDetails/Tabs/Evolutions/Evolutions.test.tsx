import { render } from '@testing-library/react-native';
import React from 'react';

import { Evolutions } from './Evolutions';
import { Evolution as EvolutionType } from '../../../../types/PokemonDetails';

describe('Evolutions', () => {
  const mockEvolutions: EvolutionType = {
    evolutions_chain: [
      {
        name: 'eevee',
        evolutionMethod: 'Base Form',
        level: null,
        methodImageUrl: null,
        imageUrl:
          'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/133.png',
      },
      {
        name: 'vaporeon',
        evolutionMethod: 'Water-Stone',
        level: null,
        methodImageUrl:
          'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/items/water-stone.png',
        imageUrl:
          'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/134.png',
      },
      {
        name: 'jolteon',
        evolutionMethod: 'Thunder-Stone',
        level: null,
        methodImageUrl:
          'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/items/thunder-stone.png',
        imageUrl:
          'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/135.png',
      },
      {
        name: 'espeon',
        evolutionMethod: 'High Friendship',
        level: null,
        methodImageUrl: null,
        imageUrl:
          'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/196.png',
      },
      {
        name: 'umbreon',
        evolutionMethod: 'High Friendship',
        level: null,
        methodImageUrl: null,
        imageUrl:
          'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/197.png',
      },
      {
        name: 'leafeon',
        evolutionMethod: 'Leaf-Stone',
        level: null,
        methodImageUrl:
          'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/items/leaf-stone.png',
        imageUrl:
          'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/470.png',
      },
    ],
    all_from_base: true,
  };

  it('renders nothing when evolutions data is not provided', () => {
    const { queryByText } = render(<Evolutions />);
    expect(queryByText('Evolution Chain')).toBeNull();
  });

  it('renders nothing when evolutions array is empty', () => {
    const { queryByText } = render(<Evolutions evolutionsRes={{ evolutions_chain: [], all_from_base: false }} />);
    expect(queryByText('Evolution Chain')).toBeNull();
  });

  it('renders evolution steps correctly when data is provided', () => {
    const { getByText, getAllByTestId } = render(<Evolutions evolutionsRes={mockEvolutions} />);

    expect(getByText('Evolution Chain')).toBeTruthy();

    const steps = getAllByTestId('evolution-step'); // Assuming `EvolutionStep` component has this testID
    expect(steps.length).toBe(5); // The mock data has 6 evolutions
  });
});
