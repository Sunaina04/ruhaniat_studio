export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { designs } from "@/data/designs";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const pages = ["", "/collections", "/custom-stitching", "/about", "/contact"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const cats = categories.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  const items = designs.map((d) => ({
    url: `${base}/designs/${d.ref.toLowerCase()}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...cats, ...items];
}
