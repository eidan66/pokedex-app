import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SearchBar } from './SearchBar'; // Adjust the path if necessary

describe('SearchBar Component', () => {
  it('should render correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SearchBar />);

    // Check if the title is rendered
    expect(getByText('What Pokemon are you looking for?')).toBeTruthy();

    // Check if the search bar is rendered
    expect(getByPlaceholderText('Type Pokemon,Move,Ability etc...')).toBeTruthy();
  });

  it('should update search state on text input', async () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    const searchBar = getByPlaceholderText('Type Pokemon,Move,Ability etc...');

    // Simulate typing into the search bar
    fireEvent.changeText(searchBar, 'Pikachu');

    // Check if the search bar value is updated
    await waitFor(() => {
      expect(searchBar.props.value).toBe('Pikachu');
    });
  });
});
