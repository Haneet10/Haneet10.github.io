import type { NextConfig } from "next";

// Static export: the whole site is plain HTML/CSS/JS served from GitHub Pages.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
