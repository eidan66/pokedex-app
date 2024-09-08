import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { BaseStats } from './BaseStats';
import { BaseStats as BaseStatsType } from '../../../../types/PokemonDetails';

export default {
  title: 'components/PokemonDetails/Tabs/BaseStats',
  component: BaseStats,
} satisfies Meta<typeof BaseStats>;

type Story = StoryObj<typeof BaseStats>;

const mockBaseStats: BaseStatsType = {
  hp: 45,
  attack: 49,
  defense: 49,
  specialAttack: 65,
  specialDefense: 65,
  speed: 45,
  total: 45 + 49 + 49 + 65 + 65 + 45,
};

export const Default: Story = {
  render: () => <BaseStats baseStats={mockBaseStats} />,
};

export const NoData: Story = {
  render: () => <BaseStats baseStats={undefined} />,
};
