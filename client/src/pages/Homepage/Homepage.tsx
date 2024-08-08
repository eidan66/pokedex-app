import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Card } from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setPokemons } from '../../redux/slices/pokemonSlice';
import { COLORS } from '../../constants/colors';
import { SearchBar } from '../../components/SearchBar';
import { CARDS_DATA } from '../../components/Card/data';

export const Homepage = () => {
  const onCardPress = (title: string) => {
    // TODO: Implement Navigation logic here...
    console.log(`Navigate to -> ${title}`);
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
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  cardsContainer: {},
  br: {
    borderWidth: 1,
    borderColor: COLORS.black,
    height: 0,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
