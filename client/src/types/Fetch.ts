import { ColorValue } from 'react-native';
import { PokemonTypes } from './PokemonTypes';

interface ResultsResponse {
  boxBg: ColorValue;
  pokemonName: string;
  pokemonNumber: number;
  pokemonSvg: string;
  pokemonTypes: PokemonTypes;
}

export interface FetchResponse {
  count?: number;
  next?: string;
  results?: ResultsResponse[];
}
