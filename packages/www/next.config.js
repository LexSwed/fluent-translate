// next.config.js
module.exports = {
  experimental: {
    externalDir: true,
  },
  webpack: config => {
    config.resolve.alias["react/jsx-runtime"] = require.resolve("react/jsx-runtime")
    config.resolve.alias["react/jsx-dev-runtime"] = require.resolve("react/jsx-dev-runtime")
    return config
  },
}