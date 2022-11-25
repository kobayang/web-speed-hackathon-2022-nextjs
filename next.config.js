/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    runtime: "experimental-edge",
  },
};

module.exports = nextConfig;
