import React from 'react';
import { render } from '@testing-library/react-native';
import { Card } from './Card';
import { COLORS } from '../../constants/colors';

jest.mock('../../../assets/svg/pokeballSvg.svg', () => 'PokeballSvg');

describe('Card', () => {
  it('should render correctly with given props', () => {
    const { getByText, getAllByTestId } = render(<Card background={COLORS.grass} title="Pokédex" />);

    expect(getByText('Pokédex')).toBeTruthy();
    expect(getAllByTestId('pokeball-svg').length).toBe(1);
  });

  it('should apply custom styles correctly', () => {
    const customStyle = { margin: 10 };
    const { getByTestId } = render(<Card background={COLORS.grass} title="Moves" style={customStyle} />);

    const container = getByTestId('card-container');
    expect(container.props.style).toContainEqual(customStyle);
  });
});
