import { render } from '@testing-library/react-native';
import React from 'react';

import { Items } from './Items';

describe('Items', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Items />);
    expect(getByText('Items')).toBeTruthy();
  });
});
