import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

module.exports = nextConfig;