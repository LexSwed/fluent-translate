/* eslint-env node */

module.exports = {
  plugins: {
    'cssnano': {},
    'postcss-preset-env': {
      autoprefixer: {},
      stage: 3,
      features: {
        'custom-properties': false,
        'nesting-rules': true
      }
    }
  }
};
