import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['**/node_modules/', '.dist/'],
    rules: {
      'no-unused-vars': 'warn',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      // 'no-undef': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  { languageOptions: { globals: globals.browser } },
  // pluginJs.configs.recommended,
  // ...tseslint.configs.recommended,
];
