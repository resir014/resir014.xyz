/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_BASE_URL || process.env.DEPLOY_PRIME_URL || 'https://resir014.xyz',
  generateRobotsTxt: true,
  exclude: ['/etc/something-amazing'],
};
