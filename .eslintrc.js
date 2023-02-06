/**
 * These rules enforce Hack Reactor's style guide.
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: ['react', 'jest'],
  rules: {
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'import/extensions': 0,
    'react/jsx-one-expression-per-line': 0,
    'consistent-return': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'comma-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'no-nested-ternary': 0,
    camelcase: 0,
    'operator-linebreak': 0,
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'react/jsx-filename-extension': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
