import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DesignCard } from "@/components/DesignCard";
import { DesignVisual } from "@/components/DesignVisual";
import { ButtonLink, Ornament, WhatsAppIcon } from "@/components/ui";
import { categoryName } from "@/data/categories";
import { designs, designsByCategory, getDesign } from "@/data/designs";
import { designEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

type Props = { params: Promise<{ ref: string }> };

export function generateStaticParams() {
  return designs.map((d) => ({ ref: d.ref.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ref } = await params;
  const design = getDesign(ref);
  if (!design) return {};
  const title = `${design.name} (${design.ref})`;
  return {
    title,
    description: `${design.description} ${categoryName(design.category)} design by Ruhaniat Studio — custom stitched to your measurements.`,
    alternates: { canonical: `/designs/${design.ref.toLowerCase()}` },
    openGraph: { title: `${title} | Ruhaniat Studio`, images: design.image ? [design.image] : undefined },
  };
}

export default async function DesignPage({ params }: Props) {
  const { ref } = await params;
  const design = getDesign(ref);
  if (!design) notFound();

  const catName = categoryName(design.category);
  const related = designsByCategory(design.category)
    .filter((d) => d.ref !== design.ref)
    .slice(0, 4);

  return (
    <>
      <section className="bg-ivory">
        <div className="container-luxe py-10 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.18em] text-muted">
            <Link href="/collections" className="hover:text-burgundy">Collections</Link>
            <span className="mx-2 text-gold">/</span>
            <Link href={`/collections/${design.category}`} className="hover:text-burgundy">{catName}</Link>
            <span className="mx-2 text-gold">/</span>
            <span className="text-burgundy">{design.ref}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[3/4] overflow-hidden border border-line bg-beige">
              <DesignVisual
                image={design.image}
                alt={`${design.name} — ${catName}`}
                silhouette={design.silhouette}
                tone={design.tone}
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>

            <div className="lg:py-6">
              <p className="eyebrow">{catName}</p>
              <h1 className="mt-4 text-5xl text-burgundy-deep md:text-6xl">{design.name}</h1>
              <p className="mt-3 text-sm tracking-[0.2em] text-muted">REFERENCE {design.ref}</p>
              <Ornament className="mt-6 text-gold" />
              <p className="mt-6 text-lg leading-relaxed text-muted">{design.description}</p>

              <h2 className="mt-10 font-sans text-[0.7rem] font-medium uppercase tracking-[0.24em] text-gold">
                Design Details
              </h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {design.details.map((d) => (
                  <li key={d} className="flex items-center gap-3 py-3 text-ink">
                    <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-blush-soft p-6">
                <h2 className="text-2xl text-burgundy-deep">Make it yours</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Every design can be changed — neckline, sleeves, length, bottom style, fabric or colour. Pricing depends on
                  your fabric, detailing and measurements, so we discuss it with you personally.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={whatsappLink(designEnquiryMessage(design))} external variant="whatsapp">
                  <WhatsAppIcon /> Enquire About This Design
                </ButtonLink>
                <ButtonLink
                  href={`/contact?design=${encodeURIComponent(design.ref)}&category=${design.category}`}
                  variant="outline"
                >
                  Use Enquiry Form
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-ivory-deep">
          <div className="container-luxe py-16 md:py-20">
            <h2 className="text-center text-4xl text-burgundy-deep">More from {catName}</h2>
            <Ornament className="mx-auto mt-5 text-gold" />
            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((d) => (
                <DesignCard key={d.ref} design={d} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
