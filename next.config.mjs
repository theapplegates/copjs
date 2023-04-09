// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin';

// eslint-disable-next-line no-unused-expressions, import/extensions
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env.mjs'));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  trailingSlash: true, // https://nextjs.org/docs/api-reference/next.config.js/trailing-slash

  experimental: {
    appDir: true
  },

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

export default nextConfig;
