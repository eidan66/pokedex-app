import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import FemaleIcon from '../../../assets/images/female.png';
import MaleIcon from '../../../assets/images/male.png';

interface GenderIconsProps {
  maleValue: number;
  femaleValue: number;
}

export const GenderIcons: FunctionComponent<GenderIconsProps> = ({ femaleValue, maleValue }) => (
  <View style={styles.container}>
    <View style={styles.iconWrapper}>
      <Image source={MaleIcon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.label}>{maleValue}%</Text>
    </View>
    <View style={styles.iconWrapper}>
      <Image source={FemaleIcon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.label}>{femaleValue}%</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 25,
    marginRight: 5,
  },
  label: {
    fontSize: 16,
  },
});
