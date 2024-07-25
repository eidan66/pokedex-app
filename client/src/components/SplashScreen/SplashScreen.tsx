import React, { FunctionComponent, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
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
    <View style={styles.container} testID="splash-container">
      <Image source={require('../../../assets/Pokedex_logo.png')} testID="splash-logo" />
      <LottieView
        style={styles.lottie}
        source={require('../../../assets/pokemonLottie.json')}
        autoPlay
        loop
        onAnimationFinish={onFinish}
        testID="splash-lottie"
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
    height: height * 0.5,
  },
});

export default SplashScreen;
