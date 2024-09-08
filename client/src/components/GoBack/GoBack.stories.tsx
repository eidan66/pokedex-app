import { useNavigation } from '@react-navigation/native';
import { Meta } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { GoBack } from './GoBack';

export default {
  title: 'components/GoBack',
  component: GoBack,
} satisfies Meta<typeof GoBack>;

export const Default = () => {
  const mockGoBack = jest.fn();
  const mockCanGoBack = jest.fn().mockReturnValue(true);

  // Mocking the useNavigation for Storybook
  (useNavigation as jest.Mock).mockReturnValue({
    goBack: mockGoBack,
    canGoBack: mockCanGoBack,
  });

  return (
    <View style={{ padding: 20 }}>
      <GoBack />
    </View>
  );
};
