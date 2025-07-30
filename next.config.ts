import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withMDX = require("@next/mdx")()

module.exports = withMDX({
  pageExtensions: ["ts", "tsx", "md", "mdx"],
})

export default nextConfig;
