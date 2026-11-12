import Link from "next/link";
import { BringYourFabric } from "@/components/BringYourFabric";
import { CategoryCard } from "@/components/CategoryCard";
import { DesignCard } from "@/components/DesignCard";
import { GarmentArt } from "@/components/GarmentArt";
import { Reviews } from "@/components/Reviews";
import { HowItWorks, WhatsAppCta } from "@/components/sections";
import { ButtonLink, Ornament, SectionHeading, WhatsAppIcon } from "@/components/ui";
import { categories } from "@/data/categories";
import { designsByCategory } from "@/data/designs";
import { heritageElements } from "@/data/heritage";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

const pillars = [
  { title: "Our Own Tailor", text: "Every outfit is stitched by our own tailor, so we can take care over fit and finishing." },
  { title: "Design Ideas", text: "A growing library of suit ideas — from everyday cuts to heritage styles and new trends." },
  { title: "Custom Orders", text: "Pick one of our designs, change it, or bring your own reference. We stitch it to measure." },
  { title: "Old Meets New", text: "We love traditional Punjabi fashion and modern styling equally — and bringing them together." },
];

export default function HomePage() {
  const latest = designsByCategory("latest-designs");
  const heritage = designsByCategory("modern-bibiyaan-de-designs").slice(0, 3);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="paper-texture relative overflow-hidden bg-ivory-deep">
        <div className="container-luxe grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
          <div className="lg:col-span-6">
            <p className="eyebrow animate-fade-up">Punjabi Ethnic Wear · Custom Stitching</p>
            <h1 className="mt-6 animate-fade-up text-[3rem] leading-[0.98] text-burgundy-deep [animation-delay:80ms] sm:text-6xl lg:text-[5.4rem]">
              Tradition in Every Thread.
              <span className="mt-2 block italic text-burgundy">Style in Every Stitch.</span>
            </h1>
            <p className="mt-7 max-w-lg animate-fade-up text-[1.08rem] leading-relaxed text-muted [animation-delay:160ms]">
              {siteConfig.headline} Ruhaniat Studio designs and stitches Punjabi suits made around you — simple daily
              wear, stylish new cuts, and the heritage styles our bibiyaan wore.
            </p>
            <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
              <ButtonLink href="/collections">Explore Collections</ButtonLink>
              <ButtonLink href={whatsappLink()} external variant="outline">
                <WhatsAppIcon /> Enquire on WhatsApp
              </ButtonLink>
            </div>
            <p className="mt-10 flex items-center gap-3 text-sm text-muted">
              <span className="font-gurmukhi text-xl text-gold">{siteConfig.nameGurmukhi}</span>
              <span className="h-px w-8 bg-gold/50" />
              <span className="italic">soulfulness in every stitch</span>
            </p>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative mx-auto grid max-w-xl grid-cols-5 gap-3 sm:gap-4">
              <div className="relative col-span-3 row-span-2 aspect-[3/4.4] overflow-hidden rounded-t-[999px] border border-gold/30 shadow-[0_30px_60px_-30px_rgba(74,19,32,0.45)]">
                <GarmentArt silhouette="patiala" tone="mustard" className="absolute inset-0 h-full w-full" />
              </div>
              <div className="relative col-span-2 aspect-[3/4] overflow-hidden rounded-t-[999px] border border-gold/30">
                <GarmentArt silhouette="salwar" tone="heritage" className="absolute inset-0 h-full w-full" />
              </div>
              <div className="relative col-span-2 aspect-[3/4] overflow-hidden border border-gold/30">
                <GarmentArt silhouette="sharara" tone="blush" className="absolute inset-0 h-full w-full" />
              </div>
            </div>
            <div className="absolute -bottom-4 left-0 hidden bg-ivory px-5 py-4 shadow-lg sm:block md:left-6">
              <p className="eyebrow !text-[0.6rem]">Made to measure</p>
              <p className="mt-1 font-serif text-xl text-burgundy-deep">Your design, your fit</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category ribbon ─────────────────────────────────── */}
      <div className="overflow-hidden border-y border-line bg-ivory py-5">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap motion-reduce:animate-none">
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

      {/* ── Brand introduction ──────────────────────────────── */}
      <section className="bg-ivory">
        <div className="container-luxe grid gap-14 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Welcome to Ruhaniat Studio</p>
            <h2 className="text-4xl text-burgundy-deep md:text-5xl">
              A personal design &amp; stitching studio — <em className="text-burgundy">not just another store.</em>
            </h2>
            <Ornament className="mt-6 text-gold" />
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-muted">
              We are a new Punjabi ethnic wear studio built around one simple idea: a suit should be made for the person
              wearing it. Choose from our design ideas, tell us what you would like to change, or show us something you
              have seen — and we will stitch it to your measurements.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {pillars.map((p) => (
                <div key={p.title} className="border-t border-line pt-5">
                  <h3 className="text-2xl text-burgundy-deep">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured collections ────────────────────────────── */}
      <section className="bg-ivory-deep">
        <div className="container-luxe py-20 md:py-28">
          <SectionHeading
            eyebrow="Our Collections"
            title="Suits for every day, every mood, every occasion"
            intro="Nine collections — from comfortable daily wear to traditional salwar suits, festive ghararas and heritage designs."
          />
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <CategoryCard key={c.slug} category={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Modern Bibiyaan De Designs ─────────────────────────── */}
      <section className="relative overflow-hidden bg-[#3b1219] text-ivory">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #d3bb8c 0 1px, transparent 1px 18px), repeating-linear-gradient(-45deg, #d3bb8c 0 1px, transparent 1px 18px)",
          }}
          aria-hidden
        />
        <div className="container-luxe relative grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow !text-gold-soft">A Touch of Our Punjabi Heritage</p>
            <h2 className="mt-5 text-5xl leading-[1.02] text-ivory md:text-6xl">
              Modern Bibiyaan <span className="italic text-gold-soft">De Designs</span>
            </h2>
            <p className="mt-3 font-gurmukhi text-2xl text-gold-soft/80">ਮਾਡਰਨ ਬੀਬੀਆਂ ਦੇ ਡਿਜ਼ਾਈਨ</p>
            <Ornament className="mt-6 text-gold-soft" />
            <p className="mt-6 text-lg leading-relaxed text-ivory/75">
              Remember the suits in your mother&apos;s trunk and your nani&apos;s wedding photographs? The full salwars,
              the simple round necks with a dori, the cuffed sleeves, the phulkari on the dupatta. We are bringing those
              styles back — authentic, elegant and stitched with respect for how they were always made.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {heritageElements.map((h) => (
                <li key={h.title} className="border border-gold-soft/30 px-3 py-1.5 text-xs tracking-wide text-ivory/80">
                  {h.title}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href="/collections/modern-bibiyaan-de-designs" variant="light">
                Explore the Heritage Collection
              </ButtonLink>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-5 lg:col-span-7">
            {heritage.map((d, i) => (
              <Link
                key={d.ref}
                href={`/designs/${d.ref.toLowerCase()}`}
                className={`group block ${i === 1 ? "lg:translate-y-10" : ""}`}
              >
                <div className="relative aspect-[3/4.4] overflow-hidden rounded-t-[999px] border border-gold-soft/40 sepia-[0.25]">
                  <GarmentArt silhouette={d.silhouette} tone={d.tone} className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-3 text-[0.62rem] tracking-[0.2em] text-gold-soft">{d.ref}</p>
                <p className="font-serif text-lg leading-tight text-ivory sm:text-xl">{d.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest designs ──────────────────────────────────── */}
      <section className="bg-ivory">
        <div className="container-luxe py-20 md:py-28">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Latest Designs"
              title="New ideas on the cutting table"
              intro="Contemporary cuts and current inspirations. Like one? Tap enquire and the design reference is added to your WhatsApp message."
            />
            <ButtonLink href="/collections/latest-designs" variant="outline" className="shrink-0">
              View All Latest
            </ButtonLink>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {latest.map((d) => (
              <DesignCard key={d.ref} design={d} />
            ))}
          </div>
        </div>
      </section>

      <BringYourFabric learnMoreLink />

      <HowItWorks />
      <Reviews />
      <WhatsAppCta />
    </>
  );
}
