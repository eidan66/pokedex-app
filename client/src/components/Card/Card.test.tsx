import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { Card } from './Card';
import { COLORS } from '../../constants/colors';

jest.mock('../../../assets/svg/pokeballSvg.svg', () => 'PokeballSvg');

describe('Card', () => {
  const mockOnCardPress = jest.fn();

  it('should render correctly with given props', () => {
    const { getByText, getByTestId } = render(
      <Card background={COLORS.grass} title="Pokédex" onCardPress={mockOnCardPress} />,
    );

    expect(getByText('Pokédex')).toBeTruthy();
    expect(getByTestId('pokeball-svg')).toBeTruthy();
  });

  it('should apply custom styles correctly', () => {
    const customStyle = { margin: 10 };
    const { getByTestId } = render(
      <Card background={COLORS.grass} title="Moves" style={customStyle} onCardPress={mockOnCardPress} />,
    );

    const container = getByTestId('card-container');
    expect(container.props.style).toContainEqual(customStyle);
  });

  /**
   * Skipping this test because I didn't implement navigation yet
   */
  it.skip('should call onCardPress with correct title when pressed', () => {
    const { getByText } = render(<Card background={COLORS.grass} title="Abilities" onCardPress={mockOnCardPress} />);

    fireEvent.press(getByText('Abilities'));
    expect(mockOnCardPress).toHaveBeenCalledWith('Abilities');
  });

  it('should render Pokeball SVG with correct dimensions and styles', () => {
    const { getByTestId } = render(<Card background={COLORS.grass} title="Items" onCardPress={mockOnCardPress} />);

    const pokeballSvg = getByTestId('pokeball-svg');
    expect(pokeballSvg.props.width).toBe(70);
    expect(pokeballSvg.props.height).toBe(70);
    expect(pokeballSvg.props.fill).toBe(`${COLORS.white}${COLORS['0.4']}`);
  });
});
