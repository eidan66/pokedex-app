import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

import { SplashScreen } from './SplashScreen';
import { createNavigationPropsMock } from '../../../__tests__/navigationMocks/createNavigationPropsMock';
import { RootStackParamList } from '../../navigation/routes';
import { RootStackTypes } from '../../navigation/routes/types';

jest.useFakeTimers();

const navigationMockProps = createNavigationPropsMock<RootStackParamList, RootStackTypes.SplashScreen>();

describe('SplashScreen', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<SplashScreen {...navigationMockProps} />);

    expect(getByTestId('splash-container')).toBeTruthy();
    expect(getByTestId('splash-logo')).toBeTruthy();
    expect(getByTestId('splash-logo')).toBeTruthy();
    expect(getByTestId('splash-lottie')).toBeTruthy();
  });

  it('should call navigation.replace after the timeout', async () => {
    render(<SplashScreen {...navigationMockProps} />);

    await waitFor(() => {
      jest.runAllTimers(); // Fast-forward the timers
    });

    expect(navigationMockProps.navigation.replace).toHaveBeenCalledWith(RootStackTypes.Homepage);
  });

  it('should call navigation.replace when Lottie animation finishes', async () => {
    const { getByTestId } = render(<SplashScreen {...navigationMockProps} />);

    // Simulate the onAnimationFinish event
    await waitFor(() => {
      fireEvent(getByTestId('splash-lottie'), 'onAnimationFinish');
    });

    expect(navigationMockProps.navigation.replace).toHaveBeenCalledWith(RootStackTypes.Homepage);
  });
});
