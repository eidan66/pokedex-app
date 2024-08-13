// stories/SplashScreen.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { SplashScreen } from './SplashScreen';
import { createNavigationPropsMock } from '../../../__tests__/navigationMocks/createNavigationPropsMock';

const meta = {
  title: 'components/SplashScreen',
  component: SplashScreen,
} satisfies Meta<typeof SplashScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { ...createNavigationPropsMock() },
};
