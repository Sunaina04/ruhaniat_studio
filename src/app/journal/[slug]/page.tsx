import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DesignCard } from "@/components/DesignCard";
import { GarmentArt } from "@/components/GarmentArt";
import { ArticleCard, ReadingProgress } from "@/components/journal";
import { ButtonLink, ConceptLabel, Ornament, WhatsAppIcon } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { categoryName } from "@/data/categories";
import { getDesign } from "@/data/designs";
import { articles, formatDate, getArticle, journalCategories, journalThemes, readingTime, type Block } from "@/data/journal";
import type { Design } from "@/data/types";
import { designEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/journal/${a.slug}/` },
    openGraph: { type: "article", title: a.title, description: a.excerpt, publishedTime: a.publishedOn },
  };
}

/** One of our designs shown as an illustrated figure inside the article. */
function DesignFigure({ design }: { design: Design }) {
  return (
    <figure data-reveal className="my-12 grid items-center gap-6 border border-line bg-ivory-deep p-4 sm:grid-cols-5 sm:p-5">
      <Link href={`/designs/${design.ref.toLowerCase()}`} className="group relative block aspect-[3/4] overflow-hidden sm:col-span-2">
        <GarmentArt silhouette={design.silhouette} tone={design.tone} className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]" />
        <ConceptLabel />
      </Link>
      <figcaption className="sm:col-span-3">
        <p className="text-[0.62rem] uppercase tracking-[0.2em] text-gold">
          {design.ref} · {categoryName(design.category)}
        </p>
        <p className="mt-2 font-serif text-2xl leading-tight text-burgundy-deep">{design.name}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{design.description}</p>
        <a
          href={whatsappLink(designEnquiryMessage(design))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-[0.66rem] font-medium uppercase tracking-[0.18em] text-burgundy underline decoration-gold/50 underline-offset-4 hover:decoration-burgundy"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" /> Enquire about {design.ref}
        </a>
      </figcaption>
    </figure>
  );
}

function renderBlock(b: Block, i: number, firstParagraph: boolean) {
  switch (b.type) {
    case "h2":
      return (
        <h2 key={i} data-reveal className="mt-14 flex items-baseline gap-4 text-3xl text-burgundy-deep md:text-[2.1rem]">
          <span className="h-px w-8 shrink-0 translate-y-[-0.4em] bg-gold" aria-hidden />
          {b.text}
        </h2>
      );
    case "p":
      return (
        <p
          key={i}
          className={`mt-5 text-[1.07rem] leading-[1.9] text-ink/85 ${
            firstParagraph
              ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:text-burgundy"
              : ""
          }`}
        >
          {b.text}
        </p>
      );
    case "list":
      return (
        <ul key={i} className="mt-6 space-y-3 border-l border-gold/40 pl-6">
          {b.items.map((t) => (
            <li key={t} className="relative text-[1.04rem] leading-relaxed text-ink/85">
              <span className="absolute -left-[1.72rem] top-[0.6em] h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      );
    case "tip":
      return (
        <aside key={i} data-reveal className="relative mt-12 overflow-hidden bg-burgundy-deep px-7 py-8 text-ivory md:px-10">
          <span className="absolute -right-2 -top-6 font-serif text-[9rem] leading-none text-gold-soft/15" aria-hidden>
            &ldquo;
          </span>
          <p className="eyebrow !text-gold-soft">{b.title}</p>
          <p className="relative mt-3 font-serif text-2xl leading-snug">{b.text}</p>
        </aside>
      );
    case "design": {
      const d = getDesign(b.ref);
      return d ? <DesignFigure key={i} design={d} /> : null;
    }
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const t = journalThemes[a.category];
  const related = a.relatedDesigns.map(getDesign).filter((d): d is Design => d !== undefined).slice(0, 4);
  const side = related.slice(0, 2);
  const firstP = a.body.findIndex((b) => b.type === "p");
  const headings = a.body.filter((b) => b.type === "h2").map((b) => (b as { text: string }).text);
  const more = articles
    .filter((x) => x.slug !== a.slug && x.category === a.category)
    .concat(articles.filter((x) => x.slug !== a.slug && x.category !== a.category))
    .slice(0, 3);
  const message = `Hello Ruhaniat Studio, I read "${a.title}" on your Journal and would like to discuss a suit inspired by it.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: a.title,
        description: a.excerpt,
        datePublished: a.publishedOn,
        author: { "@type": "Organization", name: siteConfig.name },
        publisher: { "@type": "Organization", name: siteConfig.name },
        mainEntityOfPage: `${siteConfig.url}/journal/${a.slug}/`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Journal", item: `${siteConfig.url}/journal/` },
          { "@type": "ListItem", position: 2, name: a.title },
        ],
      },
    ],
  };

  return (
    <>
      <ReadingProgress />
      <article>
        {/* Editorial header: title on the left, an arch triptych of sketches on the right */}
        <header className={`relative overflow-hidden ${t.bg} ${t.text}`}>
          <div className="paper-texture absolute inset-0 opacity-60" aria-hidden />
          <div className="container-luxe relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.18em] opacity-75">
                <Link href="/journal" className="hover:underline">Journal</Link>
                <span className={`mx-2 ${t.accent}`}>/</span>
                <Link href={`/journal#${a.category}`} className="hover:underline">
                  {journalCategories[a.category].name}
                </Link>
              </nav>
              <h1 className="mt-6 animate-fade-up text-[2.4rem] leading-[1.06] md:text-[3.6rem]">{a.title}</h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed opacity-80">{a.excerpt}</p>
              <p className={`mt-6 text-[0.66rem] uppercase tracking-[0.22em] ${t.accent}`}>
                {formatDate(a.publishedOn)} · {readingTime(a)} min read · Ruhaniat Studio
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="mx-auto grid max-w-lg grid-cols-7 items-end gap-3">
                {side[0] && (
                  <div className="relative col-span-2 aspect-[3/4.2] animate-fade-up overflow-hidden rounded-t-[999px] border border-current/20 opacity-90 [animation-delay:250ms]">
                    <GarmentArt silhouette={side[0].silhouette} tone={side[0].tone} className="absolute inset-0 h-full w-full" />
                  </div>
                )}
                <div className={`relative aspect-[3/4.3] animate-fade-up overflow-hidden rounded-t-[999px] border border-current/25 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] [animation-delay:100ms] ${side[0] ? "col-span-3" : "col-span-3 col-start-3"}`}>
                  <GarmentArt silhouette={a.cover.silhouette} tone={a.cover.tone} className="absolute inset-0 h-full w-full" />
                </div>
                {side[1] && (
                  <div className="relative col-span-2 aspect-[3/4.2] animate-fade-up overflow-hidden rounded-t-[999px] border border-current/20 opacity-90 [animation-delay:400ms]">
                    <GarmentArt silhouette={side[1].silhouette} tone={side[1].tone} className="absolute inset-0 h-full w-full" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="container-luxe">
          <div className="mx-auto grid max-w-6xl gap-10 pb-16 pt-12 md:pb-24 lg:grid-cols-12">
            {/* "In this story" — sticky on desktop */}
            {headings.length > 1 && (
              <aside className="hidden lg:col-span-3 lg:block">
                <div className="sticky top-28 border-t border-gold/50 pt-4">
                  <p className="eyebrow">In this story</p>
                  <ol className="mt-4 space-y-3">
                    {headings.map((h, i) => (
                      <li key={h} className="flex gap-3 text-sm leading-snug text-muted">
                        <span className="font-serif italic text-gold">{String(i + 1).padStart(2, "0")}</span>
                        {h}
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>
            )}

            <div id="article-body" className={headings.length > 1 ? "lg:col-span-8 lg:col-start-5" : "mx-auto max-w-[44rem] lg:col-span-12"}>
              {a.body.map((b, i) => renderBlock(b, i, i === firstP))}

              {a.sources && a.sources.length > 0 && (
                <div className="mt-14 border-t border-line pt-6">
                  <p className="eyebrow">Further reading</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {a.sources.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-burgundy underline decoration-gold/50 underline-offset-4 hover:decoration-burgundy">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div data-reveal className="mt-14 border border-gold/40 bg-blush-soft p-8 text-center md:p-10">
                <p className="eyebrow">Custom Stitching</p>
                <p className="mt-3 font-serif text-3xl leading-snug text-burgundy-deep">Like this idea? Let&apos;s stitch it for you.</p>
                <Ornament className="mx-auto mt-4 text-gold" />
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
                  Share your fabric, a reference photo or a design number, and we&apos;ll suggest the right design.
                </p>
                <ButtonLink href={whatsappLink(message)} external variant="whatsapp" className="mt-7">
                  <WhatsAppIcon /> Discuss on WhatsApp
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-ivory-deep">
          <div className="container-luxe py-16 md:py-20">
            <p className="eyebrow text-center">Related Designs</p>
            <h2 className="mt-3 text-center text-4xl text-burgundy-deep">Designs that go with this story</h2>
            <Ornament className="mx-auto mt-5 text-gold" />
            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((d, i) => (
                <DesignCard key={d.ref} design={d} index={i} />
              ))}
            </div>
            {a.relatedCollection && (
              <p className="mt-10 text-center">
                <Link
                  href={`/collections/${a.relatedCollection}`}
                  className="border-b border-gold/60 pb-0.5 text-[0.68rem] uppercase tracking-[0.2em] text-burgundy hover:border-burgundy"
                >
                  Explore {categoryName(a.relatedCollection)}
                </Link>
              </p>
            )}
          </div>
        </section>
      )}

      <section className="bg-ivory">
        <div className="container-luxe py-16 md:py-20">
          <h2 className="text-center text-4xl text-burgundy-deep">Keep reading</h2>
          <Ornament className="mx-auto mt-5 text-gold" />
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m, i) => (
              <ArticleCard key={m.slug} article={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
