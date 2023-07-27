/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  runtimeCaching,
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
