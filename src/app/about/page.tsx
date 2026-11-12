import type { Metadata } from "next";
import { GarmentArt } from "@/components/GarmentArt";
import { WhatsAppCta } from "@/components/sections";
import { ButtonLink, Ornament, PageHero } from "@/components/ui";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story of Ruhaniat Studio — a new Punjabi ethnic wear design and custom-stitching studio bringing traditional Punjabi fashion and modern style together.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Honest & personal",
    text: "We are a small, new studio. We talk to every customer directly and are upfront about what we can make and what it will cost.",
  },
  {
    title: "Respect for tradition",
    text: "Punjabi suits carry the memory of our families. We stitch heritage styles the way they were meant to be worn.",
  },
  {
    title: "Open to the new",
    text: "We follow new cuts and trends with excitement, and help you mix them with the classics.",
  },
  {
    title: "Fit comes first",
    text: "A suit stitched to your measurements simply sits better. That is why custom stitching is at the heart of what we do.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Ruhaniat Studio"
        title={<>A new studio with an <em className="text-burgundy">old soul</em></>}
        intro="Ruhaniat means soulfulness. It is the feeling we want every outfit we stitch to carry."
      />

      <section className="bg-ivory">
        <div className="container-luxe grid gap-14 py-16 md:py-24 lg:grid-cols-12 lg:items-center">
          <div className="relative mx-auto w-full max-w-md lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] border border-gold/30">
              <GarmentArt silhouette="salwar" tone="heritage" className="absolute inset-0 h-full w-full" />
            </div>
            <p className="mt-5 text-center font-gurmukhi text-3xl text-gold">{siteConfig.nameGurmukhi}</p>
          </div>
          <div className="space-y-6 text-[1.06rem] leading-relaxed text-muted lg:col-span-7">
            <p className="eyebrow">Our Story</p>
            <h2 className="text-4xl text-burgundy-deep md:text-5xl">Where it begins</h2>
            <Ornament className="text-gold" />
            <p>
              Ruhaniat Studio started with a love for Punjabi suits — the simple cotton suits worn every day, the bright
              Patiala salwars at family functions, and the beautiful old styles we still see in our mothers&apos; and
              grandmothers&apos; photographs.
            </p>
            <p>
              We noticed how hard it can be to find a suit that is exactly what you want: the right neckline, the right
              length, the right fit, at a price that makes sense. So we decided to make them ourselves.
            </p>
            <p>
              Today we are a small design and custom-stitching studio. We have our own tailor, a growing collection of
              design ideas, and a simple way of working: you choose or share a design, we talk it through with you, and we
              stitch it to your measurements.
            </p>
            <p>
              We are just getting started, and we are building Ruhaniat Studio one outfit and one customer at a time. We
              would love for you to be part of that beginning.
            </p>
            <div className="pt-2">
              <ButtonLink href="/collections">Explore Our Designs</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-burgundy-deep text-ivory">
        <div className="container-luxe py-16 text-center md:py-24">
          <p className="eyebrow !text-gold-soft">Our Promise</p>
          <p className="mx-auto mt-6 max-w-3xl font-serif text-3xl italic leading-snug md:text-5xl">
            &ldquo;{siteConfig.tagline}&rdquo;
          </p>
          <Ornament className="mx-auto mt-8 text-gold-soft" />
        </div>
      </section>

      <section className="bg-ivory-deep">
        <div className="container-luxe py-16 md:py-24">
          <h2 className="text-center text-4xl text-burgundy-deep md:text-5xl">What we stand for</h2>
          <Ornament className="mx-auto mt-5 text-gold" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="border border-line bg-ivory p-7">
                <span className="block h-2 w-2 rotate-45 bg-gold" />
                <h3 className="mt-5 text-2xl text-burgundy-deep">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhatsAppCta title="Let's create something for you" />
    </>
  );
}
