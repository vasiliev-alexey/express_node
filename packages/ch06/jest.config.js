/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  projects: [
    {
      displayName: 'node',
      clearMocks: true,
      resetMocks: true,
      testEnvironment: 'node',
      coverageThreshold: {
        global: {
          branches: 60,
          functions: 60,
          lines: 60,
          statements: 60,
        },
      },
      //  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
      testMatch: ['**/*.test.ts'],
      globals: {
        'ts-jest': {
          diagnostics: false,
        },
      },
      preset: 'ts-jest',
      transform: {
        '^.+\\.tsx$': 'ts-jest',
      },
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    },
  ],
};
