import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ButtonLink, Ornament, PageHero, WhatsAppIcon } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact & Enquiry",
  description:
    "Send Ruhaniat Studio an enquiry for custom-stitched Punjabi suits. Share your design reference, occasion, budget and reference photos, or chat with us on WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & Enquiry"
        title="Tell us about your outfit"
        intro="Ask about a design or place a custom stitching order — from India or anywhere in the world. We will reply on WhatsApp to talk through the details."
      />
      <section className="bg-ivory">
        <div className="container-luxe grid gap-12 py-16 md:py-24 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="bg-burgundy-deep p-8 text-ivory md:p-10">
              <p className="eyebrow !text-gold-soft">Quickest Reply</p>
              <h2 className="mt-4 text-3xl text-ivory">Chat with us on WhatsApp</h2>
              <Ornament className="mt-5 text-gold-soft" />
              <p className="mt-5 text-sm leading-relaxed text-ivory/75">
                WhatsApp is the easiest way to reach us. Send photos, voice notes, design references — whatever helps you
                explain your idea.
              </p>
              <ButtonLink href={whatsappLink()} external variant="whatsapp" className="mt-7 w-full">
                <WhatsAppIcon /> Open WhatsApp
              </ButtonLink>
              {siteConfig.email && (
                <p className="mt-6 text-sm text-ivory/75">
                  Or email{" "}
                  <a href={`mailto:${siteConfig.email}`} className="text-gold-soft underline-offset-4 hover:underline">
                    {siteConfig.email}
                  </a>
                </p>
              )}
            </div>
            <div className="mt-6 border border-line p-8">
              <p className="eyebrow">Good to Know</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>We are an online design &amp; stitching studio — enquiries and orders are handled by WhatsApp and this form.</li>
                <li>
                  We accept orders from India and other countries, with worldwide shipping. Charges and timelines are
                  confirmed for your destination —{" "}
                  <Link href="/shipping" className="text-burgundy underline decoration-gold/50 underline-offset-4">
                    shipping &amp; delivery
                  </Link>
                  .
                </li>
                <li>Quote a design reference like RS-001 so we know exactly which design you mean.</li>
                <li>Every price is quoted personally, based on your design, fabric and detailing.</li>
              </ul>
            </div>
          </aside>
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="h-[40rem] animate-pulse bg-ivory-deep" />}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
