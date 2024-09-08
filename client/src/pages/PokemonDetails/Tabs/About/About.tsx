import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GenderIcons } from '../../../../components/GenderIcons';
import { COLORS } from '../../../../constants/colors';
import { About as AboutType } from '../../../../types/PokemonDetails';

interface AboutProps {
  about?: AboutType; // Make it optional in case data is not ready
}

export const About: FunctionComponent<AboutProps> = ({ about }) => {
  if (!about) {
    return null;
  } // Return null if no data yet

  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        <View style={styles.categoriesTitlesContainer}>
          <Text style={styles.label}>Species</Text>
          <Text style={styles.label}>Height</Text>
          <Text style={styles.label}>Weight</Text>
          <Text style={styles.label}>Abilities</Text>
        </View>
        <View style={styles.categoriesValuesContainer}>
          <Text style={styles.category}>{about.species}</Text>
          <Text style={styles.category}>
            {about.height / 10} <Text style={styles.bold}>m</Text>
          </Text>
          <Text style={styles.category}>
            {about.weight / 10} <Text style={styles.bold}>kg</Text>
          </Text>
          <Text style={styles.category}>
            {about.abilities.map((ability, index) => (
              <Text key={index}>
                {ability.name}
                {ability.isHidden ? ' (Hidden)' : ''}
                {index < about.abilities.length - 1 ? ', ' : ''}
              </Text>
            ))}
          </Text>
        </View>
      </View>
      <Text style={styles.title}>Breeding</Text>
      <View style={styles.categoriesContainer}>
        <View style={styles.categoriesTitlesContainer}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.label}>Egg Groups</Text>
          <Text style={styles.label}>Egg Cycle</Text>
        </View>
        <View style={styles.categoriesValuesContainer}>
          <GenderIcons maleValue={about.gender.male} femaleValue={about.gender.female} />
          <Text style={styles.category}>{about.eggGroups.join(', ')}</Text>
          <Text style={styles.category}>{about.eggCycle}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
  },
  categoriesTitlesContainer: {
    flex: 0.5,
  },
  categoriesValuesContainer: {
    flex: 1,
  },
  category: {
    marginTop: 20,
    color: COLORS.black,
  },
  bold: {
    fontWeight: '600',
  },
  label: {
    marginTop: 20,
    color: COLORS.black + COLORS['0.5'],
  },
});
