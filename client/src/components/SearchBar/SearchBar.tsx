import React, { useRef, useState } from 'react';
import { SearchBar as SearchBarComponent } from '@rneui/themed';
import { View, StyleSheet, Text, Platform } from 'react-native';

import { Fonts } from '../../constants/fonts';
import { COLORS } from '../../constants/colors';

type SearchBarComponentProps = {};

// TODO: Done the Search bar when we done creating the API.
export const SearchBar: React.FunctionComponent<SearchBarComponentProps> = () => {
  const [search, setSearch] = useState('');
  const searchBarRef = useRef<typeof SearchBarComponent>();

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>What Pokemon{'\n'}are you looking for?</Text>
      <SearchBarComponent
        testID="searchBarContainer"
        ref={(currentRef: any) => (searchBarRef.current = currentRef)}
        placeholder="Type Pokemon,Move,Ability etc..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchBarContainerStyle}
        inputContainerStyle={styles.searchBarInputContainerStyle}
        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
        searchIcon={{ name: 'search' }}
        clearIcon={{ name: 'close' }}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        lightTheme
        round
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 15,
    height: 170,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: Fonts.GeneraSemiBold,
    letterSpacing: 1,
  },
  searchBarContainerStyle: {
    backgroundColor: COLORS.transparent,
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInputContainerStyle: {
    backgroundColor: COLORS.gray,
  },
});
