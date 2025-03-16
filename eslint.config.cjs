const globals = require('globals');
const react = require('eslint-plugin-react');
const prettier = require('eslint-plugin-prettier');
const _import = require('eslint-plugin-import');
const reactHooks = require('eslint-plugin-react-hooks');
const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat');
const reactRefresh = require('eslint-plugin-react-refresh');
const jsxA11Y = require('eslint-plugin-jsx-a11y');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

const customEslintConfig = {
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 2020,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    '@typescript-eslint': tseslint,
    react: fixupPluginRules(react),
    prettier: fixupPluginRules(prettier),
    import: fixupPluginRules(_import),
    'react-hooks': fixupPluginRules(reactHooks),
    'react-refresh': reactRefresh,
    'jsx-a11y': jsxA11Y,
  },
  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],

    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],

    'import/no-unresolved': [
      'error',
      {
        caseSensitive: false,
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],

    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',

    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};

module.exports = [
  {
    ignores: ['**/node_modules', '**/dist', '**/build', 'postcss.config.mjs'],
  },
  ...fixupConfigRules(customEslintConfig),
];
