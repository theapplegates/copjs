/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'http://localhost:3000', // Required for sitemap and robots.txt generation
  generateRobotsTxt: true, // Optional (true by default) - Generates /robots.txt
  exclude: [
    '**/auth/error',
    '**/404',
    '**/500',
    '**/housekeeping',
    '**/backend',
    '**/admin'
  ] // Optional - Exclude specific pages or groups of pages (see below) from the sitemap (defaults to [])
};
