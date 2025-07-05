// @ts-check

/**
 * @see https://prettier.io/docs/configuration
 * @type {import('prettier').Config}
 */
const config = {
  // Remember to use `pnpm format` to format the codebase when you change this file.
  semi: false,
  singleQuote: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^next.*$',
    '^react.*$',
    '<THIRD_PARTY_MODULES>',
    '^./(.*)$',
    '^\\.\\/(.*)$',
    '^\\.\\.\\/(.*)$',
    '^@/(.*)$',
  ],
  importOrderSortSpecifiers: true,
}

export default config
