import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { GoBack } from './GoBack';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('GoBack', () => {
  const mockGoBack = jest.fn();
  const mockCanGoBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({
      goBack: mockGoBack,
      canGoBack: mockCanGoBack,
    });
  });

  it('does not render the GoBack icon when canGoBack is false', () => {
    mockCanGoBack.mockReturnValue(false);
    const { queryByTestId } = render(<GoBack />);
    expect(queryByTestId('go-back-icon')).toBeNull();
  });

  it('renders the GoBack icon when canGoBack is true', () => {
    mockCanGoBack.mockReturnValue(true);
    const { getByTestId } = render(<GoBack />);
    expect(getByTestId('go-back-icon')).toBeTruthy();
  });

  it('calls goBack when icon is pressed', () => {
    mockCanGoBack.mockReturnValue(true);
    const { getByTestId } = render(<GoBack />);
    fireEvent(getByTestId('go-back-icon'), 'pressIn'); // Use pressIn
    expect(mockGoBack).toHaveBeenCalled();
  });
});
