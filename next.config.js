/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'links.papareact.com',
      'aiimagegeneratormi5421d4.blob.core.windows.net',
    ],
  },
};

module.exports = nextConfig;
