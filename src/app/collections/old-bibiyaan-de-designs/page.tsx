import type { Metadata } from "next";
import Link from "next/link";
import { assetPath } from "@/lib/assets";

/**
 * The collection was renamed to "Modern Bibiyaan De Designs". GitHub Pages can't send
 * server redirects, so this page forwards visitors and tells search engines the new URL.
 */
const NEW_PATH = "/collections/modern-bibiyaan-de-designs/";

export const metadata: Metadata = {
  title: "Modern Bibiyaan De Designs",
  alternates: { canonical: NEW_PATH },
  robots: { index: false, follow: true },
};

export default function OldBibiyaanRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${assetPath(NEW_PATH)}`} />
      <section className="container-luxe py-24 text-center">
        <p className="text-muted">
          This collection has moved to{" "}
          <Link href={NEW_PATH} className="text-burgundy underline underline-offset-4">
            Modern Bibiyaan De Designs
          </Link>
          .
        </p>
      </section>
    </>
  );
}
