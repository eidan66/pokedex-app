import { FlatList, Image, ImageStyle, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FunctionComponent, useEffect, useState } from 'react';

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
}

export const Box: FunctionComponent<BoxProps> = ({
  boxBg = COLORS.normal,
  pokemonSvg,
  pokemonName,
  pokemonNumber,
  pokemonTypes,
}) => {
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>({ width: 100, height: 0 });

  useEffect(() => {
    Image.getSize(pokemonSvg, (width, height) => {
      const updatedWidth = width >= 100 ? 110 : width;
      const updatedHeight = height >= 100 ? 140 : height;

      setImageSize({ width: updatedWidth, height: updatedHeight });
    });
  }, []);

  const renderTypes = (pokemonType: PokemonTypes, index: number) => (
    <View key={`${pokemonType}${index}`}>
      <TypeBox bg={boxBg} typeName={pokemonType} />
    </View>
  );

  const hasTwoTypes = pokemonTypes.length === 2;
  const largeGifStyle = imageSize.width > 100 || imageSize.height > 100 ? styles.largeImage : {};

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
            style={[hasTwoTypes ? styles.image : styles.singleImageType, largeGifStyle]}
            source={{ uri: pokemonSvg }}
            resizeMode="contain"
            width={imageSize.width}
            height={imageSize.height}
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
    fontFamily: Fonts.GeneraSemiBold,
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
    left: 45,
    bottom: 40,
  },
  largeImage: {
    bottom: 60,
  },
  pokeball: {
    position: 'absolute',
    left: 90,
    bottom: -30,
  },
  singleImageType: {
    left: 45,
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
