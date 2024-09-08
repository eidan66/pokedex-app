import { render } from '@testing-library/react-native';
import React from 'react';

import { RightArrow } from './RightArrow';
import { COLORS } from '../../constants/colors';

describe('RightArrow', () => {
  it('renders the RightArrow icon with default color', () => {
    const { getByTestId } = render(<RightArrow />);
    const icon = getByTestId('right-arrow-icon');
    expect(icon.props.style[0].color).toBe(COLORS.gray);
  });

  it('renders the RightArrow icon with provided color', () => {
    const { getByTestId } = render(<RightArrow color="red" />);
    const icon = getByTestId('right-arrow-icon');
    expect(icon.props.style[0].color).toBe('red');
  });
});
