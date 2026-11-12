import type { Metadata } from "next";
import { InspirationExplorer } from "@/components/InspirationExplorer";
import { StyleQuiz } from "@/components/StyleQuiz";
import { WhatsAppCta } from "@/components/sections";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Punjabi Suit Design Ideas — Get Inspired",
  description:
    "Not sure what to stitch? Browse Punjabi suit design ideas — daily wear, stylish suits, traditional salwar, gharara, sharara and palazzo — and enquire about custom stitching on WhatsApp.",
  alternates: { canonical: "/inspiration/" },
};

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
