import { render } from '@testing-library/react-native';
import React from 'react';

import { EvolutionStep } from './EvolutionStep';

describe('EvolutionStep', () => {
  const mockUri =
    'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/6.png';

  it('renders the Evolution component with the correct URI', () => {
    const { getByTestId } = render(<EvolutionStep uri={mockUri} />);
    const evolutionImage = getByTestId('pokemon-image');

    expect(evolutionImage.props.source.uri).toBe(mockUri);
  });

  it('does not display the arrow and level text when no level is provided', () => {
    const { queryByText } = render(<EvolutionStep uri={mockUri} />);

    expect(queryByText('Lvl')).toBeNull();
  });

  it('renders the arrow and level text when level is provided', () => {
    const { getByText } = render(<EvolutionStep uri={mockUri} level={16} />);

    expect(getByText('Lvl 16')).toBeTruthy();
  });
});
