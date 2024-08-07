import { FlatList, Image, ImageStyle, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FunctionComponent } from 'react';

import PokeballSvg from '../../../assets/svg/pokeballSvg.svg';
import { COLORS } from '../../constants/colors';
import { PokemonTypes } from '../../types';
import { Fonts } from '../../constants/fonts';
import { TypeBox } from '../TypeBox';
import { capitalizeFirstLetter } from '../../utils/capitalize';

interface BoxProps {
  boxBg?: string;
  pokemonSvg: string;
  pokemonName: string;
  pokemonNumber: string;
  pokemonTypes: PokemonTypes[];
  size?: { width?: number; height?: number };
  imageStyle?: ImageStyle;
}

export const Box: FunctionComponent<BoxProps> = ({
  boxBg = COLORS.normal,
  pokemonSvg,
  pokemonName,
  pokemonNumber,
  pokemonTypes,
  size,
  imageStyle = {},
}) => {
  const renderTypes = (pokemonType: PokemonTypes, index: number) => (
    <View key={`${pokemonType}${index}`}>
      <TypeBox bg={boxBg} typeName={pokemonType} />
    </View>
  );

  const hasTwoTypes = pokemonTypes.length === 2;

  return (
    <View style={[styles.container, { backgroundColor: `${boxBg}${COLORS['0.8']}` }]}>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{capitalizeFirstLetter(pokemonName)}</Text>
          <Text style={styles.pokemonNumber}>{pokemonNumber}</Text>
        </View>
        <View style={styles.types}>{pokemonTypes.map((pokemonType, index) => renderTypes(pokemonType, index))}</View>
        <View style={styles.pokeImgContainer}>
          <PokeballSvg
            style={hasTwoTypes ? styles.pokeball : styles.singlePokeballType}
            fill={`${COLORS.white}${COLORS['0.2']}`}
            testID="pokeball-svg"
          />
          <Image
            style={[hasTwoTypes ? styles.image : styles.singleImageType, imageStyle]}
            source={{ uri: pokemonSvg }}
            resizeMode="contain"
            width={size?.width || 80}
            height={size?.height || 70}
            testID="pokemon-image"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    borderRadius: 10,
    height: 150,
    padding: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 8,
    // TODO: Fix fonts later...
    // fontFamily: Fonts.GeneraSemiBold,
  },
  pokemonNumber: {
    fontFamily: Fonts.PokemonHollowSolid,
    fontSize: 18,
    color: COLORS.white + COLORS['0.6'],
    letterSpacing: 1.5,
  },
  pokeImgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    left: 50,
    bottom: 40,
  },
  pokeball: {
    position: 'absolute',
    left: 90,
    bottom: -30,
  },
  singleImageType: {
    left: 50,
    bottom: 10,
  },
  singlePokeballType: {
    position: 'absolute',
    left: 90,
  },
  types: {
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});
