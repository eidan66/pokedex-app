import React from 'react';
import { View } from 'react-native';

import { GenderIcons } from './GenderIcons';

export default {
  title: 'GenderIcons',
  component: GenderIcons,
};

export const Default = () => (
  <View style={{ padding: 20 }}>
    <GenderIcons maleValue={50} femaleValue={50} />
  </View>
);

export const MaleDominated = () => (
  <View style={{ padding: 20 }}>
    <GenderIcons maleValue={80} femaleValue={20} />
  </View>
);

export const FemaleDominated = () => (
  <View style={{ padding: 20 }}>
    <GenderIcons maleValue={20} femaleValue={80} />
  </View>
);
