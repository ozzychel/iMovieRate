module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|@fortawesome)"
  ],
  clearMocks: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    'components/**/*.{js,jsx,mjs}', 'App.js',
    '!components/helperFunctions/serverRequests.js',
    '!components/helperFunctions/helpers.js' ],
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'jsx'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  verbose: true,
};
