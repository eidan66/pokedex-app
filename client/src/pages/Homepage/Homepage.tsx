import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '../../components/Card';
import { CARDS_DATA, Cards } from '../../components/Card/data';
import { SearchBar } from '../../components/SearchBar';
import { SafeAreaView } from '../../hoc/SafeAreaView/SafeAreaView';
import { RootStackParamList } from '../../navigation/routes';
import { RootStackTypes } from '../../navigation/routes/types';
import { setPokemons } from '../../redux/slices/pokemonSlice';
import { RootState } from '../../redux/store';

type HomepageScreenProps = NativeStackScreenProps<RootStackParamList, RootStackTypes.Homepage>;

export const Homepage: FunctionComponent<HomepageScreenProps> = ({ navigation }) => {
  const onCardPress = (title: Cards) => {
    const navigateTo = title === Cards.Pokédex ? Cards.Pokedex : title;
    navigation.navigate(navigateTo);
  };

  // @ts-expect-error
  const renderCardItem = ({ item }) => <Card {...item} onCardPress={onCardPress} />;

  const dispatch = useDispatch();
  const pokemons = useSelector((state: RootState) => state.pokemon.pokemons);

  const fetchPokemons = () => {
    // For this basic example, let's just use a hardcoded list of Pokémon names
    const fetchedPokemons = ['Bulbasaur', 'Ivysaur', 'Venusaur'];
    dispatch(setPokemons(fetchedPokemons));
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    console.log('pokemons', { pokemons });
  }, [pokemons]);

  return (
    <SafeAreaView>
      <View>
        <SearchBar />
      </View>
      <FlatList
        data={CARDS_DATA}
        renderItem={renderCardItem}
        keyExtractor={(item, index) => `${item}-${index.toString()}`}
        numColumns={2}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
