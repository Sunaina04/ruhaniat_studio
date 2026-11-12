import { ButtonLink, Ornament, SectionHeading, WhatsAppIcon } from "./ui";
import { whatsappLink } from "@/lib/whatsapp";

export const howItWorksSteps = [
  {
    title: "Choose a Design",
    text: "Browse our collections and note the reference number of a design you like — or send us your own picture.",
  },
  {
    title: "Talk to Us on WhatsApp",
    text: "Tell us the occasion, the changes you want, your fabric and your budget. We discuss everything with you.",
  },
  {
    title: "Share Measurements",
    text: "We guide you through measurements, or work from a well-fitting suit you already own.",
  },
  {
    title: "We Stitch It for You",
    text: "Our tailor stitches your outfit to your measurements and we keep you updated along the way.",
  },
];

export function HowItWorks({ dark = false }: { dark?: boolean }) {
  return (
    <section className={dark ? "bg-burgundy-deep text-ivory" : "bg-ivory"}>
      <div className="container-luxe py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className={`eyebrow mb-4 ${dark ? "!text-gold-soft" : ""}`}>How It Works</p>
          <h2 className={`text-4xl md:text-5xl ${dark ? "text-ivory" : "text-burgundy-deep"}`}>
            From your idea to your outfit
          </h2>
          <Ornament className={`mx-auto mt-5 ${dark ? "text-gold-soft" : "text-gold"}`} />
        </div>
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {howItWorksSteps.map((s, i) => (
            <li key={s.title} className="relative text-center">
              <span
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border font-serif text-2xl ${
                  dark ? "border-gold-soft/50 text-gold-soft" : "border-gold/50 text-gold"
                }`}
              >
                {i + 1}
              </span>
              <h3 className={`mt-5 text-2xl ${dark ? "text-ivory" : "text-burgundy-deep"}`}>{s.title}</h3>
              <p className={`mx-auto mt-3 max-w-xs text-sm leading-relaxed ${dark ? "text-ivory/70" : "text-muted"}`}>
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WhatsAppCta({
  title = "Have a design in mind?",
  text = "Send us the design reference, a photo you love, or just your idea. We will talk through fabric, fit and budget with you on WhatsApp.",
  message,
}: {
  title?: string;
  text?: string;
  message?: string;
}) {
  return (
    <section className="paper-texture bg-blush-soft">
      <div className="container-luxe py-20 text-center md:py-24">
        <SectionHeading eyebrow="Enquire on WhatsApp" title={title} intro={text} />
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={whatsappLink(message)} external variant="whatsapp">
            <WhatsAppIcon /> Chat on WhatsApp
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Send an Enquiry Form
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
