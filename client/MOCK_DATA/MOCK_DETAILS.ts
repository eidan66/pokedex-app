import { PokemonData } from '../src/types/PokemonDetails';

export const mockPokemonData: PokemonData = {
  id: 6,
  name: 'charizard',
  types: ['Fire', 'Flying'],
  about: {
    species: 'Flame Pokémon',
    height: 17, // decimetres (1.7m)
    weight: 905, // hectograms (90.5kg)
    abilities: [
      { name: 'Blaze', isHidden: false },
      { name: 'Solar Power', isHidden: true },
    ],
    gender: {
      male: 87.5,
      female: 12.5,
    },
    eggGroups: ['Monster', 'Dragon'],
    eggCycle: 'Steps to hatch: 5120', // (hatch_counter * 255)
  },
  baseStats: {
    hp: 78,
    attack: 84,
    defense: 78,
    specialAttack: 109,
    specialDefense: 85,
    speed: 100,
    total: 534,
  },
  evolutions: [
    {
      name: 'Charmander',
      level: 1,
      imageUrl:
        'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/4.png',
    },
    {
      name: 'Charmeleon',
      level: 16,
      imageUrl:
        'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/5.png',
    },
    {
      name: 'Charizard',
      level: 36,
      imageUrl:
        'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/6.png',
    },
  ],
  megaEvolutions: [
    {
      name: 'Mega Charizard X',
      ability: 'Tough Claws',
      type: ['Fire', 'Dragon'],
      baseStats: {
        hp: 78,
        attack: 130,
        defense: 111,
        specialAttack: 130,
        specialDefense: 85,
        speed: 100,
        total: 634,
      },
      imageUrl:
        'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/10034.png',
    },
    {
      name: 'Mega Charizard Y',
      ability: 'Drought',
      type: ['Fire', 'Flying'],
      baseStats: {
        hp: 78,
        attack: 104,
        defense: 78,
        specialAttack: 159,
        specialDefense: 115,
        speed: 100,
        total: 634,
      },
      imageUrl:
        'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/10035.png',
    },
  ],
  moves: [
    {
      name: 'Flamethrower',
      type: 'Fire',
      power: 90,
      accuracy: 100,
      levelLearnedAt: 46,
    },
    {
      name: 'Dragon Claw',
      type: 'Dragon',
      power: 80,
      accuracy: 100,
      levelLearnedAt: 1,
    },
    {
      name: 'Air Slash',
      type: 'Flying',
      power: 75,
      accuracy: 95,
      levelLearnedAt: 62,
    },
    {
      name: 'Solar Beam',
      type: 'Grass',
      power: 120,
      accuracy: 100,
      levelLearnedAt: 56,
    },
  ],
};
