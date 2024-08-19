import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { COLORS } from './src/constants/colors';
import { RootNavigator } from './src/navigation/routes';
import { Providers } from './src/providers';

function App() {
  return (
    <Providers>
      <SafeAreaView style={styles.container}>
        <RootNavigator />
      </SafeAreaView>
    </Providers>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

let AppEntryPoint = App;

// @ts-expect-error storybook
if (process.env.STORYBOOK_ENABLED) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  AppEntryPoint = require('./.ondevice').default;
}

export default AppEntryPoint;
