import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { Providers } from './src/providers';

import { SplashScreen } from './src/components/SplashScreen';
import { COLORS } from './src/constants/colors';

import { Homepage } from './src/pages';
import { FetchResponse } from './src/types';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<FetchResponse>({});

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/pokemons');
      if (!response.ok) {
        throw new Error(`response error -> ${response.status}`);
      }

      const jsonData = (await response.json()) as FetchResponse;

      setApiData(jsonData);
    } catch (error) {
      console.log('[TEMP] log -  fetchData  error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('apiData', { apiData });
  }, [apiData]);

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
        <Homepage pokemodList={apiData.results} />
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
