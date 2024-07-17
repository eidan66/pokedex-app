module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules/(?!(react-native|react-native-svg|@react-native|@react-navigation)/)'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__tests__/__mocks__/svg.js',
  },
  testPathIgnorePatterns: ['<rootDir>/__tests__/__mocks__/svg.js'],
};
