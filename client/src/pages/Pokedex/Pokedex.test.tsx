import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import fetchMock from 'jest-fetch-mock';
import React from 'react';

import { Pokedex } from './Pokedex';
import { createNavigationPropsMock } from '../../../__tests__/navigationMocks/createNavigationPropsMock';
import { Cards } from '../../components/Card/data';
import { RootStackParamList } from '../../navigation/routes';

const navigationMockProps = createNavigationPropsMock<RootStackParamList, Cards.Pokedex>();

jest.useFakeTimers();
jest.setTimeout(10000); // Set a longer timeout for the tests

describe('Pokedex', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should initially render the loading skeleton', () => {
    render(<Pokedex {...navigationMockProps} />);
    expect(screen.getByTestId('skeleton-box-list')).toBeTruthy();
  });

  it('should render the list of Pokémon after loading', async () => {
    // Mock a successful fetch response
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            name: 'Bulbasaur',
            number: '001',
          },
        ],
        next: null,
      }),
    );

    render(<Pokedex {...navigationMockProps} />);

    await waitFor(() => {
      expect(screen.queryByTestId('skeleton-box-list')).toBeNull(); // Ensure skeleton is gone

      // Check if the first Pokémon is rendered by its testID
      const testID = 'Bulbasaur-001';
      expect(screen.getByTestId(testID)).toBeTruthy();
    });
  });

  it('should call onPokemonPress when a Pokémon box is pressed', async () => {
    // Mock a successful fetch response
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            name: 'Bulbasaur',
            number: '001',
          },
        ],
        next: null,
      }),
    );

    render(<Pokedex {...navigationMockProps} />);

    await waitFor(() => {
      const firstPokemon = { name: 'Bulbasaur', number: '001' };
      const testID = `${firstPokemon.name}-${firstPokemon.number}`;
      const pokemonBox = screen.getByTestId(testID);

      // Simulate pressing the Pokémon box
      fireEvent(pokemonBox, 'pressIn');
      expect(navigationMockProps.navigation.navigate).toHaveBeenCalled();
    });
  });
});
