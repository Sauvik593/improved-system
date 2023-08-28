const ignoredModules = ['next'].join('|');

module.exports = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
    '^@server/(.*)$': '<rootDir>/server/$1',
    '^@tests/(.*)$': '<rootDir>/__tests__/$1',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/test/setup.ts'],
  transform: {
    '^.+\\.(js|ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  testRegex: ['.spec.(js|ts|tsx)$'],
  transformIgnorePatterns: [`/node_modules/(?!${ignoredModules})`],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx,js,jsx}',
    '!<rootDir>/__tests__/**/*.spec.(ts|tsx)',
  ],
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: './tsconfig.jest.json',
    },
  },
};
