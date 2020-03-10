/* eslint-env node */

module.exports = {
  singleQuote: true,
  trailingComma: 'none',
  tabWidth: 2,
  useTabs: false,
  quoteProps: 'consistent',
  overrides: [
    {
      files: ['.prettierrc', '*.json'],
      options: {
        printWidth: 200
      }
    }
  ],
  plugins: ['prettier-plugin-svelte'],
  svelteSortOrder: 'scripts-markup-styles'
};
