import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import FriendIcon from '../../../../../../assets/images/friend-icon.png';
import TradeIcon from '../../../../../../assets/images/trade-icon.png';
import { RightArrow } from '../../../../../components/RightArrow';
import { COLORS } from '../../../../../constants/colors';
import { EvolutionsChain } from '../../../../../types/PokemonDetails';
import { Evolution } from '../Evolution';

interface EvolutionStepProps extends Partial<EvolutionsChain> {
  nextEvolutionUri?: string;
}

export const EvolutionStep: FunctionComponent<EvolutionStepProps> = ({
  imageUrl,
  level,
  evolutionMethod,
  methodImageUrl,
  nextEvolutionUri,
}) => {
  const renderImage = () => {
    const styleWithTint = [styles.methodImage, styles.tintColor];

    switch (evolutionMethod) {
      case 'Trade':
        return <Image style={styleWithTint} source={TradeIcon} />;
      case 'High Friendship':
        return <Image style={styleWithTint} source={FriendIcon} />;
      default:
        return methodImageUrl && <Image style={styles.methodImage} source={{ uri: methodImageUrl }} />;
    }
  };

  return (
    <View style={styles.evolutionStep} testID="evolution-step">
      {imageUrl && <Evolution uri={imageUrl} />}

      {level && (
        <View style={styles.arrowContainer}>
          <RightArrow color={COLORS.black + COLORS['0.2']} />
          <Text style={styles.levelText}>Lvl {level}</Text>
        </View>
      )}

      {evolutionMethod && evolutionMethod !== 'Level' && (
        <View style={styles.methodContainer}>
          {renderImage()}
          <Text style={styles.methodText}>{evolutionMethod}</Text>
        </View>
      )}

      {nextEvolutionUri && <Evolution uri={nextEvolutionUri} />}
    </View>
  );
};

const styles = StyleSheet.create({
  evolutionStep: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowContainer: {
    alignItems: 'center',
    marginLeft: 8,
    position: 'absolute',
    left: 135,
  },
  methodContainer: {
    alignItems: 'center',
    marginLeft: 8,
  },
  levelText: {
    marginTop: 15,
    fontSize: 16,
    color: COLORS.black,
  },
  methodText: {
    marginTop: 20,
    fontSize: 16,
    color: COLORS.black,
  },
  methodImage: {
    width: 30,
    height: 30,
  },
  tintColor: {
    tintColor: COLORS.black + COLORS['0.2'],
  },
});
