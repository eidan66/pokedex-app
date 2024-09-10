// stories/TypeBox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { TypeBox } from './TypeBox';
import { PokemonTypes } from '../../types';

const meta = {
  title: 'components/TypeBox',
  component: TypeBox,
} satisfies Meta<typeof TypeBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    typeName: PokemonTypes.Grass,
  },
};
