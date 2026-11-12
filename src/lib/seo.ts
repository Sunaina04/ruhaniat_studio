import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Builds consistent metadata for a page: title, description, canonical URL,
 * Open Graph and Twitter/X cards. Sharing images come from the
 * og.png routes in src/app (1200×630, generated at build time).
 *
 * `path` is the page URL relative to the site root, with a trailing slash
 * (e.g. "/journal/"), matching `trailingSlash: true` in next.config.ts.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  noindex = false,
  image = "/og.png",
}: {
  /** Shown as "<title> | Ruhaniat Studio". Keep it under ~45 characters. */
  title?: string;
  /** 120–160 characters works best in search results. */
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
  /** Sharing image path, e.g. "/journal/my-article/og.png". Defaults to the site image. */
  image?: string;
}): Metadata {
  const images = [{ url: image, width: 1200, height: 630, alt: title ?? siteConfig.name, type: "image/png" }];
  const shareTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.tagline}`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: siteConfig.name,
      locale: "en_IN",
      title: shareTitle,
      description,
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [image] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Shortens text to fit a meta description, ending on a whole word. */
export function clamp(text: string, max = 158) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:—-]\s*$/, "") + "…";
}

/** Absolute URL for a site path, including the GitHub Pages base path. */
export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

/** BreadcrumbList structured data. The last item is the current page. */
export function breadcrumbJsonLd(items: { name: string; path?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.path ? { item: absoluteUrl(it.path) } : {}),
    })),
  };
}
