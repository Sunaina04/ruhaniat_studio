import type { CategorySlug, Design } from "./types";

/**
 * Design catalogue.
 *
 * To add a design: copy one entry, give it a new unique `ref`, and set its `category`.
 * To use your own photograph: place it in /public/images/designs and set `image`,
 * e.g. image: "/images/designs/rs-001.jpg". Until then a sample illustration is shown.
 */
export const designs: Design[] = [
  // ── Daily Wear Suits ────────────────────────────────────────────────
  {
    ref: "RS-001",
    name: "Mulmul Morning Suit",
    category: "daily-wear-suits",
    description: "Soft mulmul kameez with a straight salwar and light dupatta for easy everyday wear.",
    details: ["Round neckline with piping", "Three-quarter sleeves", "Straight salwar", "Light mulmul dupatta"],
    silhouette: "salwar",
    tone: "sage",
    featured: true,
  },
  {
    ref: "RS-002",
    name: "Cotton Pintuck Kurta Set",
    category: "daily-wear-suits",
    description: "Breathable cotton kurta with pintuck yoke, paired with cigarette pants.",
    details: ["Pintuck front yoke", "Button placket", "Cigarette pants", "Side pockets"],
    silhouette: "straight",
    tone: "ivory",
  },
  {
    ref: "RS-003",
    name: "Printed Everyday Salwar Suit",
    category: "daily-wear-suits",
    description: "Block-print inspired suit with a comfortable cut for long days.",
    details: ["V-neckline with lace edge", "Elbow sleeves", "Relaxed salwar", "Cotton dupatta"],
    silhouette: "salwar",
    tone: "indigo",
  },
  {
    ref: "RS-004",
    name: "Pastel Straight Suit",
    category: "daily-wear-suits",
    description: "Clean straight-cut kameez in pastel tones with minimal neckline detailing.",
    details: ["Mandarin collar", "Full sleeves with button cuff", "Straight pants", "Chiffon dupatta"],
    silhouette: "straight",
    tone: "blush",
  },

  // ── Stylish Suits ───────────────────────────────────────────────────
  {
    ref: "RS-005",
    name: "Sweetheart Neck Anarkali",
    category: "stylish-suits",
    description: "Flowing anarkali with a sweetheart neckline and fitted bodice.",
    details: ["Sweetheart neckline", "Princess-line bodice", "Sheer sleeves", "Churidar"],
    silhouette: "anarkali",
    tone: "rani",
    featured: true,
  },
  {
    ref: "RS-006",
    name: "Bell Sleeve Kurta Set",
    category: "stylish-suits",
    description: "Statement bell sleeves with lace edging and a modern straight hem.",
    details: ["Square neckline", "Layered bell sleeves", "Lace trims", "Straight pants"],
    silhouette: "straight",
    tone: "mustard",
  },
  {
    ref: "RS-007",
    name: "Angrakha Overlap Suit",
    category: "stylish-suits",
    description: "Angrakha-style wrap front with tie-up tassels and a flared kameez.",
    details: ["Overlap angrakha front", "Tassel ties", "Flared kameez", "Palazzo or salwar"],
    silhouette: "anarkali",
    tone: "emerald",
  },
  {
    ref: "RS-008",
    name: "High Neck Yoke Suit",
    category: "stylish-suits",
    description: "High neck with embroidered yoke and cut-sleeve detailing.",
    details: ["High neck with keyhole", "Embroidered yoke", "Cut sleeves", "Straight salwar"],
    silhouette: "salwar",
    tone: "burgundy",
  },

  // ── Punjabi Salwar Suits ────────────────────────────────────────────
  {
    ref: "RS-009",
    name: "Classic Patiala Suit",
    category: "punjabi-salwar-suits",
    description: "Short kameez with a full-pleated Patiala salwar and phulkari-inspired dupatta.",
    details: ["Short kameez with side slits", "Full Patiala pleats", "Phulkari-style dupatta", "Round neck"],
    silhouette: "patiala",
    tone: "mustard",
    featured: true,
  },
  {
    ref: "RS-010",
    name: "Gota Border Salwar Kameez",
    category: "punjabi-salwar-suits",
    description: "Traditional salwar kameez finished with gota borders at hem and cuffs.",
    details: ["Gota hem border", "Gota cuffs", "Classic salwar", "Bordered dupatta"],
    silhouette: "salwar",
    tone: "rani",
  },
  {
    ref: "RS-011",
    name: "Kali Salwar Suit",
    category: "punjabi-salwar-suits",
    description: "Kali-panelled kameez with a soft salwar — traditional with a gentle flare.",
    details: ["Kali panels", "Boat neck", "Three-quarter sleeves", "Soft salwar"],
    silhouette: "salwar",
    tone: "sand",
  },
  {
    ref: "RS-012",
    name: "Dhoti Salwar Suit",
    category: "punjabi-salwar-suits",
    description: "Short kurti with a draped dhoti-style salwar for a festive Punjabi look.",
    details: ["Short kurti", "Dhoti-style salwar", "Mirror work neckline", "Contrast dupatta"],
    silhouette: "patiala",
    tone: "blush",
  },

  // ── Gharara Suits ───────────────────────────────────────────────────
  {
    ref: "RS-013",
    name: "Gota Band Gharara",
    category: "gharara-suits",
    description: "Classic gharara with the traditional gota band at the knee joint.",
    details: ["Knee-joint gota band", "Short kurti", "Gota dupatta", "Rich fabric flare"],
    silhouette: "gharara",
    tone: "emerald",
    featured: true,
  },
  {
    ref: "RS-014",
    name: "Pastel Festive Gharara",
    category: "gharara-suits",
    description: "Light pastel gharara with thread work — easy for day functions.",
    details: ["Thread-work kurti", "Light gharara flare", "Scalloped dupatta", "Sweetheart neck"],
    silhouette: "gharara",
    tone: "blush",
  },
  {
    ref: "RS-015",
    name: "Lucknowi Gharara Set",
    category: "gharara-suits",
    description: "Lucknowi-inspired kurti paired with a soft, generous gharara.",
    details: ["Chikankari-inspired kurti", "Soft gharara", "Organza dupatta", "Round neck"],
    silhouette: "gharara",
    tone: "ivory",
  },
  {
    ref: "RS-016",
    name: "Velvet Winter Gharara",
    category: "gharara-suits",
    description: "Rich velvet kurti with a contrast gharara for winter weddings.",
    details: ["Velvet kurti", "Zari detailing", "Contrast gharara", "Net dupatta"],
    silhouette: "gharara",
    tone: "burgundy",
  },

  // ── Sharara Suits ───────────────────────────────────────────────────
  {
    ref: "RS-017",
    name: "Mirror Work Sharara",
    category: "sharara-suits",
    description: "Short kurti with mirror work and a wide flared sharara.",
    details: ["Mirror-work kurti", "Wide sharara", "Tassel dupatta", "V-neck"],
    silhouette: "sharara",
    tone: "mustard",
  },
  {
    ref: "RS-018",
    name: "Peplum Sharara Set",
    category: "sharara-suits",
    description: "Peplum top with a flowing sharara for a modern festive look.",
    details: ["Peplum kurti", "Flared sharara", "Sheer dupatta", "Puff sleeves"],
    silhouette: "sharara",
    tone: "blush",
    featured: true,
  },
  {
    ref: "RS-019",
    name: "Long Kameez Sharara",
    category: "sharara-suits",
    description: "Knee-length kameez balanced over a graceful sharara.",
    details: ["Knee-length kameez", "Embroidered neckline", "Sharara", "Bordered dupatta"],
    silhouette: "sharara",
    tone: "indigo",
  },
  {
    ref: "RS-020",
    name: "Mehndi Sharara",
    category: "sharara-suits",
    description: "Bright, playful sharara designed with mehndi functions in mind.",
    details: ["Gota-patti kurti", "Layered sharara", "Bright dupatta", "Short sleeves"],
    silhouette: "sharara",
    tone: "sage",
  },

  // ── Palazzo Suits ───────────────────────────────────────────────────
  {
    ref: "RS-021",
    name: "Straight Kurta Palazzo",
    category: "palazzo-suits",
    description: "Long straight kurta with a wide palazzo — modern and relaxed.",
    details: ["Long straight kurta", "Wide palazzo", "Notched neckline", "Side slits"],
    silhouette: "palazzo",
    tone: "indigo",
    featured: true,
  },
  {
    ref: "RS-022",
    name: "Lace Hem Palazzo Set",
    category: "palazzo-suits",
    description: "Palazzo with a lace hem paired with a short A-line kurta.",
    details: ["A-line kurta", "Lace hem palazzo", "Cotton dupatta", "Round neck"],
    silhouette: "palazzo",
    tone: "ivory",
  },
  {
    ref: "RS-023",
    name: "Front Slit Palazzo Suit",
    category: "palazzo-suits",
    description: "Front-slit kurta over flowing palazzo for an elongated line.",
    details: ["Front slit kurta", "Flowing palazzo", "Collared neckline", "Full sleeves"],
    silhouette: "palazzo",
    tone: "burgundy",
  },
  {
    ref: "RS-024",
    name: "Festive Palazzo Set",
    category: "palazzo-suits",
    description: "Embroidered kurta with a matching palazzo for festive evenings.",
    details: ["Embroidered kurta", "Matching palazzo", "Organza dupatta", "Square neck"],
    silhouette: "palazzo",
    tone: "mustard",
  },

  // ── Modern Bibiyaan De Designs ─────────────────────────────────────────
  {
    ref: "RS-025",
    name: "Bibi Ji Da Kurta Salwar",
    category: "modern-bibiyaan-de-designs",
    description: "Loose old-style kameez with a full traditional salwar, the way it was always worn.",
    details: ["Loose traditional kameez", "Full old-style salwar", "Round neck with tie-dori", "Plain cotton dupatta"],
    silhouette: "salwar",
    tone: "heritage",
    featured: true,
  },
  {
    ref: "RS-026",
    name: "Phulkari Heritage Suit",
    category: "modern-bibiyaan-de-designs",
    description: "Simple suit carried by a phulkari-inspired dupatta — Punjab's own embroidery.",
    details: ["Phulkari-inspired dupatta", "Straight kameez", "Traditional salwar", "Classic V-neck"],
    silhouette: "salwar",
    tone: "mustard",
    featured: true,
  },
  {
    ref: "RS-027",
    name: "Kalidar Kurta with Cuffs",
    category: "modern-bibiyaan-de-designs",
    description: "Kalidar kameez with old-fashioned cuffed sleeves and a band collar.",
    details: ["Kalidar panels", "Traditional sleeve cuffs", "Band collar", "Old-style salwar"],
    silhouette: "salwar",
    tone: "heritage",
    featured: true,
  },
  {
    ref: "RS-028",
    name: "Tilla Border Vintage Suit",
    category: "modern-bibiyaan-de-designs",
    description: "Vintage-cut suit with tilla borders, inspired by family wedding albums.",
    details: ["Tilla border work", "Vintage kameez length", "Square neck with piping", "Gota dupatta"],
    silhouette: "patiala",
    tone: "burgundy",
  },

  // ── Latest Designs ──────────────────────────────────────────────────
  {
    ref: "RS-029",
    name: "Co-ord Kurta Set",
    category: "latest-designs",
    description: "Tonal co-ord kurta set with a clean modern finish.",
    details: ["Tonal co-ord", "Notched neck", "Straight pants", "Minimal styling"],
    silhouette: "straight",
    tone: "sand",
    featured: true,
  },
  {
    ref: "RS-030",
    name: "Cape Sleeve Suit",
    category: "latest-designs",
    description: "Sheer cape sleeves over a fitted kameez — contemporary and graceful.",
    details: ["Sheer cape sleeves", "Fitted kameez", "Cigarette pants", "Optional dupatta"],
    silhouette: "straight",
    tone: "rani",
  },
  {
    ref: "RS-031",
    name: "Tiered Anarkali",
    category: "latest-designs",
    description: "Tiered anarkali with soft gathers and a modern neckline.",
    details: ["Tiered skirt", "Plunge neckline", "Puff sleeves", "Churidar"],
    silhouette: "anarkali",
    tone: "sage",
  },
  {
    ref: "RS-032",
    name: "Asymmetric Hem Suit",
    category: "latest-designs",
    description: "Asymmetric hem kameez over palazzo for a fresh silhouette.",
    details: ["Asymmetric hem", "Collarless neck", "Palazzo", "Lightweight dupatta"],
    silhouette: "palazzo",
    tone: "blush",
  },

  // ── Bridal & Occasion Wear ──────────────────────────────────────────
  {
    ref: "RS-033",
    name: "Engagement Anarkali",
    category: "bridal-occasion-wear",
    description: "Floor-length anarkali designed for engagement and roka ceremonies.",
    details: ["Floor-length anarkali", "Zari neckline", "Net dupatta", "Churidar"],
    silhouette: "anarkali",
    tone: "blush",
  },
  {
    ref: "RS-034",
    name: "Punjabi Bridal Lehenga",
    category: "bridal-occasion-wear",
    description: "Traditional bridal lehenga with a choli and heavy bordered dupatta.",
    details: ["Flared lehenga", "Fitted choli", "Heavy border dupatta", "Made to measure"],
    silhouette: "lehenga",
    tone: "burgundy",
    featured: true,
  },
  {
    ref: "RS-035",
    name: "Wedding Guest Sharara",
    category: "bridal-occasion-wear",
    description: "Elegant sharara for wedding functions and receptions.",
    details: ["Embellished kurti", "Wide sharara", "Statement dupatta", "Sweetheart neck"],
    silhouette: "sharara",
    tone: "emerald",
  },
  {
    ref: "RS-036",
    name: "Anand Karaj Suit",
    category: "bridal-occasion-wear",
    description: "Graceful, traditional suit for the Anand Karaj, with a covered neckline.",
    details: ["Traditional salwar suit", "Covered neckline", "Heavy dupatta", "Rich embroidery"],
    silhouette: "salwar",
    tone: "rani",
  },
];

export function getDesign(ref: string) {
  return designs.find((d) => d.ref.toLowerCase() === ref.toLowerCase());
}

export function designsByCategory(slug: CategorySlug) {
  return designs.filter((d) => d.category === slug);
}

export function featuredDesigns(limit?: number) {
  const list = designs.filter((d) => d.featured);
  return limit ? list.slice(0, limit) : list;
}
