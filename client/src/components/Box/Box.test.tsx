import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { Box } from './Box';
import { COLORS } from '../../constants/colors';
import { PokemonTypes } from '../../types';

describe('Box component', () => {
  const mockOnPokemonPress = jest.fn();

  it('renders correctly with given props', () => {
    const { getByText, getByTestId } = render(
      <Box
        boxBg={COLORS.grass}
        svg="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/1.gif?raw=true"
        name="Bulbasaur"
        number="#001"
        types={[PokemonTypes.Grass, PokemonTypes.Poison]}
        onPokemonPress={mockOnPokemonPress}
        id={1}
      />,
    );

    expect(getByText('Bulbasaur')).toBeTruthy();
    expect(getByText('#001')).toBeTruthy();
    expect(getByText('Grass')).toBeTruthy();
    expect(getByText('Poison')).toBeTruthy();
    const image = getByTestId('pokemon-image');
    expect(image).toBeTruthy();
  });

  it('should call onPokemonPress when TouchableOpacity is pressed', () => {
    const { getByTestId } = render(
      <Box
        boxBg={COLORS.grass}
        svg="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/1.gif?raw=true"
        name="Bulbasaur"
        number="#001"
        types={[PokemonTypes.Grass, PokemonTypes.Poison]}
        onPokemonPress={mockOnPokemonPress}
        id={1}
      />,
    );

    fireEvent(getByTestId('Bulbasaur-#001'), 'pressIn');
    expect(mockOnPokemonPress).toHaveBeenCalledWith(1);
  });
});
