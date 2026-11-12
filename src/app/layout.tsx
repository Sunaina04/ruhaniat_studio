import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RevealObserver } from "@/components/motion";
import { siteConfig } from "@/config/site";
import "./globals.css";

// Fonts are stored in the project (src/assets/fonts/web, SIL Open Font License),
// so builds never depend on downloading from Google Fonts.
const cormorant = localFont({
  variable: "--font-cormorant",
  src: [
    { path: "../assets/fonts/web/CormorantGaramond.woff2", weight: "400 600", style: "normal" },
    { path: "../assets/fonts/web/CormorantGaramond-Italic.woff2", weight: "400 600", style: "italic" },
  ],
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const jost = localFont({
  variable: "--font-jost",
  src: "../assets/fonts/web/Jost.woff2",
  weight: "300 500",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const gurmukhi = localFont({
  variable: "--font-noto-gurmukhi",
  src: "../assets/fonts/web/NotoSerifGurmukhi.woff2",
  weight: "400 500",
  preload: false,
  display: "swap",
  fallback: ["serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Punjabi Suit Designs & Custom Stitching`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Punjabi suit designs",
    "custom Punjabi suit stitching",
    "daily wear Punjabi suits",
    "stylish salwar suits",
    "traditional Punjabi salwar designs",
    "Patiala salwar suit",
    "gharara stitching",
    "sharara stitching",
    "palazzo suit",
    "custom ethnic wear",
    "phulkari dupatta",
    "old Punjabi suit designs",
    "Ruhaniat Studio",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: "en_IN",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteConfig.name, type: "image/png" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  // Each page sets its own canonical URL through pageMetadata().
};

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
};

// Only verified business details: no address, ratings or reviews.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: `${siteConfig.url}/`,
      inLanguage: "en",
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: `${siteConfig.url}/`,
      logo: `${siteConfig.url}/brand/ruhaniat-logo.png`,
      image: `${siteConfig.url}/og.png`,
      slogan: siteConfig.tagline,
      description: siteConfig.description,
      email: siteConfig.email || undefined,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+${siteConfig.whatsappNumber}`,
        contactType: "customer service",
        availableLanguage: ["English", "Punjabi", "Hindi"],
      },
      areaServed: "Worldwide",
      sameAs: siteConfig.instagram ? [siteConfig.instagram] : undefined,
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}.img-fade{opacity:1!important}"}</style>
        </noscript>
      </head>
      <body className={`${cormorant.variable} ${jost.variable} ${gurmukhi.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only z-50 bg-burgundy px-4 py-2 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <RevealObserver />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
