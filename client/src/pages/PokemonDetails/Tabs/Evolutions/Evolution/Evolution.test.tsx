import { render } from '@testing-library/react-native';
import React from 'react';

import { Evolution } from './Evolution';
import { COLORS } from '../../../../../constants/colors';

describe('Evolution', () => {
  const mockUri =
    'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/6.png';

  it('renders the Evolution component correctly', () => {
    const { getByTestId } = render(<Evolution uri={mockUri} />);

    // Check if the image and pokeball svg are rendered
    const image = getByTestId('pokemon-image');
    const pokeball = getByTestId('pokeball-svg');

    expect(image).toBeTruthy();
    expect(pokeball).toBeTruthy();
  });

  it('renders the correct image source URI', () => {
    const { getByTestId } = render(<Evolution uri={mockUri} />);
    const image = getByTestId('pokemon-image');

    expect(image.props.source.uri).toBe(mockUri);
  });

  it('renders the PokeballSvg with the correct fill color', () => {
    const { getByTestId } = render(<Evolution uri={mockUri} />);
    const pokeball = getByTestId('pokeball-svg');

    expect(pokeball.props.fill).toBe(`${COLORS.black}${COLORS['0.1']}`);
  });
});
