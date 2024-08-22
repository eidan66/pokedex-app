import { ImageStyle, StyleProp } from 'react-native';

import { PokedexResponse } from '../../../types';

export interface PokedexPokemon extends PokedexResponse {
  size?: { width?: number; height?: number };
  imageStyle?: StyleProp<ImageStyle>;
}
