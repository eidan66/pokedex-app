import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { PokedexPokemon } from './types';
import { Box } from '../../components/Box';
import { BoxSkeletonList } from '../../components/Box/Skeleton/List/BoxSkeletonList';
import { Cards } from '../../components/Card/data';
import { RootStackParamList } from '../../navigation/routes';
import { RootStackTypes } from '../../navigation/routes/types';
import { FetchResponse, PokedexResponse } from '../../types';
import { ServerUrl } from '../../utils/serverUrl';

type PokedexScreenProps = NativeStackScreenProps<RootStackParamList, Cards.Pokedex>;

export const Pokedex: FunctionComponent<PokedexScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemons, setPokemons] = useState<PokedexResponse[]>([]);
  const [nextPage, setNextPage] = useState<string>(`${ServerUrl()}/pokemons`);

  const fetchPokemons = async () => {
    try {
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      const response = await fetch(nextPage);
      const jsonData = (await response.json()) as FetchResponse;

      setPokemons((prevData) => [...prevData, ...jsonData.results]);

      setNextPage(__DEV__ ? `http://${jsonData.next}` : jsonData.next);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed fetch Pokemons:', error);
    }
  };

  useEffect(() => {
    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPokemonPress = (pokemonId: number) => {
    navigation.navigate(RootStackTypes.PokemonDetails, { pokemonId });
  };

  const renderPokemon = (pokemon: PokedexPokemon) => <Box onPokemonPress={onPokemonPress} {...pokemon} />;

  return (
    <View>
      <FlatList
        data={pokemons}
        renderItem={({ item }) => renderPokemon(item)}
        keyExtractor={(item, index) => `${item}-${index.toString()}`}
        numColumns={2}
        onEndReached={fetchPokemons}
        onEndReachedThreshold={3}
        columnWrapperStyle={styles.row}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListFooterComponent={() => <View>{isLoading && <BoxSkeletonList />}</View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
