// stories/Homepage.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Homepage } from './Homepage';

const meta = {
  title: 'Pages/Homepage',
  component: Homepage,
} satisfies Meta<typeof Homepage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
