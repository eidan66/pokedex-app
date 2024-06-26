/** @type{import("@storybook/react-webpack5").StorybookConfig} */
module.exports = {
  stories: ['../components/**/*.stories.?(ts|tsx|js|jsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-web',
    '@storybook/addon-webpack5-compiler-swc',
    '@chromatic-com/storybook'
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};
