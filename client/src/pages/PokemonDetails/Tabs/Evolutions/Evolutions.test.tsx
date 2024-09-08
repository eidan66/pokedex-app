import { render } from '@testing-library/react-native';
import React from 'react';

import { Evolutions } from './Evolutions';
import { Evolution as EvolutionType } from '../../../../types/PokemonDetails';

describe('Evolutions', () => {
  const mockEvolutions: EvolutionType[] = [
    {
      imageUrl:
        'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/4.png',
      level: 1,
      name: 'Charmander',
    },
    {
      imageUrl:
        'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/5.png',
      level: 16,
      name: 'Charmeleon',
    },
    {
      imageUrl:
        'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/6.png',
      level: 36,
      name: 'Charizard',
    },
  ];

  it('renders nothing when evolutions data is not provided', () => {
    const { queryByText } = render(<Evolutions evolutions={undefined} />);
    expect(queryByText('Evolution Chain')).toBeNull();
  });

  it('renders nothing when evolutions array is empty', () => {
    const { queryByText } = render(<Evolutions evolutions={[]} />);
    expect(queryByText('Evolution Chain')).toBeNull();
  });

  it('renders evolution steps correctly when data is provided', () => {
    const { getByText, getAllByTestId } = render(<Evolutions evolutions={mockEvolutions} />);

    expect(getByText('Evolution Chain')).toBeTruthy();

    const steps = getAllByTestId('evolution-step');
    expect(steps.length).toBe(5);
  });
});
