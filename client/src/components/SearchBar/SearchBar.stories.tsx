// stories/SearchBar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { SearchBar } from './SearchBar';

const meta = {
  title: 'components/SearchBar',
  component: SearchBar,
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
