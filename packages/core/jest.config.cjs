module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/index.ts',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.{ts,tsx}',
    '<rootDir>/src/**/*.test.{ts,tsx}',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { 
      useESM: true,
      tsconfig: 'tsconfig.jest.json'
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};