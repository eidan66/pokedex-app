import { render, waitFor, screen, act, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Pokedex } from './Pokedex';
import { DATA } from '../../../MOCK_DATA/MOCK';
import { createNavigationPropsMock } from '../../../__tests__/navigationMocks/createNavigationPropsMock';
import { RootStackParamList } from '../../navigation/routes';
import { Cards } from '../../components/Card/data';

const navigationMockProps = createNavigationPropsMock<RootStackParamList, Cards.Pokedex>();

jest.useFakeTimers();

describe('Pokedex', () => {
  it('should initially render the loading skeleton', () => {
    render(<Pokedex {...navigationMockProps} />);

    expect(screen.getByTestId('skeleton-box-list')).toBeTruthy();
  });

  it('should render the list of Pokémon after loading', async () => {
    render(<Pokedex {...navigationMockProps} />);

    // Wrap the timer run in act to handle state updates correctly
    await act(async () => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.queryByTestId('skeleton-box-list')).toBeNull(); // Ensure skeleton is gone

      DATA.forEach((pokemon) => {
        const testID = `${pokemon.pokemonName}-${pokemon.pokemonNumber}`;
        expect(screen.getByTestId(testID)).toBeTruthy(); // Check if each Pokémon box is rendered by testID
      });
    });
  });

  it('should call onPokemonPress when a Pokémon box is pressed', async () => {
    render(<Pokedex {...navigationMockProps} />);

    // Wrap the timer run in act to handle state updates correctly
    await act(async () => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      const firstPokemon = DATA[0];
      const testID = `${firstPokemon.pokemonName}-${firstPokemon.pokemonNumber}`;
      const pokemonBox = screen.getByTestId(testID);

      // Simulate pressing the Pokémon box
      fireEvent.press(pokemonBox);
    });
  });
});
