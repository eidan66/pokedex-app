import { PokemonTypes } from './PokemonTypes';

export interface PokedexResponse {
  id: number;
  name: string;
  number: string;
  types: PokemonTypes[];
  boxBg: string;
  gif: string;
  error?: null | Error;
}

export interface FetchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokedexResponse[];
}
