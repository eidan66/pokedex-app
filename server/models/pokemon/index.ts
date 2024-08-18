export enum APIPokemonType {
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

    Unknown = 'Unknown'
  }

  export const COLORS = {
    // Pokemon types colors
    Bug: '#A6B91A',
    Dark: '#705746',
    Dragon: '#6F35FC',
    Electric: '#F7D02C',
    Fairy: '#D685AD',
    Fighting: '#C22E28',
    Fire: '#EE8130',
    Flying: '#A98FF3',
    Ghost: '#735797',
    Grass: '#7AC74C',
    Ground: '#E2BF65',
    Ice: '#96D9D6',
    Normal: '#A8A77A',
    Poison: '#A33EA1',
    Psychic: '#F95587',
    Rock: '#B6A136',
    Steel: '#B7B7CE',
    Water: '#6390F0',
  } as  Record<APIPokemonType,string>;

export interface APIPokemon {
    id: number,
    name: string, 
    number: string, 
    types: APIPokemonType[], 
    boxBg: string, 
    svg: string
}