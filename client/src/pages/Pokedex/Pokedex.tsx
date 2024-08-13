import React, { FunctionComponent, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { DATA } from '../../../MOCK_DATA/MOCK';
import { Box } from '../../components/Box';
import { PokedexPokemon } from './types';
import { Cards } from '../../components/Card/data';
import { BoxSkeletonList } from '../../components/Box/Skeleton/List/BoxSkeletonList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/routes';

type PokedexScreenProps = NativeStackScreenProps<RootStackParamList, Cards.Pokedex>;

export const Pokedex: FunctionComponent<PokedexScreenProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  const onPokemonPress = (pokemon: /*Check maybe to pass the pokemon ID*/ Cards) => {
    // navigation.navigate(navigateTo);
  };

  const renderPokemon = (pokemon: PokedexPokemon) => {
    return <Box onPokemonPress={onPokemonPress} {...pokemon} />;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);
  return (
    <View>
      {isLoading ? (
        <BoxSkeletonList />
      ) : (
        <FlatList
          data={DATA}
          renderItem={({ item }) => renderPokemon(item)}
          keyExtractor={(item, index) => `${item}-${index.toString()}`}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
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
