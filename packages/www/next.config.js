const withTM = require('next-transpile-modules')([
  '@edge-translate/shared',
  '@edge-translate/extension',
]);

module.exports = withTM({
  experimental: {
    externalDir: true,
  },
});
