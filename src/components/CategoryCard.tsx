import Link from "next/link";
import { DesignVisual } from "./DesignVisual";
import type { Category } from "@/data/types";

export function CategoryCard({ category, index }: { category: Category; index?: number }) {
  return (
    <Link
      href={`/collections/${category.slug}`}
      data-reveal
      style={{ "--reveal-delay": `${((index ?? 0) % 3) * 90}ms` } as React.CSSProperties}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        <DesignVisual
          image={category.image}
          alt={category.name}
          silhouette={category.silhouette}
          tone={category.tone}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-burgundy-deep/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3 text-ivory sm:p-5">
          {index !== undefined && (
            <p className="text-[0.65rem] tracking-[0.25em] text-gold-soft">{String(index + 1).padStart(2, "0")}</p>
          )}
          <h3 className="mt-1 text-xl leading-tight sm:text-[1.7rem]">{category.name}</h3>
        </div>
      </div>
      <p className="mt-3 hidden text-sm leading-relaxed text-muted sm:block">{category.tagline}</p>
      <span className="mt-2 inline-block border-b border-gold/60 pb-0.5 text-[0.68rem] uppercase tracking-[0.2em] text-burgundy transition-colors group-hover:border-burgundy">
        View Designs
      </span>
    </Link>
  );
}
