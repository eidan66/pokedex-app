import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text, View } from 'react-native';

import { SafeAreaView } from './SafeAreaView';

export default {
  title: 'components/SafeAreaView',
  component: SafeAreaView,
} satisfies Meta<typeof SafeAreaView>;

type Story = StoryObj<typeof SafeAreaView>;

export const Default: Story = {
  render: () => (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <Text>Default SafeAreaView Content</Text>
      </View>
    </SafeAreaView>
  ),
};

export const WithCustomStyles: Story = {
  render: () => (
    <SafeAreaView containerStyle={{ backgroundColor: 'lightblue' }} bottomStyle={{ backgroundColor: 'red' }}>
      <View style={{ padding: 20 }}>
        <Text>Custom SafeAreaView Content</Text>
      </View>
    </SafeAreaView>
  ),
};

export const WithInsetsExample: Story = {
  render: () => (
    <SafeAreaView containerStyle={{ backgroundColor: 'green' }} bottomStyle={{ backgroundColor: 'yellow' }}>
      <View style={{ padding: 20 }}>
        <Text>Insets Handled SafeAreaView</Text>
      </View>
    </SafeAreaView>
  ),
};
