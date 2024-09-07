import { PokemonTypes } from './PokemonTypes';

export interface PokedexResponse {
  id: number;
  name: string;
  number: string;
  types: PokemonTypes[];
  boxBg: string;
  svg: string;
}

export interface FetchResponse {
  count: number;
  next: string;
  results: PokedexResponse[];
}