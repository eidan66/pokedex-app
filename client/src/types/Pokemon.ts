// Subtype for Pokemon's Ability
export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

// Subtype for Pokemon's Move
export interface Move {
  move: {
    name: string;
    url: string;
  };
}

// Subtype for Pokemon's Stat
export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

// Subtype for Pokemon's Type
export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// Subtype for Pokemon's Sprites
export interface Sprites {
  front_default: string;
}

// Main Pokemon type
export interface Pokemon {
  name: string;
  url: string;
}

// Detailed Pokemon type combining all subtypes
export interface PokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: Sprites;
  types: Type[];
  abilities: Ability[];
  stats: Stat[];
  moves: Move[];
}
