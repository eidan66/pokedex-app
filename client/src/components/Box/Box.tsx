import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PokeballSvg from '../../../assets/svg/pokeballSvg.svg';
import { COLORS } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { PokedexPokemon } from '../../pages/Pokedex/types';
import { PokemonTypes } from '../../types';
import { capitalizeFirstLetter } from '../../utils/capitalize';
import { TypeBox } from '../TypeBox';

interface BoxProps extends PokedexPokemon {
  onPokemonPress: (id: number) => void;
}

export const Box: FunctionComponent<BoxProps> = ({
  boxBg: backgroundColor,
  gif,
  name,
  number,
  id,
  types,
  size,
  imageStyle = {},
  onPokemonPress,
}) => {
  const boxBg = backgroundColor || COLORS[types[0].toLowerCase() as Lowercase<PokemonTypes>];

  const renderTypes = (pokemonType: PokemonTypes, index: number) => (
    <View key={`${pokemonType}${index}`}>
      <TypeBox bg={boxBg} typeName={pokemonType} />
    </View>
  );

  const hasTwoTypes = types?.length === 2;

  return (
    <TouchableOpacity onPressIn={() => onPokemonPress(id)} testID={`${name}-${number}`} delayPressIn={800}>
      <View style={[styles.container, { backgroundColor: `${boxBg}${COLORS['0.8']}` }]}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.name}>{capitalizeFirstLetter(name)}</Text>
            <Text style={styles.pokemonNumber}>{number}</Text>
          </View>
          <View style={styles.types}>{types?.map((pokemonType, index) => renderTypes(pokemonType, index))}</View>
          <View style={styles.pokeImgContainer}>
            <PokeballSvg
              style={hasTwoTypes ? styles.pokeball : styles.singlePokeballType}
              fill={`${COLORS.white}${COLORS['0.2']}`}
              testID="pokeball-svg"
            />
            <Image
              style={[hasTwoTypes ? styles.image : styles.singleImageType, imageStyle]}
              source={{ uri: gif }}
              resizeMode="contain"
              width={size?.width || 80}
              height={size?.height || 70}
              testID="pokemon-image"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
