import { render } from '@testing-library/react-native';
import React from 'react';

import { StatBar } from './StatBar';
import { COLORS } from '../../constants/colors';

describe('StatBar', () => {
  it('renders the StatBar with correct name and value', () => {
    const { getByText } = render(<StatBar name="HP" value={100} />);

    expect(getByText('HP')).toBeTruthy();
    expect(getByText('100')).toBeTruthy();
  });

  it('renders with correct background color based on value', () => {
    const { getByTestId } = render(<StatBar name="HP" value={100} />);

    const statBar = getByTestId('stat-bar');
    expect(statBar.props.style.backgroundColor).toBe(COLORS.grass);
  });

  it('animates the bar width based on value and maxValue', () => {
    const { getByTestId } = render(<StatBar name="HP" value={100} />);

    const statBar = getByTestId('stat-bar');

    expect(statBar.props.style.width).toBeDefined();
  });

  it('uses a different maxValue for the "total" stat', () => {
    const { getByTestId } = render(<StatBar name="total" value={700} />);

    const statBar = getByTestId('stat-bar');
    expect(statBar.props.style.width).toBeDefined();
  });
});
