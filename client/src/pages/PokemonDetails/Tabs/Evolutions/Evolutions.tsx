import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { EvolutionStep } from './EvolutionStep';
import { COLORS } from '../../../../constants/colors';
import { Fonts } from '../../../../constants/fonts';
import { Evolution as EvolutionType } from '../../../../types/PokemonDetails';

interface EvolutionsProps {
  evolutions?: EvolutionType[]; // Make it optional in case data is not ready
}

export const Evolutions: React.FC<EvolutionsProps> = ({ evolutions }) => {
  if (!evolutions || evolutions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evolution Chain</Text>
      <View style={styles.evolutions}>
        {evolutions.map((evolution, index) => (
          <View key={index}>
            {index > 0 && <View style={styles.br} />}
            <View style={styles.row}>
              <EvolutionStep uri={evolution.imageUrl} level={evolution.level} />
              {evolutions[index + 1] && <EvolutionStep uri={evolutions[index + 1].imageUrl} />}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 18,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    paddingLeft: 16,
    fontFamily: Fonts.GeneraSemiBold,
  },
  evolutions: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  br: {
    marginVertical: 24,
    width: '90%',
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: COLORS.black + COLORS['0.2'],
  },
});
