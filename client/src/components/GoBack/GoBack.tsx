import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { COLORS } from '../../constants/colors';

export const GoBack = () => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  const handleClick = () => navigation.goBack();

  if (!canGoBack) {
    return null;
  }

  return (
    <TouchableOpacity onPressIn={handleClick} delayPressIn={800} testID="go-back-icon">
      <Icon name="arrowleft" size={24} color={COLORS.white} />
    </TouchableOpacity>
  );
};
