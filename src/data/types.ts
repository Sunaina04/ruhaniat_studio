/** Garment outline used for the sample illustration until a real photo is added. */
export type Silhouette =
  | "salwar"
  | "patiala"
  | "palazzo"
  | "sharara"
  | "gharara"
  | "anarkali"
  | "lehenga"
  | "straight";

/** Colour story for the sample illustration. */
export type Tone =
  | "blush"
  | "ivory"
  | "burgundy"
  | "mustard"
  | "sage"
  | "rani"
  | "indigo"
  | "sand"
  | "emerald"
  | "heritage";

export type CategorySlug =
  | "daily-wear-suits"
  | "stylish-suits"
  | "punjabi-salwar-suits"
  | "gharara-suits"
  | "sharara-suits"
  | "palazzo-suits"
  | "modern-bibiyaan-de-designs"
  | "latest-designs"
  | "bridal-occasion-wear";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Short line used on cards. */
  tagline: string;
  /** Paragraph used at the top of the category page. */
  description: string;
  /** Used for SEO meta description. */
  seoDescription: string;
  /** Illustration settings for category cards. */
  silhouette: Silhouette;
  tone: Tone;
  /** Optional cover photograph — e.g. "/images/categories/daily-wear.jpg". */
  image?: string;
}

export interface Design {
  /** Unique reference used in enquiries, e.g. "RS-001". */
  ref: string;
  name: string;
  category: CategorySlug;
  description: string;
  /** A few styling details shown on the design page. */
  details: string[];
  silhouette: Silhouette;
  tone: Tone;
  /**
   * Path to your own photograph inside /public, e.g. "/images/designs/rs-001.jpg".
   * Leave empty to show the sample illustration.
   */
  image?: string;
  /** Show on the homepage "featured" rails. */
  featured?: boolean;
}
