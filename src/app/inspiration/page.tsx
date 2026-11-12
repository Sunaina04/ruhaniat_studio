import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { InspirationExplorer } from "@/components/InspirationExplorer";
import { StyleQuiz } from "@/components/StyleQuiz";
import { WhatsAppCta } from "@/components/sections";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Punjabi Suit Design Ideas",
  description:
    "Not sure what to stitch? Browse Punjabi suit design ideas by style and find your look with our quick style quiz. Enquire about custom stitching on WhatsApp.",
  path: "/inspiration/",
});

export default function InspirationPage() {
  return (
    <>
      <PageHero
        eyebrow="Design Inspiration"
        title={
          <>
            Not Sure What to Stitch? <em className="text-burgundy">Get Inspired!</em>
          </>
        }
        intro="Browse our design ideas — from simple daily wear to heritage styles. Found something you like? Tap the button on any card and we'll talk it through on WhatsApp."
      />
      <section className="bg-ivory">
        <div className="container-luxe py-14 md:py-20">
          <h2 className="sr-only">Punjabi suit design ideas</h2>
          <InspirationExplorer />
        </div>
      </section>
      <StyleQuiz />
      <WhatsAppCta
        title="Still deciding?"
        text="Send us your fabric, a photo you love or just the occasion — we'll suggest designs that suit you."
      />
    </>
  );
}
