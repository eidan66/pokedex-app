import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Card, CardProps } from '../../components/Card';
import { CARDS_DATA, Cards } from '../../components/Card/data';
import { SearchBar } from '../../components/SearchBar';
import { SafeAreaView } from '../../hoc/SafeAreaView';
import { RootStackParamList } from '../../navigation/routes';
import { RootStackTypes } from '../../navigation/routes/types';

type HomepageScreenProps = NativeStackScreenProps<RootStackParamList, RootStackTypes.Homepage>;

export const Homepage: FunctionComponent<HomepageScreenProps> = ({ navigation }) => {
  const onCardPress = (title: Cards) => {
    const navigateTo = title === Cards.Pokédex ? Cards.Pokedex : title;
    navigation.navigate(navigateTo);
  };

  const renderCardItem = ({ item }: { item: CardProps }) => <Card {...item} onCardPress={onCardPress} />;

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
