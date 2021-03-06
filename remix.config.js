/**
 * @type {import('@remix-run/dev').AppConfig}
 */

module.exports = {
  serverBuildTarget: 'cloudflare-pages',
  server: './server.js',
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: [".*", "**/*.test.tsx"],
  // serverBuildPath: 'functions/build.js',
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "functions/[[path]].js",
  // publicPath: "/build/",
  // devServerPort: 8002
};
