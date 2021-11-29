module.exports = {
  env: {
    es2021: true,
  },
  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint', 'eslint-plugin-import', 'prettier'],

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {},

  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        version: '>=13.0.0',
        ignores: ['modules'],
      },
    ],

    'no-console': 'warn',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
      },
    ],

    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'off',
      { devDependencies: ['**/*.test.js'] },
    ],

    'import/extensions': ['warn', 'never', { json: 'off' }], // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
  },
};
