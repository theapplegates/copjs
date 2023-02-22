const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');

const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true, // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  trailingSlash: true, // https://nextjs.org/docs/api-reference/next.config.js/trailing-slash

  // https://nextjs.org/docs/api-reference/next.config.js/images
  images: {
    domains: [
      'localhost',
      'cdn.discordapp.com',
      'avatars.githubusercontent.com'
    ], // Add your domains here
    formats: ['image/webp'] // Add your formats here
  },

  // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
  webpack: config => {
    config.plugins.push(new WindiCSSWebpackPlugin()); // Add the plugin to the existing webpack plugins array (config.plugins)

    // Return the modified config
    return config;
  }
};

module.exports = nextConfig;
