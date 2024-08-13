import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const createNavigationPropsMock = <
  ParamList extends Record<string, object | undefined>,
  RouteName extends keyof ParamList,
>() => {
  return {
    navigation: {
      navigate: jest.fn(),
      replace: jest.fn(), // Add replace method here
      goBack: jest.fn(),
      setOptions: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      isFocused: jest.fn(),
      canGoBack: jest.fn(),
      getParent: jest.fn(),
      getState: jest.fn(),
      dispatch: jest.fn(),
      reset: jest.fn(),
    } as unknown as NativeStackNavigationProp<ParamList, RouteName>,
    route: {} as RouteProp<ParamList, RouteName>,
  };
};
