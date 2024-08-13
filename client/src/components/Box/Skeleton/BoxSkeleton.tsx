import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Skeleton } from '@rneui/themed';

import PokeballSvg from '../../../../assets/svg/pokeballSvg.svg';
import { COLORS } from '../../../constants/colors';

export const BoxSkeleton: React.FC = () => (
  <View style={styles.container} testID="skeleton-box">
    <View style={styles.headerContainer}>
      <Skeleton width={90} height={20} animation="wave" style={styles.skeletonText} testID="skeleton-text" />
      <Skeleton width={40} height={20} animation="wave" style={styles.smallSkeletonText} testID="small-skeleton-text" />
    </View>
    <View style={styles.middleContainer}>
      <View style={styles.typesContainer}>
        <Skeleton width={60} height={20} animation="wave" style={styles.skeletonType} testID="skeleton-type-0" />
        <Skeleton width={60} height={20} animation="wave" style={styles.skeletonType} testID="skeleton-type-1" />
      </View>
      <View style={styles.pokeImgContainer}>
        <Skeleton circle width={60} height={60} animation="wave" style={styles.skeletonImage} testID="skeleton-image" />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 180,
    borderRadius: 10,
    height: 150,
    padding: 12,
    backgroundColor: COLORS.gray,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonText: {
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: COLORS.black + COLORS['0.1'],
  },
  smallSkeletonText: {
    borderRadius: 4,
    backgroundColor: COLORS.black + COLORS['0.1'],
  },
  middleContainer: {
    flexDirection: 'row',
  },
  typesContainer: {
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  pokeball: {
    position: 'absolute',
    left: 30,
    top: 0,
  },
  skeletonType: {
    borderRadius: 4,
    marginBottom: 5,
    backgroundColor: COLORS.black + COLORS['0.1'],
  },
  pokeImgContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
  },
  skeletonImage: {
    top: 25,
    left: 25,
    backgroundColor: COLORS.black + COLORS['0.1'],
  },
});
