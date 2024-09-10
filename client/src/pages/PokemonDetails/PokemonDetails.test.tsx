import { fireEvent, render, waitFor } from '@testing-library/react-native';
import fetchMock from 'jest-fetch-mock';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PokemonDetails } from './PokemonDetails';
import { createNavigationPropsMock } from '../../../__tests__/navigationMocks/createNavigationPropsMock';
import { RootStackParamList } from '../../navigation/routes';
import { RootStackTypes } from '../../navigation/routes/types';
import { PokemonData } from '../../types/PokemonDetails';

jest.useFakeTimers();
jest.setTimeout(10000); // Set a longer timeout for the tests

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

jest.mock('lottie-react-native', () => 'LottieView');
jest.mock('../../../assets/svg/pokeballSvg.svg', () => 'PokeballSvg');

const mockPokemonData: PokemonData = {
  id: 1,
  name: 'Bulbasaur',
  number: '#001',
  types: ['grass', 'poison'],
  about: {
    species: '',
    height: 0,
    weight: 0,
    abilities: [],
    gender: {
      male: 0,
      female: 0,
    },
    eggGroups: [],
    eggCycle: '',
  },
  baseStats: {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
    total: 0,
  },
  evolutions: {
    evolutions_chain: [],
    all_from_base: false,
  },
  moves: [],
  image: 'mock-url-to-image',
};

const navigationMockProps = createNavigationPropsMock<RootStackParamList, RootStackTypes.PokemonDetails>();
type RouteMock = (typeof navigationMockProps)['route'];

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  (useSafeAreaInsets as jest.Mock).mockReturnValue({
    top: 10,
    bottom: 20,
    left: 5,
    right: 5,
  });
});

describe('PokemonDetails', () => {
  it('renders loading screen while fetching Pokémon data', () => {
    const { getByTestId } = render(
      <PokemonDetails
        {...navigationMockProps}
        route={{ params: { pokemonId: 1, backgroundColor: '#7AC74C' } } as RouteMock}
      />,
    );

    expect(getByTestId('loading-pokemon-data')).toBeTruthy();
  });

  it('renders Pokémon data after loading completes', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPokemonData));

    const { queryByTestId, getByText } = render(
      <PokemonDetails
        {...navigationMockProps}
        route={{ params: { pokemonId: 1, backgroundColor: '#7AC74C' } } as RouteMock}
      />,
    );

    expect(queryByTestId('loading-pokemon-data')).toBeTruthy();

    await waitFor(() => {
      expect(queryByTestId('loading-pokemon-data')).toBeNull();

      expect(getByText('Bulbasaur')).toBeTruthy();
      expect(queryByTestId('pokemon-image')).toBeTruthy();
    });
    expect(queryByTestId('loading-pokemon-data')).toBeNull();
  });

  it('toggles favorite icon on press', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPokemonData));

    const { getByTestId } = render(
      <PokemonDetails
        {...navigationMockProps}
        route={{ params: { pokemonId: 1, backgroundColor: '#7AC74C' } } as RouteMock}
      />,
    );

    await waitFor(() => getByTestId('heart-icon'), { timeout: 3000 });

    expect(getByTestId('heart-icon-outline')).toBeTruthy();

    fireEvent(getByTestId('heart-icon'), 'pressIn');

    await waitFor(() => {
      expect(getByTestId('heart-icon-inline')).toBeTruthy();
    });

    fireEvent(getByTestId('heart-icon'), 'pressIn');

    await waitFor(() => {
      expect(getByTestId('heart-icon-outline')).toBeTruthy();
    });
  });
});
