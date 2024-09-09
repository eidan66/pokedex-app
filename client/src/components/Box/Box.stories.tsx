// stories/Box.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Box } from './Box';
import { COLORS } from '../../constants/colors';
import { PokemonTypes } from '../../types';

const meta = {
  title: 'components/Box',
  component: Box,
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    id: 6,
    name: 'Charizard',
    number: '#006',
    types: [PokemonTypes.Fire, PokemonTypes.Flying],
    boxBg: COLORS.fire,
    gif: 'https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/6.gif?raw=true',
    size: {
      width: 100,
      height: 150,
    },
    imageStyle: {
      bottom: 60,
    },
    onPokemonPress: () => {
      // eslint-disable-next-line no-console
      console.log('Triggered click');
    },
  },
};
