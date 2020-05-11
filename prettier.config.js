/* eslint-env node */

module.exports = {
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  quoteProps: 'consistent',
  overrides: [
    {
      files: ['*.html'],
      options: {
        printWidth: 140,
      },
    },
  ],
  svelteSortOrder: 'scripts-markup-styles',
};
