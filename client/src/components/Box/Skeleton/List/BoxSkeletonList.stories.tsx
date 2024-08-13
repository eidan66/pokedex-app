// stories/BoxSkeletonList.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { BoxSkeletonList } from './BoxSkeletonList';

const meta = {
  title: 'components/Box/Skeleton/BoxSkeletonList',
  component: BoxSkeletonList,
} satisfies Meta<typeof BoxSkeletonList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
