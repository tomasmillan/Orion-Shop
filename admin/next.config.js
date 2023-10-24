/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "rshop-next-ecommerce.s3.amazonaws.com",
    ], // Agrega el dominio de origen de la imagen aquí
  },
  distDir: 'build', 
};

module.exports = nextConfig;
