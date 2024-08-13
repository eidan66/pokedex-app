import { ImageStyle, StyleProp } from 'react-native';

import { PokemonTypes } from '../../../types';

export interface PokedexPokemon {
  pokemonName: string;
  pokemonNumber: string;
  pokemonTypes: PokemonTypes[];
  boxBg: string;
  pokemonSvg: string;
  size?: { width?: number; height?: number };
  imageStyle?: StyleProp<ImageStyle>;
}
