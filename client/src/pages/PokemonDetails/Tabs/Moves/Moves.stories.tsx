import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Moves } from './Moves';
import { Move as MoveType } from '../../../../types/PokemonDetails';

export default {
  title: 'components/PokemonDetails/Tabs/Moves',
  component: Moves,
} satisfies Meta<typeof Moves>;

type Story = StoryObj<typeof Moves>;

const mockMoves: MoveType[] = [
  { name: 'Tackle', type: 'Normal', power: 40, accuracy: 100, levelLearnedAt: 1 },
  { name: 'Thunderbolt', type: 'Electric', power: 90, accuracy: 100, levelLearnedAt: 26 },
];

export const Default: Story = {
  render: () => <Moves moves={mockMoves} />,
};

export const EmptyMoves: Story = {
  render: () => <Moves moves={[]} />,
};
