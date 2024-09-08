import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Evolution } from './Evolution';

export default {
  title: 'components/PokemonDetails/Tabs/Evolution/Evolution',
  component: Evolution,
} satisfies Meta<typeof Evolution>;

type Story = StoryObj<typeof Evolution>;

const mockUri =
  'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/4.png';

export const Default: Story = {
  render: () => <Evolution uri={mockUri} />,
};

export const DifferentPokemonImage: Story = {
  render: () => (
    <Evolution uri="https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/5.png" />
  ),
};
