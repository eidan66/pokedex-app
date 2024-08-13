export interface APIPageResponse<T> {
    count: number,
    next:string | null | undefined,
    previous: string | null | undefined, 
    results: T[]
}

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


export interface APIPokemon {
    id: number,
    name: string, 
    number: string, 
    types: APIPokemonType[], 
    boxBg: string, 
    svg: string
}