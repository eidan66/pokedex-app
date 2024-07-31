export const COLORS = {
    black: '#000000',
    white: '#ffffff',
  
    // Pokemon types colors
    bug: '#A6B91A',
    dark: '#705746',
    dragon: '#6F35FC',
    electric: '#F7D02C',
    fairy: '#D685AD',
    fighting: '#C22E28',
    fire: '#EE8130',
    flying: '#A98FF3',
    ghost: '#735797',
    grass: '#7AC74C',
    ground: '#E2BF65',
    ice: '#96D9D6',
    normal: '#A8A77A',
    poison: '#A33EA1',
    psychic: '#F95587',
    rock: '#B6A136',
    steel: '#B7B7CE',
    water: '#6390F0',
  
    // Opacity
    '0.1': '1a',
    '0.2': '33',
    '0.3': '4d',
    '0.4': '66',
    '0.5': '80',
    '0.6': '99',
    '0.7': 'b3',
    '0.8': 'cc',
    '0.9': 'e6',
  };

  export enum PokemonTypes {
    Bug = 'Bug',
    Dark = 'Dark',
    Dragon = 'Dragon',
    Electric = 'Electric',
    Fairy = 'Fairy',
    Fighting = 'Fighting',
    Fire = 'Fire',
    Flying = 'Flying',
    Ghost = 'Ghost',
    Grass = 'Grass',
    Ground = 'Ground',
    Ice = 'Ice',
    Normal = 'Normal',
    Poison = 'Poison',
    Psychic = 'Psychic',
    Rock = 'Rock',
    Steel = 'Steel',
    Water = 'Water',
  }

export default [
    {
      pokemonName: 'Bulbasaur',
      pokemonNumber: '#001',
      pokemonTypes: [PokemonTypes.Grass, PokemonTypes.Poison],
      boxBg: COLORS.grass,
      pokemonSvg: 'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/1.gif?raw=true',
      size: {},
    },
    {
      pokemonName: 'Ivysaur',
      pokemonNumber: '#002',
      pokemonTypes: [PokemonTypes.Grass, PokemonTypes.Poison],
      boxBg: COLORS.grass,
      pokemonSvg: 'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/2.gif?raw=true',
    },
    {
      pokemonName: 'Venusaur',
      pokemonNumber: '#003',
      pokemonTypes: [PokemonTypes.Grass, PokemonTypes.Poison],
      boxBg: COLORS.grass,
      pokemonSvg: 'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/3.gif?raw=true',
    },
    {
      pokemonName: 'Charmander',
      pokemonNumber: '#004',
      pokemonTypes: [PokemonTypes.Fire],
      boxBg: COLORS.fire,
      pokemonSvg: 'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/4.gif?raw=true',
    },
    {
      pokemonName: 'Charmeleon',
      pokemonNumber: '#005',
      pokemonTypes: [PokemonTypes.Fire],
      boxBg: COLORS.fire,
      pokemonSvg: 'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/5.gif?raw=true',
    },
    {
      pokemonName: 'Charizard',
      pokemonNumber: '#006',
      pokemonTypes: [PokemonTypes.Fire, PokemonTypes.Flying],
      boxBg: COLORS.fire,
      pokemonSvg: 'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/6.gif?raw=true',
      size: {
        width: 100,
        height: 150,
      },
      imageStyle: {
        bottom: 60,
      },
    },
    {
      pokemonName: 'Squirtle',
      pokemonNumber: '#007',
      pokemonTypes: [PokemonTypes.Water],
      boxBg: COLORS.water,
      pokemonSvg: 'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/7.gif?raw=true',
    },
    {
      pokemonName: 'Wartortle',
      pokemonNumber: '#008',
      pokemonTypes: [PokemonTypes.Water],
      boxBg: COLORS.water,
      pokemonSvg: 'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/8.gif?raw=true',
    },
    {
      pokemonName: 'blastoise',
      pokemonNumber: '#009',
      pokemonTypes: [PokemonTypes.Water],
      boxBg: COLORS.water,
      pokemonSvg: 'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/9.gif?raw=true',
    },
    {
      pokemonName: 'caterpie',
      pokemonNumber: '#010',
      pokemonTypes: [PokemonTypes.Bug],
      boxBg: COLORS.bug,
      pokemonSvg: 'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/10.gif?raw=true',
    },
    {
      pokemonName: 'metapod',
      pokemonNumber: '#011',
      pokemonTypes: [PokemonTypes.Bug],
      boxBg: COLORS.bug,
      pokemonSvg: 'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/11.gif?raw=true',
    },
    {
      pokemonName: 'butterfree',
      pokemonNumber: '#012',
      pokemonTypes: [PokemonTypes.Bug, PokemonTypes.Flying],
      boxBg: COLORS.bug,
      pokemonSvg: 'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/12.gif?raw=true',
    },
  ];
  
  export const CARD_DATA = [
    {
      title: 'Pokédex',
      background: COLORS.grass,
    },
    {
      title: 'Moves',
      background: COLORS.fire,
    },
    {
      title: 'Abilities',
      background: COLORS.water,
    },
    {
      title: 'Items',
      background: COLORS.electric,
    },
    {
      title: 'Locations',
      background: COLORS.poison,
    },
    {
      title: 'Type Charts',
      background: COLORS.dark,
    },
  ];

  