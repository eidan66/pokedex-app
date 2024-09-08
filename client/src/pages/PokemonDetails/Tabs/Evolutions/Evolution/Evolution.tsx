import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import PokeballSvg from '../../../../../../assets/svg/pokeballSvg.svg';
import { COLORS } from '../../../../../constants/colors';

interface EvolutionProps {
  uri: string;
}

export const Evolution: FunctionComponent<EvolutionProps> = ({ uri }) => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{
          uri,
        }}
        resizeMode="contain"
        width={90}
        height={90}
        testID="pokemon-image"
      />
      <PokeballSvg
        style={styles.pokeball}
        fill={`${COLORS.black}${COLORS['0.1']}`}
        testID="pokeball-svg"
        width={90}
        height={90}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  pokeball: {
    position: 'absolute',
    zIndex: 1,
  },
  imageContainer: {
    zIndex: 99,
  },
  image: {
    zIndex: 10,
  },
});
