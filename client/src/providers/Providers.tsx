import { FunctionComponent, PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import store from '../redux/store/store';

export const Providers: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <SafeAreaProvider>
    <ReduxProvider store={store}>{children}</ReduxProvider>
  </SafeAreaProvider>
);
