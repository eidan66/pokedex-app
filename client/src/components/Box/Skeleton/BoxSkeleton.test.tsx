import React from 'react';
import { render } from '@testing-library/react-native';
import { BoxSkeleton } from './BoxSkeleton';

describe('BoxSkeleton', () => {
  it('renders skeleton elements correctly', () => {
    const { getByTestId } = render(<BoxSkeleton />);

    expect(getByTestId('skeleton-text')).toBeTruthy();
    expect(getByTestId('small-skeleton-text')).toBeTruthy();
    expect(getByTestId('skeleton-type-0')).toBeTruthy();
    expect(getByTestId('skeleton-type-1')).toBeTruthy();
    expect(getByTestId('skeleton-image')).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const tree = render(<BoxSkeleton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
