import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 * The deploy workflow sets PAGES_BASE_PATH (e.g. "/ruhaniat_studio") so assets and
 * links work under the repository sub-path. Locally it is empty.
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
