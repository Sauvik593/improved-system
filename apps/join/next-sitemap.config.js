module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://new-join.kyero.test',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'public/static',
  exclude: ['/*/404', '/404'],
};
