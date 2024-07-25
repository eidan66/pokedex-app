// stories/SplashScreen.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { SplashScreen } from './SplashScreen';

const meta = {
  title: 'components/SplashScreen',
  component: SplashScreen,
} satisfies Meta<typeof SplashScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onFinish: () => {
      console.log('Trigger on finish mock');
    },
  },
};
