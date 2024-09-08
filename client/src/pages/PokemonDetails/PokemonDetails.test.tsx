import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PokemonDetails } from './PokemonDetails';
import { createNavigationPropsMock } from '../../../__tests__/navigationMocks/createNavigationPropsMock';
import { RootStackParamList } from '../../navigation/routes';
import { RootStackTypes } from '../../navigation/routes/types';

const navigationMockProps = createNavigationPropsMock<RootStackParamList, RootStackTypes.PokemonDetails>();
type RouteMock = (typeof navigationMockProps)['route'];

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

describe('PokemonDetails', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useSafeAreaInsets as jest.Mock).mockReturnValue({
      top: 10,
      bottom: 20,
      left: 5,
      right: 5,
    });
    jest.clearAllMocks();
    navigationMockProps.navigation.navigate = mockNavigate;
  });

  // I skip this test until I'll use the real API data and then I'll update this.
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('renders pokemon details with mock data', () => {
    const { getByText, getByTestId } = render(
      <PokemonDetails {...navigationMockProps} route={{ params: { pokemonId: 1 } } as RouteMock} />,
    );

    // Mock pokemonData should be set, so we expect the name and other details to show up
    expect(getByText('Bulbasaur')).toBeTruthy();
    expect(getByText('#001')).toBeTruthy();
    expect(getByTestId('pokemon-image')).toBeTruthy();
  });

  it('handles favorite icon press and animation', () => {
    const { getByTestId } = render(
      <PokemonDetails {...navigationMockProps} route={{ params: { pokemonId: 1 } } as RouteMock} />,
    );
    const favoriteIcon = getByTestId('heart-icon');

    fireEvent(favoriteIcon, 'pressIn');

    // Check that the icon switches between outlined and filled state
    expect(favoriteIcon.props.children.props.name).toBe('heart');
  });
});
