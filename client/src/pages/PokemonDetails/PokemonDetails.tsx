/* eslint-disable react/no-unstable-nested-components */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
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
import PokeballLottie from '../../../assets/pokeballLottie.json';
import PokeballSvg from '../../../assets/svg/pokeballSvg.svg';
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
import { getBaseUrl } from '../../utils/serverUrl';

type PokemonDetailsProps = NativeStackScreenProps<RootStackParamList, RootStackTypes.PokemonDetails>;

export const PokemonDetails: FunctionComponent<PokemonDetailsProps> = ({ route: { params } }) => {
  const { pokemonId, backgroundColor: bgColor } = params || {};
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const layout = useWindowDimensions();
  const backgroundColor = bgColor + COLORS['0.8'];

  const fetchPokemons = async () => {
    try {
      if (isLoading) {
        return;
      }

      setIsLoading(true);

      const response = await fetch(`${getBaseUrl()}/pokemon/info/${pokemonId}`);
      const jsonData = await response.json();

      setPokemonData(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed fetch Pokemons:', error);
    }
  };

  useEffect(() => {
    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    evolutions: () => <Evolutions evolutionsRes={pokemonData?.evolutions} />,
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
      <TypeBox typeName={pokemonType} style={styles.type} />
    </View>
  );

  if (isLoading || !pokemonData) {
    return (
      <SafeAreaView containerStyle={[styles.loadingScreen, { backgroundColor }]}>
        <View testID="loading-pokemon-data">
          <LottieView source={PokeballLottie} autoPlay loop style={styles.lottie} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView containerStyle={[styles.safeArea, { backgroundColor }]}>
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
                <Icon name="heart" size={24} color={COLORS.white} testID="heart-icon-inline" />
              ) : (
                <Icon name="heart-outlined" size={24} color={COLORS.white} testID="heart-icon-outline" />
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.name}>{capitalizeFirstLetter(pokemonData.name)}</Text>
            <View style={[styles.types, pokemonData.types.length === 1 && styles.oneType]}>
              {pokemonData.types.map((pokemonType, index) => renderTypes(pokemonType as PokemonTypes, index))}
            </View>
          </View>
          <View style={styles.numberContainer}>
            <Text style={styles.pokeNumber}>{pokemonData.number}</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: pokemonData.image, // Show the base form image or use a specific image
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
            navigationState={{ index: tabIndex, routes }}
            renderScene={renderScene}
            onIndexChange={setTabIndex}
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
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
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
  numberContainer: {
    height: 40,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  pokeNumber: {
    fontFamily: Fonts.PokemonHollowSolid,
    fontSize: 24,
    color: COLORS.white + COLORS['0.6'],
    letterSpacing: 1.5,
    textAlign: 'center',
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
  oneType: {
    width: 70,
    marginHorizontal: 5,
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
  lottie: {
    width: 250,
    height: 250,
  },
});
