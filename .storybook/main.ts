/** @type{import("@storybook/react-webpack5").StorybookConfig} */
module.exports = {
  stories: ['../src/components/**/*.stories.?(ts|tsx|js|jsx)', '../**/*'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-web',
    '@chromatic-com/storybook',
    '@storybook/addon-webpack5-compiler-babel',
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  webpackFinal: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      exclude: /node_modules/,
      use: [
        {
          loader: '@svgr/webpack',
        },
      ],
    });
    return config;
  },
};
