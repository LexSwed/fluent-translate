/* eslint-env node */

module.exports = {
  modules: true,
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
