module.exports = {
  printWidth: 120,
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
  ]
};
