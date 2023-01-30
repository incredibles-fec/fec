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
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: ['react'],
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
    camelcase: 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
