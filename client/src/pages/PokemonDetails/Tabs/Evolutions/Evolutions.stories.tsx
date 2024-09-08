import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Evolutions } from './Evolutions';
import { Evolution as EvolutionType } from '../../../../types/PokemonDetails';

export default {
  title: 'components/PokemonDetails/Tabs/Evolution/Evolutions',
  component: Evolutions,
} satisfies Meta<typeof Evolutions>;

type Story = StoryObj<typeof Evolutions>;

const mockEvolutions: EvolutionType[] = [
  {
    imageUrl:
      'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/5.png',
    level: 16,
    name: 'Charmeleon',
  },
  {
    imageUrl:
      'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/6.png',
    level: 36,
    name: 'Charizard',
  },
];

export const Default: Story = {
  render: () => <Evolutions evolutions={mockEvolutions} />,
};

export const NoEvolutions: Story = {
  render: () => <Evolutions evolutions={undefined} />,
};

export const SingleEvolution: Story = {
  render: () => (
    <Evolutions
      evolutions={[
        {
          imageUrl:
            'https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/6.png',
          level: 36,
          name: 'Charizard',
        },
      ]}
    />
  ),
};
