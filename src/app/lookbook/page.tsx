import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Lookbook } from "@/components/Lookbook";
import { WhatsAppCta } from "@/components/sections";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Lookbook — Suit Colours & Silhouettes",
  description:
    "Browse Punjabi suit colours, necklines and silhouettes in the Ruhaniat lookbook. Save your favourite designs and share them with family on WhatsApp.",
  path: "/lookbook/",
});

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
