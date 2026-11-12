import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BringYourFabric } from "@/components/BringYourFabric";
import { GarmentArt } from "@/components/GarmentArt";
import { HowItWorks, WhatsAppCta } from "@/components/sections";
import { ButtonLink, Ornament, PageHero, SectionHeading, WhatsAppIcon } from "@/components/ui";
import { whatsappLink } from "@/lib/whatsapp";
import type { Silhouette, Tone } from "@/data/types";

export const metadata: Metadata = pageMetadata({
  title: "Custom Punjabi Suit Stitching",
  description:
    "Custom stitching for Punjabi suits: choose a design or share your own, request changes, and discuss fabric, measurements and budget with us on WhatsApp.",
  path: "/custom-stitching/",
});

const options: { title: string; text: string; silhouette: Silhouette; tone: Tone }[] = [
  {
    title: "Select a design from our collections",
    text: "Browse our collections and note the design reference (for example RS-009). Every design page has an enquire button that sends the reference to us on WhatsApp.",
    silhouette: "patiala",
    tone: "mustard",
  },
  {
    title: "Share your own reference photographs",
    text: "Seen a suit on Instagram, at a wedding or in an old family album? Send us the picture and we will tell you how we can make it for you.",
    silhouette: "salwar",
    tone: "heritage",
  },
  {
    title: "Request design modifications",
    text: "Love a design but want a different neckline, longer sleeves, a palazzo instead of a salwar or a simpler dupatta? Tell us — modifications are part of the process.",
    silhouette: "anarkali",
    tone: "rani",
  },
  {
    title: "Discuss fabric, measurements and budget",
    text: "We talk through fabric choices, help you with measurements, and work out a plan that suits your budget before anything is cut.",
    silhouette: "palazzo",
    tone: "indigo",
  },
  {
    title: "Get a personalised stitched outfit",
    text: "Our tailor stitches your outfit to your measurements. You get a suit that is made for you — not picked off a rack.",
    silhouette: "sharara",
    tone: "blush",
  },
];

const measurementTips = [
  "Bust, waist and hip",
  "Shoulder width",
  "Kameez length you prefer",
  "Sleeve length and armhole",
  "Salwar, palazzo or pant length",
  "Or send a suit that already fits you well",
];

export default function CustomStitchingPage() {
  return (
    <>
      <PageHero
        eyebrow="Custom Stitching"
        title={<>Designed with you. <em className="text-burgundy">Stitched for you.</em></>}
        intro="Ruhaniat Studio is built around custom orders. Whether you choose one of our designs or bring your own idea, here is how we work together."
      >
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={whatsappLink("Hello Ruhaniat Studio, I would like to place a custom stitching order.")} external variant="whatsapp">
            <WhatsAppIcon /> Start on WhatsApp
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">Fill the Enquiry Form</ButtonLink>
        </div>
      </PageHero>

      <BringYourFabric />

      <section className="bg-ivory">
        <div className="container-luxe py-16 md:py-24">
          <SectionHeading eyebrow="Your Options" title="Five ways to get the suit you want" />
          <div className="mt-16 space-y-16 md:space-y-24">
            {options.map((o, i) => (
              <div key={o.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
                <div className={`relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden border border-gold/25 ${i % 2 ? "md:order-2" : ""}`}>
                  <GarmentArt silhouette={o.silhouette} tone={o.tone} className="absolute inset-0 h-full w-full" />
                </div>
                <div className={i % 2 ? "md:order-1 md:text-right" : ""}>
                  <p className="font-serif text-6xl italic text-gold/60">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-3xl text-burgundy-deep md:text-4xl">{o.title}</h3>
                  <Ornament className={`mt-4 text-gold ${i % 2 ? "md:ml-auto" : ""}`} />
                  <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{o.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks dark />

      <section className="bg-ivory-deep">
        <div className="container-luxe grid gap-12 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">Measurements</p>
            <h2 className="text-4xl text-burgundy-deep">We will guide you through it</h2>
            <Ornament className="mt-5 text-gold" />
            <p className="mt-6 leading-relaxed text-muted">
              Not sure how to measure? Don&apos;t worry. We will share simple instructions on WhatsApp. These are the
              measurements we usually need:
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {measurementTips.map((m) => (
                <li key={m} className="flex items-center gap-3 border border-line bg-ivory px-4 py-3 text-sm">
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Pricing</p>
            <h2 className="text-4xl text-burgundy-deep">Every quote is personal</h2>
            <Ornament className="mt-5 text-gold" />
            <p className="mt-6 leading-relaxed text-muted">
              Because each outfit is made to order, the cost depends on the design, the amount of detailing, the fabric
              and whether you provide your own fabric. Share your budget with us and we will suggest what works best within
              it — no surprises.
            </p>
            <div className="mt-8 border-l-2 border-gold bg-ivory p-6">
              <p className="font-serif text-xl italic text-burgundy-deep">
                &ldquo;Tell us your idea and your budget — we will take it from there.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppCta
        title="Ready to start your order?"
        message="Hello Ruhaniat Studio, I would like to place a custom stitching order."
      />
    </>
  );
}
