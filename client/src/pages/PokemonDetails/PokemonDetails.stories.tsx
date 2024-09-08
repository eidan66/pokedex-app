import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { PokemonDetails } from './PokemonDetails';

export default {
  title: 'components/PokemonDetails',
  component: PokemonDetails,
} satisfies Meta<typeof PokemonDetails>;

type Story = StoryObj<typeof PokemonDetails>;

export const Default: Story = {
  render: () => <PokemonDetails route={{ params: { pokemonId: 1 } }} />,
};

export const FavoriteSelected: Story = {
  render: () => <PokemonDetails route={{ params: { pokemonId: 1 } }} />,
};
