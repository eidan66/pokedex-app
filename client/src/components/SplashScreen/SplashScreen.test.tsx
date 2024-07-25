import React from 'react';
import { render, act } from '@testing-library/react-native';
import SplashScreen from './SplashScreen';

jest.mock('lottie-react-native', () => 'LottieView');

describe('SplashScreen', () => {
  jest.useFakeTimers();

  it('should render correctly', () => {
    const onFinish = jest.fn();
    const { getByTestId } = render(<SplashScreen onFinish={onFinish} />);

    expect(getByTestId('splash-container')).toBeTruthy();
    expect(getByTestId('splash-logo')).toBeTruthy();
    expect(getByTestId('splash-lottie')).toBeTruthy();
  });

  it('should call onFinish after the timeout', () => {
    const onFinish = jest.fn();
    render(<SplashScreen onFinish={onFinish} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('should call onFinish when Lottie animation finishes', () => {
    const onFinish = jest.fn();
    const { getByTestId } = render(<SplashScreen onFinish={onFinish} />);

    act(() => {
      getByTestId('splash-lottie').props.onAnimationFinish();
    });

    expect(onFinish).toHaveBeenCalledTimes(1);
  });
});
