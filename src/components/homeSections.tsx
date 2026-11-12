import Link from "next/link";
import { GarmentArt } from "./GarmentArt";
import { ArticleCard } from "./journal";
import { ButtonLink, Ornament, SectionHeading } from "./ui";
import { siteConfig } from "@/config/site";
import { articles } from "@/data/journal";
import { getDesign } from "@/data/designs";
import type { Design } from "@/data/types";

const pick = (refs: string[]) => refs.map((r) => getDesign(r)).filter((d): d is Design => !!d);

export function JournalTeaser() {
  const [first, ...rest] = articles;
  const picks = [first, ...rest.filter((a) => a.category !== first.category)].slice(0, 3);
  return (
    <section className="bg-ivory-deep">
      <div className="container-luxe py-20 md:py-28">
        <div data-reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Ruhaniat Journal"
            title={
              <>
                Stories, Styles <em className="text-burgundy">&amp; Inspiration</em>
              </>
            }
            intro="Punjabi heritage, styling ideas and practical fabric guides from our studio."
          />
          <ButtonLink href="/journal" variant="outline" className="shrink-0">
            Read the Journal
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const lookTeaser = pick(["RS-009", "RS-026", "RS-013", "RS-005", "RS-018", "RS-021", "RS-034"]);

export function LookbookTeaser() {
  return (
    <section className="overflow-hidden bg-ivory">
      <div className="container-luxe py-20 md:py-28">
        <div data-reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Lookbook"
            title="Colours, silhouettes and details to inspire you"
            intro="Browse full screen, save favourites and share looks with family on WhatsApp."
          />
          <ButtonLink href="/lookbook" className="shrink-0">
            Open the Lookbook
          </ButtonLink>
        </div>
      </div>
      <div className="no-scrollbar -mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-20 md:-mt-10 md:px-10 md:pb-28">
        {lookTeaser.map((d, i) => {
          return (
            <Link
              key={d.ref}
              href={`/lookbook/#${d.ref.toLowerCase()}`}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              className={`group relative shrink-0 snap-start overflow-hidden bg-beige ${
                i % 2 ? "mt-10 h-[22rem] w-60 md:h-[26rem] md:w-72" : "h-[22rem] w-64 md:h-[28rem] md:w-80"
              }`}
            >
              <GarmentArt silhouette={d.silhouette} tone={d.tone} className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-burgundy-deep/80 to-transparent p-4 pt-12 text-ivory">
                <span className="block text-[0.6rem] tracking-[0.2em] text-gold-soft">{d.ref}</span>
                <span className="font-serif text-lg leading-tight">{d.name}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const instaGrid = pick(["RS-010", "RS-031", "RS-016", "RS-017", "RS-033", "RS-028"]);

export function InstagramSection() {
  const hasInsta = Boolean(siteConfig.instagram);
  return (
    <section className="bg-ivory-deep">
      <div className="container-luxe py-20 md:py-24">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">Instagram</p>
          <h2 className="text-4xl text-burgundy-deep md:text-5xl">Follow Our Style Journey</h2>
          <Ornament className="mx-auto mt-5 text-gold" />
          <p className="mt-5 leading-relaxed text-muted">
            {hasInsta
              ? "New design ideas, fabric finds and behind-the-scenes from our stitching table."
              : "Our Instagram is coming soon. Until then, here are a few of our design ideas — and WhatsApp is the quickest way to see new designs."}
          </p>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
          {instaGrid.map((d, i) => {
            const inner = (
              <>
                <GarmentArt silhouette={d.silhouette} tone={d.tone} className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]" />
                <span className="absolute inset-0 flex items-center justify-center bg-burgundy-deep/0 text-ivory opacity-0 transition-all duration-500 group-hover:bg-burgundy-deep/40 group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                  </svg>
                </span>
              </>
            );
            const cls = "group relative block aspect-square overflow-hidden bg-beige";
            const st = { "--reveal-delay": `${i * 60}ms` } as React.CSSProperties;
            return hasInsta ? (
              <a key={d.ref} href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" aria-label="Ruhaniat Studio on Instagram" data-reveal style={st} className={cls}>
                {inner}
              </a>
            ) : (
              <Link key={d.ref} href={`/lookbook/#${d.ref.toLowerCase()}`} aria-label={d.name} data-reveal style={st} className={cls}>
                {inner}
              </Link>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          {hasInsta ? (
            <ButtonLink href={siteConfig.instagram} external>
              Follow on Instagram
            </ButtonLink>
          ) : (
            <span className="inline-block border border-dashed border-gold/60 px-6 py-3.5 text-[0.7rem] uppercase tracking-[0.2em] text-muted">
              Instagram — coming soon
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
