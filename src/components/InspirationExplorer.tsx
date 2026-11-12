"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DesignCard } from "./DesignCard";
import { designs } from "@/data/designs";
import type { CategorySlug } from "@/data/types";

export const inspirationFilters: { id: string; label: string; collections: CategorySlug[] }[] = [
  { id: "all", label: "All Ideas", collections: [] },
  { id: "daily", label: "Simple Daily Wear", collections: ["daily-wear-suits"] },
  { id: "stylish", label: "Stylish Suits", collections: ["stylish-suits", "latest-designs"] },
  { id: "salwar", label: "Traditional Salwar", collections: ["punjabi-salwar-suits"] },
  { id: "bibiyaan", label: "Modern Bibiyaan", collections: ["modern-bibiyaan-de-designs"] },
  { id: "flare", label: "Gharara & Sharara", collections: ["gharara-suits", "sharara-suits"] },
  { id: "palazzo", label: "Palazzo Suits", collections: ["palazzo-suits"] },
];

export function InspirationExplorer({ limit, showAllLink = false }: { limit?: number; showAllLink?: boolean }) {
  const [filter, setFilter] = useState("all");
  const items = useMemo(() => {
    const f = inspirationFilters.find((x) => x.id === filter)!;
    const inF = (c: CategorySlug) => f.collections.length === 0 || f.collections.includes(c);
    const ds = designs.filter((d) => inF(d.category));
    // On "All", lead with featured designs so the first screen is the strongest.
    const ordered = filter === "all" ? [...ds.filter((d) => d.featured), ...ds.filter((d) => !d.featured)] : ds;
    return limit ? ordered.slice(0, limit) : ordered;
  }, [filter, limit]);

  return (
    <div>
      <div
        role="toolbar"
        aria-label="Filter design inspiration"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:justify-center md:px-0"
      >
        {inspirationFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={`shrink-0 rounded-full border px-4 py-2.5 text-[0.66rem] uppercase tracking-[0.16em] transition-all duration-300 ${
              filter === f.id
                ? "border-burgundy bg-burgundy text-ivory shadow-[0_8px_20px_-12px_rgba(110,30,47,0.8)]"
                : "border-line bg-ivory text-ink hover:border-gold hover:text-burgundy"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div key={filter} className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((d, i) => (
          <div key={d.ref} className={limit && i >= 4 ? "hidden sm:block" : ""}>
            <DesignCard design={d} index={i} />
          </div>
        ))}
      </div>

      {showAllLink && (
        <div className="mt-14 text-center">
          <Link
            href="/inspiration"
            className="btn-luxe inline-flex items-center justify-center gap-2 border border-burgundy/40 px-6 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-burgundy transition-all duration-300 hover:border-burgundy hover:bg-burgundy hover:text-ivory"
          >
            Explore All Inspiration
          </Link>
        </div>
      )}
    </div>
  );
}
