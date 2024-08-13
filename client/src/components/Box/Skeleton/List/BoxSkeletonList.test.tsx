import React from 'react';
import { render } from '@testing-library/react-native';

import { BoxSkeletonList } from './BoxSkeletonList';

describe('BoxSkeletonList', () => {
  it('renders 10 BoxSkeleton components', () => {
    const { getAllByTestId } = render(<BoxSkeletonList />);
    const skeletons = getAllByTestId('skeleton-box');

    expect(skeletons.length).toBe(10);
  });

  it('matches the snapshot', () => {
    const tree = render(<BoxSkeletonList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
