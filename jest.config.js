module.exports = {
  preset: "react-native",
  transformIgnorePatterns: ["node_modules/(?!(react-native|@react-native))/"],
  moduleNameMapper: {
    '@react-native-async-storage/async-storage': '<rootDir>/mocks/async-storage.js',
  },
};
