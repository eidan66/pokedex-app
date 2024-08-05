import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { Providers } from './src/providers';

import { SplashScreen } from './src/components/SplashScreen';
import { COLORS } from './src/constants/colors';

import { Homepage } from './src/pages';

function App() {
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1750);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Providers>
        <SplashScreen onFinish={() => setIsLoading(false)} />
      </Providers>
    );
  }

  return (
    <Providers>
      <SafeAreaView style={styles.container}>
        <Homepage />
      </SafeAreaView>
    </Providers>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  cardsContainer: {},
  br: {
    borderWidth: 1,
    borderColor: COLORS.black,
    height: 0,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

let AppEntryPoint = App;

// @ts-ignore
if (process.env.STORYBOOK_ENABLED) {
  AppEntryPoint = require('./.ondevice').default;
}

export default AppEntryPoint;
