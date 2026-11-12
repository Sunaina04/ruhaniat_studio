import type { Metadata } from "next";
import Link from "next/link";
import { SHIPPING_MESSAGE, WhatsAppCta } from "@/components/sections";
import { ButtonLink, GlobeIcon, Ornament, PageHero, WhatsAppIcon } from "@/components/ui";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Shipping & Delivery — Worldwide Shipping for Custom Punjabi Suits",
  description:
    "Ruhaniat Studio accepts online custom stitching orders from India and around the world. Shipping charges, delivery timelines and availability are confirmed for your destination on WhatsApp.",
  alternates: { canonical: "/shipping/" },
};

const orderSteps = [
  {
    title: "Send your enquiry",
    text: "Message us on WhatsApp or fill in the enquiry form with the design you like, your occasion and the country and city you want it delivered to.",
  },
  {
    title: "Design, measurements & price",
    text: "We discuss the design, fabric and changes with you, guide you through your measurements, and share the price for your outfit.",
  },
  {
    title: "Shipping confirmed for your destination",
    text: "We confirm the shipping charges, the expected delivery time and whether we can ship to your address — before you place the order.",
  },
  {
    title: "Stitched & shipped",
    text: "Once you confirm, our tailor stitches your outfit to your measurements and we ship it to you, keeping you updated on WhatsApp.",
  },
];

const faqs = [
  {
    q: "Do you ship outside India?",
    a: "Yes. We accept orders from customers in India and in other countries. Send us your destination and we'll confirm whether we can deliver there and how.",
  },
  {
    q: "How much does shipping cost?",
    a: "Shipping charges depend on your destination and the size and weight of your parcel. We confirm the exact charge for your address before you place your order — there are no surprises later.",
  },
  {
    q: "How long will delivery take?",
    a: "The total time depends on the design you choose (how long it takes to stitch) and where it is being shipped. We'll give you an expected timeline when we confirm your order. If you need the outfit for a particular date, please tell us at the start.",
  },
  {
    q: "Are there import duties or taxes?",
    a: "Some countries charge import duties or taxes when a parcel arrives. These depend on your country's rules. Ask us about your destination and we'll share what we know before you order.",
  },
  {
    q: "How do I give my measurements from abroad?",
    a: "The same way as customers in India — we guide you step by step on WhatsApp. You can also share the measurements of a suit that already fits you well.",
  },
  {
    q: "How do I place an order?",
    a: "Start a conversation on WhatsApp or send the enquiry form. Design, measurements, price and shipping are all agreed with you there before anything is stitched.",
  },
];

export default function ShippingPage() {
  return (
    <>
      <PageHero
        eyebrow="Shipping & Delivery"
        title={
          <>
            Worldwide Shipping <em className="text-burgundy">Available</em>
          </>
        }
        intro="Ruhaniat Studio accepts online orders for custom-stitched outfits. Whether you are in India or in another country, you can order with us — we'll confirm shipping for your destination before you order."
      >
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={whatsappLink(SHIPPING_MESSAGE)} external variant="whatsapp">
            <WhatsAppIcon /> Ask About Shipping to You
          </ButtonLink>
          <ButtonLink href="/contact?type=order" variant="outline">
            Place an Order Enquiry
          </ButtonLink>
        </div>
      </PageHero>

      {/* India and international */}
      <section className="bg-ivory">
        <div className="container-luxe grid gap-6 py-16 md:grid-cols-2 md:py-20">
          {[
            {
              title: "Customers in India",
              text: "We ship custom-stitched outfits across India. Tell us your city and PIN code and we'll confirm the shipping charge and expected delivery time.",
            },
            {
              title: "International customers",
              text: "Living abroad and missing Punjabi suits made the way you like them? Order from anywhere — we'll confirm whether we can ship to your country, the cost and the timeline.",
            },
          ].map((c, i) => (
            <div
              key={c.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              className="flex gap-5 border border-line bg-ivory-deep p-7 md:p-9"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                <GlobeIcon className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-3xl text-burgundy-deep">{c.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How online ordering works */}
      <section className="bg-burgundy-deep text-ivory">
        <div className="container-luxe py-20 md:py-24">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow !text-gold-soft">Online Orders</p>
            <h2 className="mt-4 text-4xl text-ivory md:text-5xl">How ordering from anywhere works</h2>
            <Ornament className="mx-auto mt-5 text-gold-soft" />
          </div>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {orderSteps.map((s, i) => (
              <li key={s.title} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold-soft/50 font-serif text-2xl text-gold-soft">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-2xl text-ivory">{s.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-ivory/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Charges, timelines, availability */}
      <section className="bg-ivory-deep">
        <div className="container-luxe py-16 md:py-20">
          <div data-reveal className="mx-auto max-w-3xl border-l-2 border-gold bg-ivory p-7 md:p-10">
            <p className="eyebrow">Shipping charges, timelines &amp; availability</p>
            <p className="mt-4 font-serif text-2xl leading-snug text-burgundy-deep md:text-3xl">
              Every order is confirmed for your destination before you place it.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Because every outfit is made to order and shipped to different places, we don&apos;t use a fixed shipping
              table. Shipping charges, delivery timelines and whether we can deliver to your address are confirmed
              personally, based on your destination, when we discuss your order on WhatsApp.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <h2 className="text-center text-4xl text-burgundy-deep">Questions about shipping</h2>
            <Ornament className="mx-auto mt-5 text-gold" />
            <div className="mt-10 divide-y divide-line border-y border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl text-burgundy-deep [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="text-2xl leading-none text-gold transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted">
              Still have a question?{" "}
              <Link href="/contact" className="text-burgundy underline decoration-gold/50 underline-offset-4">
                Send us an enquiry
              </Link>{" "}
              or message us on WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <WhatsAppCta
        title="Ready to order from wherever you are?"
        text="Send us the design you like and your delivery city and country. We'll confirm the price, shipping and timeline on WhatsApp."
        message={SHIPPING_MESSAGE}
      />
    </>
  );
}
