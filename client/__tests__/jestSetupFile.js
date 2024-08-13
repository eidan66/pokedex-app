// Resume when using drawer again
// import 'react-native-gesture-handler/jestSetup';
// jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
      goBack: jest.fn(),
      replace: jest.fn(),
    }),
  };
});

jest.mock('lottie-react-native', () => {
  return function MockLottieView(props) {
    return (
      <div testID={props.testID} onAnimationFinish={props.onAnimationFinish}>
        LottieView
      </div>
    );
  };
});
