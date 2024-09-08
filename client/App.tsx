import React from 'react';

import { RootNavigator } from './src/navigation/routes';
import { Providers } from './src/providers';

const App = () => (
  <Providers>
    <RootNavigator />
  </Providers>
);

let AppEntryPoint = App;

// @ts-expect-error storybook problem
if (process.env.STORYBOOK_ENABLED) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  AppEntryPoint = require('./.ondevice').default;
}

export default AppEntryPoint;
