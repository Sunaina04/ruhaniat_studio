import type { Category, CategorySlug } from "./types";

/**
 * Collections shown across the site. The order here is the order they appear.
 * To add a cover photo, put the file in /public/images/categories and set `image`.
 */
export const categories: Category[] = [
  {
    slug: "daily-wear-suits",
    name: "Daily Wear Suits",
    tagline: "Simple, comfortable and elegant for every day.",
    description:
      "Breathable cottons, soft mulmul and easy cuts made for long days — at home, at work or out with family. Simple Punjabi suits that feel good to wear and still look beautifully finished.",
    seoDescription:
      "Comfortable everyday Punjabi suits in cotton and mulmul, custom stitched to your measurements by Ruhaniat Studio.",
    silhouette: "straight",
    tone: "sage",
  },
  {
    slug: "stylish-suits",
    name: "Stylish Suits",
    tagline: "Fashionable cuts, modern necklines and unique sleeves.",
    description:
      "For the woman who likes her suit to say something. Statement necklines, sculpted sleeves, interesting yokes and modern finishes — each idea can be adapted to your fabric and comfort.",
    seoDescription:
      "Stylish Punjabi suit designs with modern necklines, sleeves and cuts — custom stitched by Ruhaniat Studio.",
    silhouette: "anarkali",
    tone: "rani",
  },
  {
    slug: "punjabi-salwar-suits",
    name: "Punjabi Salwar Suits",
    tagline: "The classic salwar kameez, done properly.",
    description:
      "Traditional Punjabi salwar kameez in the cuts we all grew up with — full salwars, Patiala pleats, side slits and well-balanced kameez lengths, stitched with care for fall and fit.",
    seoDescription:
      "Traditional Punjabi salwar kameez and Patiala suit designs, custom stitched to measure by Ruhaniat Studio.",
    silhouette: "patiala",
    tone: "mustard",
  },
  {
    slug: "gharara-suits",
    name: "Gharara Suits",
    tagline: "Traditional and contemporary gharara styles.",
    description:
      "The knee-joint flare of a gharara has a grace of its own. From classic gota-banded ghararas to lighter contemporary versions for functions and festivals.",
    seoDescription:
      "Traditional and contemporary gharara suit designs for festivals and functions — custom stitched by Ruhaniat Studio.",
    silhouette: "gharara",
    tone: "emerald",
  },
  {
    slug: "sharara-suits",
    name: "Sharara Suits",
    tagline: "Elegant flared sharara designs.",
    description:
      "Wide, flowing sharara pants paired with short kurtis or longer kameez. Easy to move in, lovely in photographs and versatile from mehndi to family dinners.",
    seoDescription:
      "Elegant flared sharara suit designs, custom stitched to your measurements by Ruhaniat Studio.",
    silhouette: "sharara",
    tone: "blush",
  },
  {
    slug: "palazzo-suits",
    name: "Palazzo Suits",
    tagline: "Modern, comfortable palazzo combinations.",
    description:
      "Straight-falling palazzos with kurtas of every length — a relaxed modern alternative to the salwar that still feels rooted in Punjabi dressing.",
    seoDescription:
      "Modern and comfortable palazzo suit designs, custom stitched by Ruhaniat Studio.",
    silhouette: "palazzo",
    tone: "indigo",
  },
  {
    slug: "modern-bibiyaan-de-designs",
    name: "Modern Bibiyaan De Designs",
    tagline: "A touch of our Punjabi heritage.",
    description:
      "The suits our mothers, naniyan and dadiyan wore — old-style salwars, classic necklines, traditional cuffs, hand embroidery and vintage cuts. We bring these heritage styles back, stitched with the same respect for tradition.",
    seoDescription:
      "Modern Bibiyaan De Designs — old Punjabi suit designs from earlier generations: full salwars, classic necklines and vintage embroidery, stitched today.",
    silhouette: "salwar",
    tone: "heritage",
  },
  {
    slug: "latest-designs",
    name: "Latest Designs",
    tagline: "Contemporary designs and new inspirations.",
    description:
      "Fresh ideas we are excited about right now — current silhouettes, new detailing and contemporary takes on Punjabi wear. This collection keeps changing as new designs come in.",
    seoDescription:
      "Latest Punjabi suit designs and contemporary ethnic wear inspirations, custom stitched by Ruhaniat Studio.",
    silhouette: "anarkali",
    tone: "sand",
  },
  {
    slug: "bridal-occasion-wear",
    name: "Bridal & Occasion Wear",
    tagline: "For weddings, engagements and special days.",
    description:
      "Outfits for the days you will remember — engagement suits, wedding-function looks and festive wear, including bridal pieces for brides who want something personal and made to measure.",
    seoDescription:
      "Bridal, wedding and occasion wear — Punjabi suits and lehengas custom stitched by Ruhaniat Studio.",
    silhouette: "lehenga",
    tone: "burgundy",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function categoryName(slug: CategorySlug) {
  return getCategory(slug)?.name ?? slug;
}
