import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { FunctionComponent, PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';

import { COLORS } from '../constants/colors';
import store from '../redux/store/store';

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
