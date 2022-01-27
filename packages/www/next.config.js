const withTM = require('next-transpile-modules')([
  '@fluent-translate/shared',
  '@fluent-translate/extension',
]);

module.exports = withTM({
  experimental: {
    externalDir: true,
  },
});
