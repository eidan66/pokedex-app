import { render } from '@testing-library/react-native';
import React from 'react';

import { TypeCharts } from './TypeCharts';

describe('TypeCharts', () => {
  it('renders correctly', () => {
    const { getByText } = render(<TypeCharts />);
    expect(getByText('TypeCharts')).toBeTruthy();
  });
});
