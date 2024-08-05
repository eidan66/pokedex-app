import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { CARD_DATA, DATA } from '../../..//MOCK_DATA/MOCK';

import { Box } from '../../components/Box';
import { Card } from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setPokemons } from '../../redux/slices/pokemonSlice';
import { COLORS } from '../../constants/colors';

export const Homepage = () => {
  // @ts-expect-error
  const renderItem = ({ item }) => <Box {...item} />;
  // @ts-expect-error
  const renderCardItem = ({ item }) => <Card {...item} />;

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
      <FlatList
        data={CARD_DATA}
        renderItem={renderCardItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
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
