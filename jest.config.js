const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.spec.ts', '**/__tests__/**/*.spec.tsx'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1'
  },
  testPathIgnorePatterns: ['<rootDir>/__tests__/fixtures/'],
  // collectCoverage: true,
  // collectCoverageFrom: ['**/src/**/*.{ts,tsx}', '!**/__tests__/**'],
  // collectCoverageFrom: ['**/src/**', '!**/__tests__/**'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/constants.ts',
    '!src/pageBlockDefs.ts'
  ],
  testEnvironment: 'jest-environment-jsdom'
};

module.exports = createJestConfig(customJestConfig);
