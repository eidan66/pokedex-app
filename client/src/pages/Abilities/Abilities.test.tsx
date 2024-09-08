import { render } from '@testing-library/react-native';
import React from 'react';

import { Abilities } from './Abilities';

describe('ExampleComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Abilities />);
    expect(getByText('Abilities')).toBeTruthy();
  });
});
