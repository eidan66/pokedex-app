import React, { FunctionComponent } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { COLORS } from '../../constants/colors';

interface RightArrowProps {
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const RightArrow: FunctionComponent<RightArrowProps> = ({ color, style }) => (
  <View style={style} testID="right-arrow-container">
    <Icon name="arrowright" size={24} color={color || COLORS.gray} testID="right-arrow-icon" />
  </View>
);
