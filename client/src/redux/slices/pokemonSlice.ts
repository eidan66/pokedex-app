/**
 * Temp file just for initialize Redux flow.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  pokemons: string[]; // A simple list of Pokémon names for this basic example
}

const initialState: PokemonState = {
  pokemons: [],
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<string[]>) => {
      state.pokemons = action.payload;
    },
  },
});

export const { setPokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer;
