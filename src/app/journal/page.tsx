import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { JournalExplorer } from "@/components/journal";
import { WhatsAppCta } from "@/components/sections";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Ruhaniat Journal — Styling & Heritage",
  description:
    "Punjabi suit styling ideas, salwar and phulkari heritage, design inspiration and fabric guides from the Ruhaniat Studio journal.",
  path: "/journal/",
});

export default function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="Ruhaniat Journal"
        title={
          <>
            Stories, Styles <em className="text-burgundy">&amp; Inspiration</em>
          </>
        }
        intro="Notes from our studio on Punjabi fashion and heritage, suit styling, design ideas and choosing the right fabric — written to help you plan your next outfit."
      />
      <section className="bg-ivory">
        <div className="container-luxe py-14 md:py-20">
          <JournalExplorer />
        </div>
      </section>
      <WhatsAppCta
        title="Read something you'd like to wear?"
        text="Send us the article or the design reference on WhatsApp and we'll talk through how to make it for you."
      />
    </>
  );
}
