import React, { FunctionComponent, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import LottieView from 'lottie-react-native';

import { COLORS } from '../../constants/colors';

interface SplashScreenProps {
  onFinish: () => void;
}

const { height } = Dimensions.get('window');

export const SplashScreen: FunctionComponent<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/Pokédex_logo.png')} />
      <LottieView
        style={styles.lottie}
        source={require('./pokemonLottie.json')}
        autoPlay
        loop
        onAnimationFinish={onFinish}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 300,
    height: height * 0.5, // Adjust the height as needed
  },
});

export default SplashScreen;
