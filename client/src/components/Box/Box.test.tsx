import React from 'react';
import { render } from '@testing-library/react-native';
import { Box } from './Box';
import { PokemonTypes } from '../../types';
import { COLORS } from '../../constants/colors';

describe('Box component', () => {
  it('renders correctly with given props', () => {
    const { getByText, getByTestId } = render(
      <Box
        boxBg={COLORS.grass}
        pokemonSvg="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/1.gif?raw=true"
        pokemonName="Bulbasaur"
        pokemonNumber="#001"
        pokemonTypes={[PokemonTypes.Grass, PokemonTypes.Poison]}
      />,
    );

    expect(getByText('Bulbasaur')).toBeTruthy();
    expect(getByText('#001')).toBeTruthy();
    expect(getByText('Grass')).toBeTruthy();
    expect(getByText('Poison')).toBeTruthy();
    const image = getByTestId('pokemon-image');
    expect(image).toBeTruthy();
  });
});
