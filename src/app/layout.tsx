import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Noto_Serif_Gurmukhi } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RevealObserver } from "@/components/motion";
import { siteConfig } from "@/config/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const gurmukhi = Noto_Serif_Gurmukhi({
  variable: "--font-noto-gurmukhi",
  subsets: ["gurmukhi"],
  preload: false,
  weight: ["400", "500"],
  display: "swap",
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
