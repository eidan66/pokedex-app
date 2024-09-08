// client/__tests__/jest.setup.js
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

// Mocking navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
      goBack: jest.fn(),
      canGoBack: jest.fn(),
      replace: jest.fn(),
    }),
  };
});

// Mocking Lottie animation
jest.mock('lottie-react-native', () => 'MockedLottieView');

jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
    SafeAreaConsumer: jest.fn().mockImplementation(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
  };
});
