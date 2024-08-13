// stories/BoxSkeleton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { BoxSkeleton } from './BoxSkeleton';

const meta = {
  title: 'components/Box/Skeleton/BoxSkeleton',
  component: BoxSkeleton,
} satisfies Meta<typeof BoxSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
