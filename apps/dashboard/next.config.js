const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('./with-nx.js.js').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withNx(nextConfig);
