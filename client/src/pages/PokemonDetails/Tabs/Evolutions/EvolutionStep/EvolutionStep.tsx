import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RightArrow } from '../../../../../components/RightArrow';
import { COLORS } from '../../../../../constants/colors';
import { Evolution } from '../Evolution';

interface EvolutionStepProps {
  uri: string;
  level?: number;
}

export const EvolutionStep: FunctionComponent<EvolutionStepProps> = ({ uri, level }) => (
  <View style={styles.evolutionStep} testID="evolution-step">
    <Evolution uri={uri} />
    {level && (
      <View style={styles.arrowContainer}>
        <RightArrow color={COLORS.black + COLORS['0.2']} />
        <Text style={styles.levelText}>Lvl {level}</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  evolutionStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowContainer: {
    alignItems: 'center',
    marginLeft: 8,
    position: 'absolute',
    left: 125,
  },
  levelText: {
    marginRight: 4,
    fontSize: 16,
    color: COLORS.black,
  },
});
