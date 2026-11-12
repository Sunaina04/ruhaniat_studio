import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CategoryCard } from "@/components/CategoryCard";
import { WhatsAppCta } from "@/components/sections";
import { PageHero } from "@/components/ui";
import { categories } from "@/data/categories";

export const metadata: Metadata = pageMetadata({
  title: "Punjabi Suit Collections",
  description:
    "Explore Punjabi suit collections by Ruhaniat Studio — daily wear, stylish, salwar, gharara, sharara, palazzo, heritage and bridal designs, custom stitched.",
  path: "/collections/",
});

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Collections"
        title="Find the suit that feels like you"
        intro="Every design here is a starting point. Choose one as it is, ask us to change it, or mix ideas from different collections — we stitch it to your measurements."
      />
      <section className="bg-ivory" aria-labelledby="all-collections">
        <h2 id="all-collections" className="sr-only">
          All Punjabi suit collections
        </h2>
        <div className="container-luxe grid grid-cols-2 gap-x-3 gap-y-8 py-16 sm:gap-x-6 sm:gap-y-14 md:py-24 lg:grid-cols-3">
          {categories.map((c, i) => (
            <CategoryCard key={c.slug} category={c} index={i} />
          ))}
        </div>
      </section>
      <WhatsAppCta />
    </>
  );
}
