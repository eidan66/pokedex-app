import React, { FunctionComponent } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { EvolutionStep } from './EvolutionStep';
import PersonIcon from '../../../../../assets/images/person.png';
import { COLORS } from '../../../../constants/colors';
import { Fonts } from '../../../../constants/fonts';
import { Evolution as EvolutionType } from '../../../../types/PokemonDetails';

interface EvolutionsProps {
  evolutionsRes?: EvolutionType;
}

export const Evolutions: FunctionComponent<EvolutionsProps> = ({ evolutionsRes }) => {
  const { all_from_base, evolutions_chain: evolutions } = evolutionsRes || {};

  if (!evolutions || evolutions.length === 0) {
    return null;
  }

  const renderEvolutions = () => {
    if (evolutions.length === 1) {
      return (
        <View style={styles.noEvolutionContainer}>
          <Image source={PersonIcon} style={styles.noEvolutionImage} />
          <Text style={styles.noEvolutionText}>No Evolution Available</Text>
        </View>
      );
    } else if (evolutions.length === 2) {
      return (
        <View style={styles.singleRow}>
          <EvolutionStep
            imageUrl={evolutions[0].imageUrl}
            level={evolutions[1].level}
            nextEvolutionUri={evolutions[1]?.imageUrl}
            evolutionMethod={evolutions[1]?.evolutionMethod}
            methodImageUrl={evolutions[1]?.methodImageUrl}
          />
        </View>
      );
    }

    return evolutions.map((evolution, index) => (
      <View key={index}>
        {index > 0 && evolutions[index + 1] && <View style={styles.br} />}
        <View style={styles.row}>
          {evolutions[index + 1] && (
            <EvolutionStep
              imageUrl={all_from_base ? evolutions[0]?.imageUrl : evolution.imageUrl}
              level={all_from_base ? evolutions[0]?.level : evolutions[index + 1]?.level}
              nextEvolutionUri={evolutions[index + 1]?.imageUrl}
              evolutionMethod={evolutions[index + 1]?.evolutionMethod}
              methodImageUrl={evolutions[index + 1]?.methodImageUrl}
            />
          )}
        </View>
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Evolution Chain</Text>
        <View style={styles.evolutionContainer}>
          <View style={styles.evolutions}>{renderEvolutions()}</View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
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
  evolutionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  singleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  br: {
    marginVertical: 24,
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: `${COLORS.black}20`,
  },
  noEvolutionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEvolutionImage: {
    width: 80,
    height: 80,
    marginBottom: 25,
  },
  noEvolutionText: {
    fontFamily: Fonts.GeneraSemiBold,
    fontSize: 22,
  },
});
