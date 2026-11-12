/**
 * Prefixes files from /public with the site's base path (needed on GitHub Pages,
 * where the site lives under /ruhaniat_studio). External URLs are left as they are.
 */
export function assetPath(src: string) {
  return src.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}` : src;
}
