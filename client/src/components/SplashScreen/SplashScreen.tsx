import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import React, { FunctionComponent, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { RootStackParamList } from '../../navigation/routes';
import { RootStackTypes } from '../../navigation/routes/types';

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, RootStackTypes.SplashScreen>;

const { height } = Dimensions.get('window');

export const SplashScreen: FunctionComponent<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(RootStackTypes.Homepage);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container} testID="splash-container">
      <Image source={require('../../../assets/Pokedex_logo.png')} testID="splash-logo" />
      <LottieView
        style={styles.lottie}
        testID="splash-lottie"
        source={require('../../../assets/pokemonLottie.json')}
        autoPlay
        loop
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
