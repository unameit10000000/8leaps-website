// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.LOCAL_URL || "https://8leaps.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
};
