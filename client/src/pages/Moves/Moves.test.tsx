import { render } from '@testing-library/react-native';
import React from 'react';

import { Moves } from './Moves';

describe('Moves', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Moves />);
    expect(getByText('Moves')).toBeTruthy();
  });
});
