import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { DesignCard } from "@/components/DesignCard";
import { GarmentArt } from "@/components/GarmentArt";
import { InspirationExplorer } from "@/components/InspirationExplorer";
import { PlainFabricToSuit } from "@/components/PlainFabricToSuit";
import { InstagramSection, JournalTeaser, LookbookTeaser } from "@/components/homeSections";
import { HowItWorks, ShippingBand, WhatsAppCta } from "@/components/sections";
import { ButtonLink, GlobeIcon, Ornament, SectionHeading, WhatsAppIcon } from "@/components/ui";
import { categories } from "@/data/categories";
import { designsByCategory } from "@/data/designs";
import { heritageElements } from "@/data/heritage";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

/** Splits a line into words that slide up one after another. */
function RevealWords({ text, start = 0, className = "" }: { text: string; start?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="word-mask">
          <span style={{ animationDelay: `${start + i * 90}ms` }}>{w}&nbsp;</span>
        </span>
      ))}
    </span>
  );
}

export default function HomePage() {
  const latest = designsByCategory("latest-designs");
  const heritageDesigns = designsByCategory("modern-bibiyaan-de-designs").slice(0, 3);
  const heritageArt = [heritageElements[0], heritageElements[4], heritageElements[6]];

  return (
    <>
      {/* 1 ── Hero ─────────────────────────────────────────── */}
      <section className="paper-texture relative overflow-hidden bg-ivory-deep">
        <div className="container-luxe grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
          <div className="lg:col-span-6">
            <p className="eyebrow animate-fade-up">Punjabi Ethnic Wear · Custom Stitching</p>
            <h1 className="mt-6 text-[3rem] leading-[0.98] text-burgundy-deep sm:text-6xl lg:text-[5.4rem]">
              <RevealWords text="Tradition in Every Thread." start={100} />
              <RevealWords text="Style in Every Stitch." start={460} className="mt-2 block italic text-burgundy" />
            </h1>
            <p className="mt-7 max-w-lg animate-fade-up text-[1.08rem] leading-relaxed text-muted [animation-delay:800ms]">
              {siteConfig.headline} Ruhaniat Studio designs and stitches Punjabi suits made around you — simple daily
              wear, stylish new cuts, and the heritage styles our bibiyaan wore.
            </p>
            <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:950ms] sm:flex-row">
              <ButtonLink href="/collections">Explore Collections</ButtonLink>
              <ButtonLink href={whatsappLink()} external variant="outline">
                <WhatsAppIcon /> Enquire on WhatsApp
              </ButtonLink>
            </div>
            <p className="mt-10 flex animate-fade-up items-center gap-3 text-sm text-muted [animation-delay:1100ms]">
              <span className="font-gurmukhi text-xl text-gold">{siteConfig.nameGurmukhi}</span>
              <span className="h-px w-8 bg-gold/50" />
              <span className="italic">soulfulness in every stitch</span>
            </p>
            <Link
              href="/shipping"
              className="mt-5 inline-flex animate-fade-up items-center gap-2.5 border border-gold/40 bg-ivory/70 px-4 py-2.5 text-[0.66rem] uppercase tracking-[0.18em] text-burgundy transition-colors [animation-delay:1200ms] hover:border-gold"
            >
              <GlobeIcon className="h-4 w-4 text-gold" />
              Worldwide Shipping Available
              <span className="normal-case tracking-normal text-muted">· India &amp; international orders</span>
            </Link>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative mx-auto grid max-w-xl grid-cols-5 gap-3 sm:gap-4">
              <div className="relative col-span-3 row-span-2 aspect-[3/4.4] animate-fade-up overflow-hidden rounded-t-[999px] border border-gold/30 shadow-[0_30px_60px_-30px_rgba(74,19,32,0.45)] [animation-delay:200ms]">
                <GarmentArt silhouette="patiala" tone="mustard" className="absolute inset-0 h-full w-full" />
              </div>
              <div className="relative col-span-2 aspect-[3/4] animate-fade-up overflow-hidden rounded-t-[999px] border border-gold/30 [animation-delay:350ms]">
                <GarmentArt silhouette="salwar" tone="heritage" className="absolute inset-0 h-full w-full" />
              </div>
              <div className="relative col-span-2 aspect-[3/4] animate-fade-up overflow-hidden border border-gold/30 [animation-delay:500ms]">
                <GarmentArt silhouette="sharara" tone="blush" className="absolute inset-0 h-full w-full" />
              </div>
            </div>
            <div className="absolute -bottom-4 left-0 hidden animate-fade-up bg-ivory px-5 py-4 shadow-lg [animation-delay:900ms] sm:block md:left-6">
              <p className="eyebrow !text-[0.6rem]">Made to measure</p>
              <p className="mt-1 font-serif text-xl text-burgundy-deep">Your design, your fit</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category ribbon */}
      <div className="overflow-hidden border-y border-line bg-ivory py-5">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...categories, ...categories].map((c, i) => (
            <Link
              key={`${c.slug}-${i}`}
              href={`/collections/${c.slug}`}
              className="flex items-center gap-10 font-serif text-xl italic text-burgundy/80 hover:text-burgundy"
              tabIndex={i >= categories.length ? -1 : undefined}
              aria-hidden={i >= categories.length ? true : undefined}
            >
              {c.name}
              <span className="text-xs not-italic text-gold">✦</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 2 ── Explore Our Collections ─────────────────────── */}
      <section className="bg-ivory">
        <div className="container-luxe py-20 md:py-28">
          <div data-reveal>
            <SectionHeading
              eyebrow="Explore Our Collections"
              title="Suits for every day, every mood, every occasion"
              intro="Nine collections — from comfortable daily wear to traditional salwar suits, festive ghararas and heritage designs."
            />
          </div>
          <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
            {categories.map((c, i) => (
              <CategoryCard key={c.slug} category={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 3 ── Featured Suit Designs ───────────────────────── */}
      <section className="bg-ivory-deep">
        <div className="container-luxe py-20 md:py-28">
          <div data-reveal>
            <SectionHeading
              eyebrow="Featured Suit Designs"
              title={
                <>
                  Not Sure What to Stitch? <em className="text-burgundy">Get Inspired!</em>
                </>
              }
              intro="Filter by style, find something you love, and tap enquire — your design reference goes straight into the WhatsApp message."
            />
          </div>
          <div className="mt-12">
            <InspirationExplorer limit={8} showAllLink />
          </div>
        </div>
      </section>

      {/* 4 ── Plain Fabric to Beautiful Suit ──────────────── */}
      <PlainFabricToSuit />

      {/* 5 ── Modern Bibiyaan De Designs (signature) ──────── */}
      <section className="relative overflow-hidden bg-[#3b1219] text-ivory">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #d3bb8c 0 1px, transparent 1px 18px), repeating-linear-gradient(-45deg, #d3bb8c 0 1px, transparent 1px 18px)",
          }}
          aria-hidden
        />
        <div className="container-luxe relative py-20 md:py-28">
          <div data-reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow !text-gold-soft">Signature Collection · Modern Bibiyaan De Designs</p>
            <h2 className="mt-5 text-[2.6rem] leading-[1.04] text-ivory md:text-6xl">
              Purane Samay Di Shaan, <em className="text-gold-soft">Ajj De Andaaz Naal.</em>
            </h2>
            <p className="mt-4 font-gurmukhi text-2xl text-gold-soft/80">ਪੁਰਾਣੇ ਸਮੇਂ ਦੀ ਸ਼ਾਨ, ਅੱਜ ਦੇ ਅੰਦਾਜ਼ ਨਾਲ</p>
            <Ornament className="mx-auto mt-6 text-gold-soft" />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ivory/75">
              Remember the suits in your mother&apos;s trunk and your nani&apos;s wedding photographs? The full salwars,
              the round necks with a dori, the cuffed sleeves, the phulkari on the dupatta. We bring those styles back —
              stitched with respect for how they were made, and with a fit for today.
            </p>
          </div>

          {/* Editorial collage of heritage references */}
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
            {heritageArt.map((h, i) => (
              <figure
                key={h.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
                className={
                  i === 0
                    ? "col-span-1 md:col-span-4"
                    : i === 1
                      ? "col-span-2 row-start-1 md:col-span-5 md:row-start-auto md:mt-16"
                      : "col-span-1 md:col-span-3"
                }
              >
                <div className={`relative overflow-hidden border border-gold-soft/30 ${i === 1 ? "aspect-[16/10]" : "aspect-[3/4]"}`}>
                  <GarmentArt silhouette={h.silhouette} tone={h.tone} className="absolute inset-0 h-full w-full" />
                </div>
                <figcaption className="mt-2 text-xs italic text-ivory/60">{h.title}</figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start">
            <div data-reveal className="lg:col-span-5">
              <p className="eyebrow !text-gold-soft">What we bring back</p>
              <ul className="mt-5 divide-y divide-ivory/10 border-y border-ivory/10">
                {heritageElements.map((h) => (
                  <li key={h.title} className="flex items-baseline gap-4 py-3">
                    <span className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rotate-45 bg-gold-soft" />
                    <span>
                      <span className="font-serif text-xl text-ivory">{h.title}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/collections/modern-bibiyaan-de-designs" variant="light">
                  Explore the Collection
                </ButtonLink>
                <ButtonLink href="/journal/modern-bibiyaan-old-punjabi-suit-designs" variant="light" className="!border-ivory/30">
                  Read the Story
                </ButtonLink>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-5 lg:col-span-7">
              {heritageDesigns.map((d, i) => (
                <Link
                  key={d.ref}
                  href={`/designs/${d.ref.toLowerCase()}`}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
                  className={`group block ${i === 1 ? "lg:translate-y-10" : ""}`}
                >
                  <div className="relative aspect-[3/4.4] overflow-hidden rounded-t-[999px] border border-gold-soft/40">
                    <GarmentArt silhouette={d.silhouette} tone={d.tone} className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="mt-3 text-[0.62rem] tracking-[0.2em] text-gold-soft">{d.ref} · DESIGN CONCEPT</p>
                  <p className="font-serif text-lg leading-tight text-ivory sm:text-xl">{d.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 ── Latest Design Inspirations ──────────────────── */}
      <section className="bg-ivory">
        <div className="container-luxe py-20 md:py-28">
          <div data-reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Recently Added"
              title="Latest Design Inspirations"
              intro="Contemporary cuts we've added to our design library. Like one? Tap enquire and the design reference is added to your WhatsApp message."
            />
            <ButtonLink href="/collections/latest-designs" variant="outline" className="shrink-0">
              View All Latest
            </ButtonLink>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {latest.map((d, i) => (
              <DesignCard key={d.ref} design={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 7 ── How Custom Stitching Works ──────────────────── */}
      <HowItWorks dark />
      <ShippingBand />

      {/* 8 ── Journal ─────────────────────────────────────── */}
      <JournalTeaser />

      {/* 9 ── Lookbook ────────────────────────────────────── */}
      <LookbookTeaser />

      {/* 10 ── Instagram ──────────────────────────────────── */}
      <InstagramSection />

      {/* 11 ── Enquiry CTA ────────────────────────────────── */}
      <WhatsAppCta />
    </>
  );
}
