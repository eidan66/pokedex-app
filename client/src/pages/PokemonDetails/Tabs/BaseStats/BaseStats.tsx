import React from 'react';
import { StyleSheet, View } from 'react-native';

import StatBar from '../../../../components/StatBar/StatBar';
import { BaseStats as BaseStatsType } from '../../../../types/PokemonDetails';

interface BaseStatsProps {
  baseStats?: BaseStatsType; // Make it optional in case data is not ready
}

export const BaseStats: React.FC<BaseStatsProps> = ({ baseStats }) => {
  if (!baseStats) {
    return null;
  }

  const { hp, attack, defense, specialAttack, specialDefense, speed } = baseStats;

  const calculatedTotalStats = hp + attack + defense + specialAttack + specialDefense + speed;

  const stats = [
    { name: 'HP', value: hp },
    { name: 'Attack', value: attack },
    { name: 'Defense', value: defense },
    { name: 'Sp.Atk', value: specialAttack },
    { name: 'Sp.Def', value: specialDefense },
    { name: 'Speed', value: speed },
    { name: 'Total', value: calculatedTotalStats },
  ];

  return (
    <View style={styles.container}>
      {stats.map(({ name, value }, index) => (
        <StatBar key={index} name={name} value={value} />
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
