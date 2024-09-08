import { render } from '@testing-library/react-native';
import React from 'react';

import { Locations } from './Locations';

describe('Locations', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Locations />);
    expect(getByText('Locations')).toBeTruthy();
  });
});
