/**
 * Central brand settings. Edit this file (or set the environment variables
 * noted below) to update contact details across the whole website.
 */
export const siteConfig = {
  name: "Ruhaniat Studio",
  nameGurmukhi: "ਰੂਹਾਨੀਅਤ",
  tagline: "Tradition in Every Thread. Style in Every Stitch.",
  headline: "From Timeless Punjabi Classics to Today's Trends.",
  description:
    "Punjabi suit designs and custom stitching — daily wear, salwar, gharara, sharara and palazzo suits stitched to your measurements. Worldwide shipping.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ruhaniatstudio.com",

  /**
   * WhatsApp number in international format, digits only (no +, spaces or dashes).
   * Example for India: 919876543210. Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local
   * or replace the fallback value here.
   */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918284948195",

  /** Default WhatsApp greeting used by general enquiry buttons. */
  whatsappDefaultMessage:
    "Hello Ruhaniat Studio, I would like to know more about your custom stitching.",

  /** Optional — leave empty to hide. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "sruhaniat13@gmail.com",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",

  /**
   * Optional form endpoint (e.g. Formspree, Getform, or your own API).
   * When set, the enquiry form also posts its data + reference image here.
   * When empty, the form sends the enquiry through WhatsApp only.
   */
  enquiryEndpoint: process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? "",
} as const;

export const mainNav = [
  { label: "Collections", href: "/collections" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Journal", href: "/journal" },
  { label: "Custom Stitching", href: "/custom-stitching" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
