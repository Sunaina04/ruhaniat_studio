import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Noto_Serif_Gurmukhi } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
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
    default: `${siteConfig.name} — Punjabi Ethnic Wear & Custom Stitching`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Punjabi suits",
    "custom stitching",
    "salwar kameez",
    "Patiala suit",
    "gharara suit",
    "sharara suit",
    "palazzo suit",
    "traditional Punjabi suits",
    "old Punjabi suit designs",
    "bridal Punjabi suit",
    "Ruhaniat Studio",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  slogan: siteConfig.tagline,
  description: siteConfig.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
