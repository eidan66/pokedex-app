import { COLORS } from '../../constants/colors';

export enum Cards {
  Pokedex = 'Pokédex',
  Moves = 'Moves',
  Abilities = 'Abilities',
  Items = 'Items',
  Locations = 'Locations',
  TypeCharts = 'Type Charts',
}

export const CARDS_DATA = [
  {
    title: Cards.Pokedex,
    background: COLORS.grass,
  },
  {
    title: Cards.Moves,
    background: COLORS.fire,
  },
  {
    title: Cards.Abilities,
    background: COLORS.water,
  },
  {
    title: Cards.Items,
    background: COLORS.electric,
  },
  {
    title: Cards.Locations,
    background: COLORS.poison,
  },
  {
    title: Cards.TypeCharts,
    background: COLORS.dark,
  },
];
