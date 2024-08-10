import { FunctionComponent, PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import { useNavigationContainerRef } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import store from '../redux/store/store';
import { COLORS } from '../constants/colors';

export const Providers: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const navigationRef = useNavigationContainerRef();

  useReduxDevToolsExtension(navigationRef);

  return (
    <SafeAreaProvider style={styles.container}>
      <ReduxProvider store={store}>
        <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>
      </ReduxProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: COLORS.white,
  },
});
