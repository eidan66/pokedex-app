import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';

import store from '../redux/store/store';

export const navigationRef = createNavigationContainerRef();

export const Providers: FunctionComponent<PropsWithChildren> = ({ children }) => {
  useReduxDevToolsExtension(navigationRef);

  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>
      </ReduxProvider>
    </SafeAreaProvider>
  );
};
