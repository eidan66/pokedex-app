import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native';

import { Box } from './src/components/Box';
import { SplashScreen } from './src/components/SplashScreen';
import { CARD_DATA, DATA } from './MOCK_DATA/MOCK';
import { Card } from './src/components/Card';
import { COLORS } from './src/constants/colors';

function App() {
  const renderItem = ({ item }) => <Box {...item} />;
  const renderCardItem = ({ item }) => <Card {...item} />;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1750); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={CARD_DATA}
        renderItem={renderCardItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      {/* <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      /> */}
    </SafeAreaView>
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

if (process.env.STORYBOOK_ENABLED) {
  AppEntryPoint = require('./.ondevice').default;
}

export default AppEntryPoint;
