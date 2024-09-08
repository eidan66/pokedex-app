import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { About } from './About';
import { About as AboutType } from '../../../../types/PokemonDetails';

export default {
  title: 'components/PokemonDetails/Tabs/About',
  component: About,
} satisfies Meta<typeof About>;

type Story = StoryObj<typeof About>;

const mockAboutData: AboutType = {
  species: 'Seed',
  height: 70,
  weight: 69,
  abilities: [
    { name: 'Overgrow', isHidden: false },
    { name: 'Chlorophyll', isHidden: true },
  ],
  gender: {
    male: 88.1,
    female: 11.9,
  },
  eggGroups: ['Monster', 'Grass'],
  eggCycle: 'Grass Egg Group',
};

export const Default: Story = {
  render: () => <About about={mockAboutData} />,
};

export const Loading: Story = {
  render: () => <About about={undefined} />,
};
