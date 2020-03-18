/* eslint-env node */

module.exports = {
  singleQuote: true,
  trailingComma: 'none',
  tabWidth: 2,
  useTabs: false,
  quoteProps: 'consistent',
  overrides: [
    {
      files: ['*.html'],
      options: {
        printWidth: 140
      }
    }
  ],
  plugins: ['prettier-plugin-svelte'],
  svelteSortOrder: 'scripts-markup-styles'
};
