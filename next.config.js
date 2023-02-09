/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'www.mikiyakobayashi.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
