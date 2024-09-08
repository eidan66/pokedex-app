/* eslint-disable react/no-unstable-nested-components */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Entypo';

import { About } from './Tabs/About';
import { BaseStats } from './Tabs/BaseStats';
import { Evolutions } from './Tabs/Evolutions';
import { Moves } from './Tabs/Moves';
import PokeballSvg from '../../../assets/svg/pokeballSvg.svg';
import { mockPokemonData } from '../../../MOCK_DATA/MOCK_DETAILS';
import { GoBack } from '../../components/GoBack';
import { TypeBox } from '../../components/TypeBox';
import { COLORS } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { SafeAreaView } from '../../hoc/SafeAreaView';
import { RootStackParamList } from '../../navigation/routes';
import { RootStackTypes } from '../../navigation/routes/types';
import { PokemonTypes } from '../../types';
import { PokemonData } from '../../types/PokemonDetails';
import { capitalizeFirstLetter } from '../../utils/capitalize';

type PokemonDetailsProps = NativeStackScreenProps<RootStackParamList, RootStackTypes.PokemonDetails>;

export const PokemonDetails: FunctionComponent<PokemonDetailsProps> = ({ route: { params } }) => {
  const { pokemonId } = params || {};
  const [isFavorite, setIsFavorite] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();

  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    // Fetch or load the Pokémon data based on the pokemonId
    const fetchPokemonData = () => {
      // Replace with actual data fetching logic
      // const data: PokemonData = await getPokemonData(pokemonId);
      setPokemonData(mockPokemonData);
    };

    fetchPokemonData();
  }, [pokemonId]);

  const [routes] = useState([
    { key: 'about', title: 'About' },
    { key: 'baseStats', title: 'Base Stats' },
    { key: 'evolutions', title: 'Evolutions' },
    { key: 'moves', title: 'Moves' },
  ]);

  const renderScene = SceneMap({
    about: () => <About about={pokemonData?.about} />,
    baseStats: () => <BaseStats baseStats={pokemonData?.baseStats} />,
    evolutions: () => <Evolutions evolutions={pokemonData?.evolutions} />,
    moves: () => <Moves moves={pokemonData?.moves} />,
  });

  const animateIcon = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5, // Scale up
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1, // Scale down
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleFavorite = () => {
    animateIcon();
    setIsFavorite((prev) => !prev);
  };

  const renderTypes = (pokemonType: PokemonTypes, typeIndex: number) => (
    <View key={`${pokemonType}${typeIndex}`}>
      <TypeBox
        bg={COLORS[pokemonType.toLowerCase() as Lowercase<PokemonTypes>]}
        typeName={pokemonType}
        style={styles.type}
      />
    </View>
  );

  if (!pokemonData) {
    return (
      <View testID="loading-pokemon-data">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView containerStyle={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          barStyle={'default'}
          showHideTransition={'slide'}
          hidden
          backgroundColor={COLORS.grass}
        />
        <View style={styles.header}>
          <GoBack />
          <TouchableOpacity onPressIn={handleFavorite} delayPressIn={800}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }} testID="heart-icon">
              {isFavorite ? (
                <Icon name="heart" size={24} color={COLORS.white} />
              ) : (
                <Icon name="heart-outlined" size={24} color={COLORS.white} />
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.name}>{capitalizeFirstLetter(pokemonData.name)}</Text>
            <View style={styles.types}>
              {pokemonData.types.map((pokemonType, index) => renderTypes(pokemonType as PokemonTypes, index))}
            </View>
          </View>
          <Text style={styles.pokeNumber}> #{pokemonData.id}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: pokemonData.evolutions[0]?.imageUrl, // Show the base form image or use a specific image
            }}
            resizeMode="contain"
            width={200}
            height={200}
            testID="pokemon-image"
          />
          <PokeballSvg
            style={styles.pokeball}
            fill={`${COLORS.white}${COLORS['0.2']}`}
            testID="pokeball-svg"
            width={200}
            height={200}
          />
        </View>
        <View style={styles.details}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: COLORS.water }}
                style={styles.tabBar}
                labelStyle={styles.tabLabel}
                activeColor={COLORS.black}
                inactiveColor={COLORS.black + COLORS['0.4']}
                tabStyle={styles.tab}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.grass + COLORS['0.8'],
  },
  container: {
    flex: 1,
    height: '100%',
  },
  header: {
    paddingHorizontal: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    zIndex: 10,
  },
  pokeball: {
    position: 'absolute',
    left: 200,
    bottom: 0,
  },
  image: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 20,
    bottom: -20,
    left: 95,
    resizeMode: 'contain',
    flex: 1,
  },
  infoContainer: {
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'column',
    minWidth: 150,
  },
  name: {
    color: COLORS.white,
    fontFamily: Fonts.GeneraSemiBold,
    fontSize: 30,
    marginBottom: 10,
    marginLeft: 5,
  },
  pokeNumber: {
    fontFamily: Fonts.PokemonHollowSolid,
    fontSize: 18,
    color: COLORS.white + COLORS['0.6'],
    letterSpacing: 1.5,
  },
  types: {
    flexDirection: 'row',
    fontSize: 15,
    justifyContent: 'space-evenly',
  },
  type: {
    width: 70,
    marginHorizontal: 5,
  },
  details: {
    flex: 1.25,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 1,
  },
  tabLabel: {
    color: COLORS.black,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: Fonts.GeneraSemiBold,
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
  tab: {
    padding: 0,
  },
});
