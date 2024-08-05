import { FunctionComponent, PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import store from '../redux/store/store';

export const Providers: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <ReduxProvider store={store}>{children}</ReduxProvider>
);
