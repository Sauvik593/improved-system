/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // ts-jest configuration goes here
        tsconfig: './__tests__/tsconfig.json'
      },
    ],
  },
};