import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import { StatBar } from '../../../../components/StatBar/StatBar';
import { BaseStats as BaseStatsType } from '../../../../types/PokemonDetails';

interface BaseStatsProps {
  baseStats?: BaseStatsType;
}

export const BaseStats: FunctionComponent<BaseStatsProps> = ({ baseStats }) => {
  if (!baseStats) {
    return null;
  }

  const { hp, attack, defense, specialAttack, specialDefense, speed } = baseStats;

  const calculatedTotalStats = hp + attack + defense + specialAttack + specialDefense + speed;

  const stats = [
    { name: 'HP', value: hp, testID: 'stats-HP' },
    { name: 'Attack', value: attack, testID: 'stats-Attack' },
    { name: 'Defense', value: defense, testID: 'stats-Defense' },
    { name: 'Sp.Atk', value: specialAttack, testID: 'stats-Sp.Atk' },
    { name: 'Sp.Def', value: specialDefense, testID: 'stats-Sp.Def' },
    { name: 'Speed', value: speed, testID: 'stats-Speed' },
    { name: 'Total', value: calculatedTotalStats, testID: 'stats-Total' },
  ];

  return (
    <View style={styles.container}>
      {stats.map(({ name, value, testID }, index) => (
        <StatBar key={index} name={name} value={value} testID={testID} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
