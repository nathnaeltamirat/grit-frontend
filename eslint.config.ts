import js from '@eslint/js';

import prettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import pluginQuery from '@tanstack/eslint-plugin-query';
export default [
  js.configs.recommended,
  ...pluginQuery.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  {
    ignores: ['dist'],
  },
  {
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'react/no-unescaped-entities': 'off',
      'react/prop-types': 'off',
    },
  },

  reactPlugin.configs.flat['jsx-runtime'],
  prettier,
];
