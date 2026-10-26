// React rules don't apply to Astro templates (`class`, `Fragment`, keyless lists, ...).
const reactRulesOff = Object.fromEntries(
  Object.keys(require('eslint-plugin-react').rules).map(rule => [`react/${rule}`, 'off'])
);

module.exports = {
  root: true,
  extends: [
    'kentcdodds',
    'kentcdodds/react',
    'kentcdodds/jsx-a11y',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'new-cap': 'off',
    'no-await-in-loop': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/no-invalid-html-attribute': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        'import/consistent-type-specifier-style': 'off',
      },
    },
    {
      files: ['**/*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      extends: ['plugin:astro/recommended', 'plugin:astro/jsx-a11y-recommended'],
      rules: {
        ...reactRulesOff,
        'import/consistent-type-specifier-style': 'off',
      },
    },
  ],
};
