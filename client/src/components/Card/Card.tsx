import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Fonts } from '../../constants/fonts';
import PokeballSvg from '../../../assets/svg/pokeballSvg.svg';
import { COLORS } from '../../constants/colors';

interface CardProps {
  background: string;
  title: string;
  style?: StyleProp<ViewStyle>;
}

export const Card: FunctionComponent<CardProps> = ({ background, title, style }) => {
  return (
    <View style={[styles.container, { backgroundColor: background }, style]} testID="card-container">
      <Text style={styles.text}>{title}</Text>
      <View style={styles.pokeball}>
        <PokeballSvg width={70} height={70} fill={`${COLORS.white}${COLORS['0.4']}`} testID="pokeball-svg" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 60,
    flexDirection: 'row',
    padding: 5,
    borderRadius: 10,
  },
  pokeballTopLeft: {
    position: 'absolute',
    bottom: 30,
    left: -50,
  },
  pokeball: {
    position: 'absolute',
    top: -3,
    left: 93,
  },
  text: {
    fontFamily: Fonts.GeneraSemiBold,
    textAlign: 'left',
    alignSelf: 'center',
    paddingLeft: 10,
    color: COLORS.white + COLORS['0.8'],
    fontSize: 16,
  },
});

export default Card;
