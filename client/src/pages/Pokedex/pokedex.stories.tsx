// stories/Pokedex.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Pokedex } from './Pokedex';
import { createNavigationPropsMock } from '../../../__tests__/navigationMocks/createNavigationPropsMock';

const meta = {
  title: 'Pages/Pokedex',
  component: Pokedex,
} satisfies Meta<typeof Pokedex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { ...createNavigationPropsMock() },
};
