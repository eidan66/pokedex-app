import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { EvolutionStep } from './EvolutionStep';

export default {
  title: 'components/PokemonDetails/Tabs/Evolution/EvolutionStep',
  component: EvolutionStep,
} satisfies Meta<typeof EvolutionStep>;

type Story = StoryObj<typeof EvolutionStep>;

const mockUri =
  'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/6.png';

export const Default: Story = {
  render: () => <EvolutionStep uri={mockUri} />,
};

export const WithLevel: Story = {
  render: () => <EvolutionStep uri={mockUri} level={16} />,
};
