import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Homepage } from './Homepage';
import { CARDS_DATA } from '../../components/Card/data';
import { setPokemons } from '../../redux/slices/pokemonSlice';
import { createNavigationPropsMock } from '../../../__tests__/navigationMocks/createNavigationPropsMock';
import { RootStackParamList } from '../../navigation/routes';
import { RootStackTypes } from '../../navigation/routes/types';

const mockStore = configureStore([]);

const store = mockStore({
  pokemon: {
    pokemons: [],
  },
});

const navigationMockProps = createNavigationPropsMock<RootStackParamList, RootStackTypes.Homepage>();

describe('Homepage', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('renders the SearchBar component', () => {
    render(
      <Provider store={store}>
        <Homepage {...navigationMockProps} />
      </Provider>,
    );

    expect(screen.getByPlaceholderText('Type Pokemon,Move,Ability etc...')).toBeTruthy();
  });

  it('dispatches fetchPokemons action on mount', () => {
    render(
      <Provider store={store}>
        <Homepage {...navigationMockProps} />
      </Provider>,
    );

    const actions = store.getActions();
    expect(actions).toContainEqual(setPokemons(['Bulbasaur', 'Ivysaur', 'Venusaur']));
  });

  it('renders cards with correct data', () => {
    render(
      <Provider store={store}>
        <Homepage {...navigationMockProps} />
      </Provider>,
    );

    CARDS_DATA.forEach((item) => {
      expect(screen.getByText(item.title)).toBeTruthy();
    });
  });

  /**
   * Skipping this test because I didn't implement navigation yet.
   */
  it.skip('calls onCardPress when a card is pressed', () => {
    render(
      <Provider store={store}>
        <Homepage {...navigationMockProps} />
      </Provider>,
    );

    CARDS_DATA.forEach((item) => {
      fireEvent.press(screen.getByText(item.title));
      expect(console.log).toHaveBeenCalledWith(`Navigate to -> ${item.title}`);
    });
  });
});
