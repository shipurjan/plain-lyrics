// @ts-check
import js from '@eslint/js'
import pluginNext from '@next/eslint-plugin-next'
import eslintParserTypeScript from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const config = tseslint.config([
  {
    ignores: [
      'node_modules/**/*',
      '.next/**/*',
      'out/**/*',
      '*.config.*[t|j]s',
    ],
  },
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: [js.configs.recommended],
  },
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.{ts,tsx,cts,mts}'],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        project: true,
      },
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    rules: eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/global.css',
      },
    },
  },
  {
    plugins: {
      '@next/next': pluginNext,
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    // @ts-expect-error wrong type of next rules
    rules: pluginNext.configs.recommended.rules,
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  pluginReact.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])

export default config
