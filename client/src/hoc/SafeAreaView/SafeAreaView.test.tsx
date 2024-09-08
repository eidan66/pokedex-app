import { render } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SafeAreaView } from './SafeAreaView';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

describe('SafeAreaView', () => {
  beforeEach(() => {
    (useSafeAreaInsets as jest.Mock).mockReturnValue({
      top: 10,
      bottom: 20,
      left: 5,
      right: 5,
    });
  });

  it('applies safe area insets as padding', () => {
    const { getByTestId } = render(
      <SafeAreaView>
        <View testID="content" />
      </SafeAreaView>,
    );

    const container = getByTestId('safe-area-container');
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          paddingTop: 10,
          paddingLeft: 5,
          paddingRight: 5,
        }),
      ]),
    );
  });

  it('applies custom container and bottom styles', () => {
    const { getByTestId } = render(
      <SafeAreaView containerStyle={{ backgroundColor: 'blue' }} bottomStyle={{ backgroundColor: 'red' }}>
        <View testID="content" />
      </SafeAreaView>,
    );

    const container = getByTestId('safe-area-container');
    const bottom = getByTestId('safe-area-bottom');

    expect(container.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: 'blue' })]),
    );
    expect(bottom.props.style).toEqual(expect.arrayContaining([expect.objectContaining({ backgroundColor: 'red' })]));
  });
});
