// stories/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';
import { COLORS } from '../../constants/colors';

const meta = {
  title: 'components/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    background: COLORS.grass,
    title: 'Pokédex',
    onCardPress: () => {
      // eslint-disable-next-line no-console
      console.log('Clicked!');
    },
  },
};
