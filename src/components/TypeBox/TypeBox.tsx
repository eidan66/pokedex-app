import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FunctionComponent } from 'react';
import { PokemonTypes } from '../../types';
import { COLORS } from '../../constants/colors';
import { capitalizeFirstLetter } from '../../utils/capitalize';

interface TypeBoxProps {
  bg: string;
  typeName: PokemonTypes;
}

export const TypeBox: FunctionComponent<TypeBoxProps> = ({ bg, typeName }) => (
  <View style={[styles.container, { backgroundColor: bg }]}>
    <Text style={styles.text}>{capitalizeFirstLetter(typeName)}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    maxWidth: 65,
    height: 25,
    borderRadius: 10,
    padding: 3,
    marginBottom: 10,
    borderWidth: 0.2,
    borderColor: COLORS.white,
  },
  text: {
    textAlign: 'center',
    color: COLORS.white,
  },
});
