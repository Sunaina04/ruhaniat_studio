import { categoryName } from "./categories";
import { designs } from "./designs";
import type { CategorySlug, Design, Tone } from "./types";

/**
 * Lookbook entries are built automatically from designs.ts —
 * add a design there and it appears in the lookbook.
 */

export type LookGroup = "salwar" | "stylish" | "flare" | "heritage" | "occasion";
export type ColourChip = "red" | "pink" | "yellow" | "green" | "blue" | "ivory" | "maroon";

export const lookGroups: { id: LookGroup | "all" | "saved"; label: string }[] = [
  { id: "all", label: "All Looks" },
  { id: "salwar", label: "Salwar Suits" },
  { id: "stylish", label: "Stylish & Daily" },
  { id: "flare", label: "Gharara · Sharara · Palazzo" },
  { id: "heritage", label: "Modern Bibiyaan" },
  { id: "occasion", label: "Bridal & Occasion" },
  { id: "saved", label: "Saved ♥" },
];

export const colourChips: { id: ColourChip; label: string; swatch: string }[] = [
  { id: "pink", label: "Pink & Blush", swatch: "#d76a92" },
  { id: "yellow", label: "Mustard & Gold", swatch: "#d4a347" },
  { id: "green", label: "Green & Sage", swatch: "#2f7a5d" },
  { id: "blue", label: "Indigo", swatch: "#3e507d" },
  { id: "ivory", label: "Ivory & Beige", swatch: "#efe3cb" },
  { id: "maroon", label: "Burgundy", swatch: "#6e1e2f" },
];

export interface LookItem {
  id: string;
  title: string;
  subtitle: string;
  group: LookGroup;
  colours: ColourChip[];
  collection: CategorySlug;
  design: Design;
}

const toneColour: Record<Tone, ColourChip> = {
  blush: "pink", ivory: "ivory", burgundy: "maroon", mustard: "yellow", sage: "green", rani: "pink",
  indigo: "blue", sand: "ivory", emerald: "green", heritage: "ivory",
};

function groupFor(c: CategorySlug): LookGroup {
  switch (c) {
    case "punjabi-salwar-suits":
      return "salwar";
    case "gharara-suits":
    case "sharara-suits":
    case "palazzo-suits":
      return "flare";
    case "bridal-occasion-wear":
      return "occasion";
    case "modern-bibiyaan-de-designs":
      return "heritage";
    default:
      return "stylish";
  }
}

export const lookbook: LookItem[] = designs.map((d) => ({
  id: d.ref.toLowerCase(),
  title: d.name,
  subtitle: `${d.ref} · ${categoryName(d.category)}`,
  group: groupFor(d.category),
  colours: [toneColour[d.tone]],
  collection: d.category,
  design: d,
}));

/** Mixes collections so neighbouring looks differ in silhouette and colour. */
export const lookbookOrdered: LookItem[] = (() => {
  const buckets = new Map<CategorySlug, LookItem[]>();
  lookbook.forEach((l) => buckets.set(l.collection, [...(buckets.get(l.collection) ?? []), l]));
  const out: LookItem[] = [];
  const lists = [...buckets.values()];
  for (let i = 0; out.length < lookbook.length; i++) lists.forEach((b) => b[i] && out.push(b[i]));
  return out;
})();
