export interface Review {
  /** Customer's name as they are happy to have it shown, e.g. "Harpreet K." */
  name: string;
  /** Optional town or city, e.g. "Ludhiana". */
  location?: string;
  /** The review in the customer's own words. */
  text: string;
  /** Optional 1–5 star rating. */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Optional design reference or outfit, e.g. "RS-009" or "Sharara suit". */
  outfit?: string;
  /** Optional customer photo in /public, e.g. "/images/reviews/harpreet.jpg". */
  image?: string;
}

/**
 * Real customer reviews only — add them here as you receive them (with the
 * customer's permission). While this list is empty, the website shows a
 * "share your review" message instead of reviews.
 *
 * Example:
 * {
 *   name: "Harpreet K.",
 *   location: "Ludhiana",
 *   text: "The fitting was perfect and the neckline came out exactly like my picture.",
 *   rating: 5,
 *   outfit: "RS-009 Classic Patiala Suit",
 * },
 */
export const reviews: Review[] = [];

/**
 * Placeholder reviews used ONLY while running `npm run dev`, so you can see how the
 * section looks. They are clearly marked "Sample" and never appear on the live site.
 */
export const previewReviews: Review[] = [
  {
    name: "Sample Customer",
    location: "Sample city",
    text: "This is a sample review to preview the layout. Your real customers' words will appear here.",
    rating: 5,
    outfit: "Sample outfit",
  },
  {
    name: "Sample Customer",
    location: "Sample city",
    text: "A second sample review, a little longer, to show how cards line up when reviews have different lengths of text.",
    rating: 5,
    outfit: "Sample outfit",
  },
  {
    name: "Sample Customer",
    location: "Sample city",
    text: "Third sample review for preview only.",
    rating: 4,
    outfit: "Sample outfit",
  },
];
