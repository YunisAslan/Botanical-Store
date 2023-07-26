/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

module.exports = withPWA(nextConfig);
