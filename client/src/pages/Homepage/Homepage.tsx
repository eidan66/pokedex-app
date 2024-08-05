import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { CARD_DATA } from '../../..//MOCK_DATA/MOCK';

import { Box } from '../../components/Box';
import { Card } from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setPokemons } from '../../redux/slices/pokemonSlice';
import { COLORS } from '../../constants/colors';
import { SearchBar } from '../../components/SearchBar';

export const Homepage = ({ pokemodList }: { pokemodList: any }) => {
  // @ts-expect-error
  const renderItem = ({ item }) => <Box {...item} />;
  // @ts-expect-error
  const renderCardItem = ({ item }) => <Card {...item} />;

  const dispatch = useDispatch();
  const pokemons = useSelector((state: RootState) => state.pokemon.pokemons);

  const fetchPokemons = () => {
    dispatch(setPokemons(pokemodList));
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
        data={CARD_DATA}
        renderItem={renderCardItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      <FlatList
        data={pokemodList}
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
