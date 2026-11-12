import { ArticleCard } from "./journal";
import { Ornament } from "./ui";
import type { Article } from "@/data/journal";

/** "From the Journal" block used on collection and design pages. */
export function RelatedReading({ items, className = "bg-ivory" }: { items: Article[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <section className={className}>
      <div className="container-luxe py-16 md:py-20">
        <p className="eyebrow text-center">From the Ruhaniat Journal</p>
        <h2 className="mt-3 text-center text-4xl text-burgundy-deep">Read before you stitch</h2>
        <Ornament className="mx-auto mt-5 text-gold" />
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
