import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DesignCard } from "@/components/DesignCard";
import { GarmentArt } from "@/components/GarmentArt";
import { WhatsAppCta } from "@/components/sections";
import { ButtonLink, Ornament, PageHero, SectionHeading, WhatsAppIcon } from "@/components/ui";
import { categories, getCategory } from "@/data/categories";
import { designsByCategory } from "@/data/designs";
import { articlesForCollection } from "@/data/journal";
import { RelatedReading } from "@/components/related";
import { heritageElements } from "@/data/heritage";
import { categoryEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.seoDescription,
    alternates: { canonical: `/collections/${category.slug}` },
    openGraph: { title: `${category.name} | Ruhaniat Studio`, description: category.seoDescription },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = designsByCategory(category.slug);
  const isHeritage = category.slug === "modern-bibiyaan-de-designs";
  const others = categories.filter((c) => c.slug !== category.slug);

  return (
    <>
      <PageHero
        eyebrow={isHeritage ? "A Touch of Our Punjabi Heritage" : "Collection"}
        title={isHeritage ? <>Modern Bibiyaan <em className="text-burgundy">De Designs</em></> : category.name}
        intro={category.description}
      >
        {isHeritage && <p className="mt-4 font-gurmukhi text-xl text-gold">ਮਾਡਰਨ ਬੀਬੀਆਂ ਦੇ ਡਿਜ਼ਾਈਨ</p>}
        <nav aria-label="Breadcrumb" className="mt-8 text-xs uppercase tracking-[0.18em] text-muted">
          <Link href="/" className="hover:text-burgundy">Home</Link>
          <span className="mx-2 text-gold">/</span>
          <Link href="/collections" className="hover:text-burgundy">Collections</Link>
          <span className="mx-2 text-gold">/</span>
          <span className="text-burgundy">{category.name}</span>
        </nav>
      </PageHero>

      {isHeritage && <HeritageInspiration />}

      <section className="bg-ivory">
        <div className="container-luxe py-16 md:py-24">
          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">{isHeritage ? "Heritage Designs" : "Designs"}</p>
              <p className="mt-2 font-serif text-2xl text-burgundy-deep">
                {items.length} design {items.length === 1 ? "idea" : "ideas"}
              </p>
            </div>
            <p className="max-w-md text-sm text-muted">
              Quote the reference number (e.g. {items[0]?.ref ?? "RS-001"}) when you enquire, and tell us anything you
              would like to change.
            </p>
          </div>
          {items.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((d, i) => (
                <DesignCard key={d.ref} design={d} priority={i < 2} />
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-muted">New designs for this collection are coming soon.</p>
          )}
          <div className="mt-16 flex flex-col items-center gap-4 border border-line bg-ivory-deep p-8 text-center md:p-12">
            <h2 className="text-3xl text-burgundy-deep">Don&apos;t see exactly what you want?</h2>
            <p className="max-w-xl text-muted">
              Send us a picture of a design you love, or describe your idea. We
              can adapt any design to your taste, fabric and budget.
            </p>
            <ButtonLink href={whatsappLink(categoryEnquiryMessage(category.name))} external variant="whatsapp" className="mt-2">
              <WhatsAppIcon /> Discuss on WhatsApp
            </ButtonLink>
          </div>
        </div>
      </section>

      <RelatedReading items={articlesForCollection(category.slug)} />

      <section className="border-t border-line bg-ivory-deep">
        <div className="container-luxe py-14">
          <p className="eyebrow mb-6 text-center">Explore Other Collections</p>
          <ul className="flex flex-wrap justify-center gap-3">
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/collections/${c.slug}`}
                  className="block border border-line bg-ivory px-4 py-2.5 font-serif text-lg text-burgundy-deep transition-colors hover:border-gold hover:text-burgundy"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WhatsAppCta message={categoryEnquiryMessage(category.name)} />
    </>
  );
}

function HeritageInspiration() {
  return (
    <section className="relative overflow-hidden bg-[#3b1219] text-ivory">
      <div className="container-luxe py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow !text-gold-soft">The Inspiration</p>
          <h2 className="mt-4 text-4xl text-ivory md:text-5xl">What our bibiyaan wore</h2>
          <Ornament className="mx-auto mt-5 text-gold-soft" />
          <p className="mt-6 text-lg leading-relaxed text-ivory/75">
            Classic styles of our bibiyaan, stitched for today. Each detail below comes from the way Punjabi suits were
            actually cut, stitched and worn by our mothers and grandmothers — and we bring it to you with a modern fit.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {heritageElements.map((h, i) => (
            <div
              key={h.title}
              className={`group border border-gold-soft/20 bg-ivory/[0.03] ${i === 0 ? "sm:col-span-2 lg:row-span-2" : ""}`}
            >
              <div className={`relative overflow-hidden sepia-[0.3] ${i === 0 ? "aspect-[4/3] lg:aspect-[4/4.2]" : "aspect-[4/3]"}`}>
                <GarmentArt silhouette={h.silhouette} tone={h.tone} className="absolute inset-0 h-full w-full" />
              </div>
              <div className="p-5">
                <p className="text-[0.62rem] tracking-[0.22em] text-gold-soft">{String(i + 1).padStart(2, "0")}</p>
                <h3 className={`mt-1 text-ivory ${i === 0 ? "text-3xl" : "text-2xl"}`}>{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">{h.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <SectionHeading
            className="[&_h2]:!text-ivory [&_svg]:!text-gold-soft [&_div]:!text-ivory/70"
            title="Bring a family photograph"
            intro="Have an old photo of a suit your mother or nani wore? Share it with us — we will help you recreate the style."
          />
        </div>
      </div>
    </section>
  );
}
