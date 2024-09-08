import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { Homepage } from './Homepage';
import { createNavigationPropsMock } from '../../../__tests__/navigationMocks/createNavigationPropsMock';
import { CARDS_DATA, Cards } from '../../components/Card/data';
import { RootStackParamList } from '../../navigation/routes';
import { RootStackTypes } from '../../navigation/routes/types';

const navigationMockProps = createNavigationPropsMock<RootStackParamList, RootStackTypes.Homepage>();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('Homepage', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    navigationMockProps.navigation.navigate = mockNavigate;
  });

  it('renders the SearchBar component', () => {
    const { getByTestId } = render(<Homepage {...navigationMockProps} />);

    expect(getByTestId('searchBarContainer')).toBeTruthy();
  });

  it('renders cards with correct data', () => {
    render(<Homepage {...navigationMockProps} />);

    CARDS_DATA.forEach((item) => {
      expect(screen.getByText(item.title)).toBeTruthy();
    });
  });

  it('calls onCardPress when a card is pressed', () => {
    render(<Homepage {...navigationMockProps} />);

    CARDS_DATA.forEach((item) => {
      fireEvent(screen.getByText(item.title), 'pressIn');

      const expectedScreen = item.title === Cards.Pokédex ? Cards.Pokedex : item.title;

      expect(mockNavigate).toHaveBeenCalledWith(expectedScreen);
    });
  });
});
