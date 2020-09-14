module.exports = {
  verbose: true,
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    'src/*.{js,ts}',
  ],
  testEnvironmentOptions: {
    resources: 'usable'
  }
};
