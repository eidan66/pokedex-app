import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../../../constants/colors';
import { Fonts } from '../../../../constants/fonts';
import { PokemonTypes } from '../../../../types';
import { Move as MoveType } from '../../../../types/PokemonDetails';

interface MovesTabProps {
  moves?: MoveType[]; // Make it optional in case data is not ready
}

const getTypeColor = (type: Lowercase<PokemonTypes>) => COLORS[type.toLowerCase() as Lowercase<PokemonTypes>];

const MoveCard: FunctionComponent<{ move: MoveType }> = ({ move }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Text style={styles.moveName}>{move.name}</Text>
      <Text
        style={[
          styles.typeBadge,
          { backgroundColor: getTypeColor(move.type.toLowerCase() as Lowercase<PokemonTypes>) },
        ]}
      >
        {move.type}
      </Text>
    </View>
    <View style={styles.moveDetails}>
      <Text style={styles.detailText}>Power: {move.power}</Text>
      <Text style={styles.detailText}>Accuracy: {move.accuracy}%</Text>
      <Text style={styles.detailText}>Level Learned: {move.levelLearnedAt}</Text>
    </View>
  </View>
);

export const Moves: FunctionComponent<MovesTabProps> = ({ moves }) => {
  if (!moves) {
    return null;
  } // Return null if no data yet

  return (
    <View style={styles.container}>
      <FlatList
        data={moves}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <MoveCard move={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 0.5,
    borderColor: COLORS.black + COLORS['0.2'],
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    elevation: 1,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  moveName: {
    fontSize: 20,
    fontFamily: Fonts.GeneraSemiBold,
  },
  typeBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  moveDetails: {
    flexDirection: 'column',
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});
