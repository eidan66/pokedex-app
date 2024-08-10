import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { Providers } from './src/providers';

import { COLORS } from './src/constants/colors';
import { RootNavigator } from './src/navigation/routes';

function App() {
  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3000');
      if (!res.ok) {
        throw new Error(`Res error -> ${res.status}`);
      }

      console.log('[TEMP] log -  fetchData  res:', res);
    } catch (error) {
      console.log('[TEMP] log -  fetchData  error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

// @ts-ignore
if (process.env.STORYBOOK_ENABLED) {
  AppEntryPoint = require('./.ondevice').default;
}

export default AppEntryPoint;
