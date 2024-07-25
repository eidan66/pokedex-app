const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const { generate } = require('@storybook/react-native/scripts/generate');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

generate({
  configPath: path.resolve(__dirname, './.ondevice'),
});

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    unstable_allowRequireContext: true,
    babelTransformerPath: require.resolve('react-native-svg-transformer/react-native'),
  },
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      const defaultResolveResult = context.resolveRequest(context, moduleName, platform);

      if (process.env.STORYBOOK_ENABLED !== 'true' && defaultResolveResult?.filePath?.includes?.('.ondevice/')) {
        return {
          type: 'empty',
        };
      }

      return defaultResolveResult;
    },
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
