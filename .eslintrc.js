module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-unused-expressions': 'error',
    'no-useless-return': 'error',
    'no-shadow': 'warn',
    'no-extra-semi': 'error',
    'eqeqeq': ['warn', 'always'],
    'semi': ['error', 'always'],
    'indent': ['error', 2],
  }
};
