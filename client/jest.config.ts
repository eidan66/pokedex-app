import type { Config } from 'jest';

module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-svg|@react-native|@react-navigation|@rneui/themed|@rneui/base|react-native-size-matters|react-native-ratings|react-native-vector-icons|react-redux)/)',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__tests__/__mocks__/svg.js',
  },
  testPathIgnorePatterns: ['<rootDir>/__tests__/*'],
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/__tests__/jestSetupFile.js'],
} as Config;
