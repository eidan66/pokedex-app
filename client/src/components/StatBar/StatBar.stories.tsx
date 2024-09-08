import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { StatBar } from './StatBar';

export default {
  title: 'components/StatBar',
  component: StatBar,
} satisfies Meta<typeof StatBar>;

type Story = StoryObj<typeof StatBar>;

export const Default: Story = {
  render: () => (
    <View style={{ padding: 20 }}>
      <StatBar name="HP" value={100} />
    </View>
  ),
};

export const TotalStat: Story = {
  render: () => (
    <View style={{ padding: 20 }}>
      <StatBar name="total" value={700} />
    </View>
  ),
};

export const LowValue: Story = {
  render: () => (
    <View style={{ padding: 20 }}>
      <StatBar name="HP" value={50} />
    </View>
  ),
};
