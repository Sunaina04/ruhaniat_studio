import type { Metadata } from "next";
import { Lookbook } from "@/components/Lookbook";
import { WhatsAppCta } from "@/components/sections";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Lookbook — Punjabi Suit Colours, Silhouettes & Heritage Styles",
  description:
    "Browse the Ruhaniat Studio lookbook: Punjabi salwar suits, gharara, sharara and palazzo silhouettes, heritage styles and colour combinations. Save favourites and share on WhatsApp.",
  alternates: { canonical: "/lookbook/" },
};

export default function LookbookPage() {
  return (
    <>
      <PageHero
        eyebrow="Style Inspiration"
        title={
          <>
            The Ruhaniat <em className="text-burgundy">Lookbook</em>
          </>
        }
        intro="Colours, silhouettes, necklines and heritage details to spark your next outfit. Tap any look to see it full screen, save your favourites, or share it with family on WhatsApp."
      />
      <section className="bg-ivory">
        <div className="container-luxe py-12 md:py-16">
          <Lookbook />
        </div>
      </section>
      <WhatsAppCta
        title="Found a look you love?"
        text="Share it with us on WhatsApp along with your fabric or occasion, and we'll design your version of it."
      />
    </>
  );
}
