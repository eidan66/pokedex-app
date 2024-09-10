import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import fetchMock from 'jest-fetch-mock';
import React from 'react';

import { Pokedex } from './Pokedex';
import { createNavigationPropsMock } from '../../../__tests__/navigationMocks/createNavigationPropsMock';
import { Cards } from '../../components/Card/data';
import { RootStackParamList } from '../../navigation/routes';
import { FetchResponse, PokemonTypes } from '../../types';
import { capitalizeFirstLetter } from '../../utils/capitalize';

jest.useFakeTimers();
jest.setTimeout(10000); // Set a longer timeout for the tests

const mockObject: FetchResponse = {
  count: 1234,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      name: 'Bulbasaur',
      number: '#001',
      types: [PokemonTypes.Grass, PokemonTypes.Poison],
      boxBg: '#7AC74C',
      gif: 'https://github.com/eidan66/pokemon-api-sprites/blob/master/sprites/pokemon/other/showdown/1.gif?raw=true',
      error: null,
    },
  ],
};

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});
describe('Pokedex', () => {
  const navigationMockProps = createNavigationPropsMock<RootStackParamList, Cards.Pokedex>();
  const upperCaseName = capitalizeFirstLetter(mockObject.results[0].name);

  it('should initially render the loading skeleton', () => {
    render(<Pokedex {...navigationMockProps} />);

    expect(screen.getByTestId('skeleton-box-list')).toBeTruthy();
  });

  it('fetches and renders Pokémon correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockObject));

    const { getByText, getByTestId } = render(<Pokedex {...navigationMockProps} />);

    await waitFor(() => expect(getByText(upperCaseName)).toBeTruthy());
    expect(getByText('#001')).toBeTruthy();

    const gifElement = getByTestId(`pokemon-gif-${mockObject.results[0].id}`);

    expect(gifElement).toBeTruthy();
    expect(gifElement.props.source.uri).toBe(mockObject.results[0].gif);
  });

  it('triggers navigation to the Pokémon details screen on item press', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockObject));

    const { getByText } = render(<Pokedex {...navigationMockProps} />);

    await waitFor(() => expect(getByText(upperCaseName)).toBeTruthy());

    fireEvent(getByText(upperCaseName), 'pressIn');

    expect(navigationMockProps.navigation.navigate).toHaveBeenCalledWith('PokemonDetails', {
      pokemonId: 1,
      backgroundColor: '#7AC74C',
    });
  });
});
