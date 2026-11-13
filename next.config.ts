import type { NextConfig } from "next";

/**
 * Static export, deployed on Vercel (main site) and GitHub Pages.
 *
 * - GitHub Pages: the workflow sets PAGES_BASE_PATH (e.g. "/ruhaniat_studio") so assets
 *   and links work under the repository sub-path, and NEXT_PUBLIC_SITE_URL to the
 *   Vercel address so search engines treat Vercel as the main site.
 * - Vercel: no base path; the site URL comes from NEXT_PUBLIC_SITE_URL if set, otherwise
 *   from Vercel's VERCEL_PROJECT_PRODUCTION_URL (your *.vercel.app or custom domain).
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: siteUrl },
};

export default nextConfig;
