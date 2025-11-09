import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import typescriptParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'
import { getBaseRules, customPlugin } from './eslint.js'

const recommendedConfigs = [
  js.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  prettierConfig,
]

const languageOptions = {
  ecmaVersion: 'latest',
  globals: globals.browser,
  parser: typescriptParser,
  parserOptions: {
    projectService: true,
    tsconfigRootDir: new URL('../..', import.meta.url).pathname,
  },
}

export default defineConfig([
  globalIgnores(['dist', 'build', 'coverage', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: recommendedConfigs,
    languageOptions,
    plugins: { import: importPlugin, custom: customPlugin },
    rules: getBaseRules(),
  },
  // TODO : MAKE THIS SCALABLE
  {
    files: ['*.config.{js,ts}', 'vite.config.ts'],
    rules: { 'custom/no-default-or-namespace-import-export': 'off' },
  },
])
