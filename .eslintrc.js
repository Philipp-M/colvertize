module.exports = {
  extends: ['airbnb-typescript/base', 'prettier'],
  parserOptions: { project: './tsconfig.eslint.json' },
  env: {
    jest: true,
  },
  rules: {
    'no-underscore-dangle': 'off',
    'max-classes-per-file': 'off',
    'no-bitwise': 'off',
    'no-iterator': 'off',
    'no-nested-ternary': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
    ],
  },
};
