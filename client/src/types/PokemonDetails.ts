// About Section
export interface About {
  species: string;
  height: number; // in decimeters
  weight: number; // in hectograms
  abilities: Ability[];
  gender: GenderRatio;
  eggGroups: string[];
  eggCycle: string;
}

export interface Ability {
  name: string;
  isHidden: boolean;
}

export interface GenderRatio {
  male: number; // Percentage, e.g., 87.5
  female: number; // Percentage, e.g., 12.5
}

// Base Stats Section
export interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
}

// Evolutions Section
export interface Evolution {
  name: string;
  level: number;
  imageUrl: string;
}

// Mega Evolutions Section
export interface MegaEvolution {
  name: string;
  ability: string;
  type: string[];
  baseStats: BaseStats;
  imageUrl: string;
}

// Moves Section
export interface Move {
  name: string;
  type: string;
  power: number;
  accuracy: number;
  levelLearnedAt: number;
}

// Main Pokémon Data Interface
export interface PokemonData {
  id: number;
  name: string;
  types: string[];
  about: About;
  baseStats: BaseStats;
  evolutions: Evolution[];
  megaEvolutions?: MegaEvolution[];
  moves: Move[];
}
