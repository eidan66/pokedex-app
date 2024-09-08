import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { RightArrow } from './RightArrow';
import { COLORS } from '../../constants/colors';

export default {
  title: 'components/RightArrow',
  component: RightArrow,
} satisfies Meta<typeof RightArrow>;

type Story = StoryObj<typeof RightArrow>;

export const Default: Story = {
  render: () => (
    <View style={{ padding: 20 }}>
      <RightArrow />
    </View>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <View style={{ padding: 20 }}>
      <RightArrow color={COLORS.white} />
    </View>
  ),
};

export const CustomStyle: Story = {
  render: () => (
    <View style={{ padding: 20 }}>
      <RightArrow style={{ marginTop: 10, backgroundColor: 'lightgray' }} />
    </View>
  ),
};
