/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  pwa: {
    dest: "public",
  },
};

module.exports = withPWA(nextConfig);
