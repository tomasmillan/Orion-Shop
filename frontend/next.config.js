/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['rshop-next-ecommerce.s3.amazonaws.com', 'img.freepik.com'],
  },
  distDir: 'build', 
  server: {
    port: 3001,
  },
};

module.exports = nextConfig;
