import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return {
    name: siteConfig.name,
    short_name: "Ruhaniat",
    description: siteConfig.description,
    start_url: `${base}/`,
    display: "browser",
    background_color: "#fbf7f0",
    theme_color: "#6e1e2f",
    icons: [
      { src: `${base}/icon.svg`, sizes: "any", type: "image/svg+xml" },
      { src: `${base}/apple-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  };
}
