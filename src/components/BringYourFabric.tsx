import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink, Ornament, WhatsAppIcon } from "./ui";
import { whatsappLink } from "@/lib/whatsapp";

const FABRIC_MESSAGE =
  "Hello Ruhaniat Studio, I would like to discuss my suit. I have a fabric and would like help with the design and stitching.";

const icon = "h-6 w-6";
const options: { title: string; text: ReactNode; icon: ReactNode }[] = [
  {
    title: "Bring Your Own Fabric",
    text: "Share your plain or printed fabric with us, and we'll suggest designs that suit it.",
    icon: (
      <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
        <path d="M5 6.5C5 5.1 6.6 4 8.5 4S12 5.1 12 6.5V18c0-1.4-1.6-2.5-3.5-2.5S5 16.6 5 18z" />
        <path d="M12 6.5h6.5a.5.5 0 0 1 .5.5v12.5a.5.5 0 0 1-.5.5H8.5C6.6 20 5 19.4 5 18" />
        <path d="M14.5 10h2M14.5 13h2M14.5 16h2" strokeDasharray="1 1.5" />
      </svg>
    ),
  },
  {
    title: "Need Design Inspiration?",
    text: (
      <>
        Explore our{" "}
        <Link href="/collections" className="text-burgundy underline decoration-gold/60 underline-offset-4 hover:decoration-burgundy">
          collection of suit designs
        </Link>{" "}
        and choose the style you love.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
        <path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4z" />
        <path d="M18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8zM6 16l.6 1.4L8 18l-1.4.6L6 20l-.6-1.4L4 18l1.4-.6z" />
      </svg>
    ),
  },
  {
    title: "Have Something in Mind?",
    text: "Share your reference picture, and we'll customise the outfit according to your preferences.",
    icon: (
      <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
        <rect x="3.5" y="4.5" width="17" height="15" rx="1" />
        <path d="M3.5 16l4.5-4.5 4 4 2.5-2.5 6 6" />
        <circle cx="15.5" cy="9" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Not Sure What Will Look Good?",
    text: "Leave the design ideas to us. We'll help you choose.",
    icon: (
      <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
        <path d="M9.5 10.5h5M12 8v5" />
      </svg>
    ),
  },
];

/** Fanned fabric swatches — a decorative stand-in until a real fabric photo is added. */
function FabricSwatches() {
  const swatches = [
    { rotate: -14, x: 40, bg: "#d4a347", dot: "#7a2235", border: "#b4475b" },
    { rotate: -2, x: 95, bg: "#efe3cb", dot: "#9b2f3a", border: "#cc7a34" },
    { rotate: 11, x: 150, bg: "#b63b63", dot: "#dcc391", border: "#dcc391" },
  ];
  return (
    <svg viewBox="0 0 300 260" className="h-auto w-full max-w-sm" aria-hidden>
      <defs>
        {swatches.map((s, i) => (
          <pattern key={i} id={`sw${i}`} width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill={s.bg} />
            <circle cx="6" cy="6" r="1.2" fill={s.dot} opacity="0.6" />
          </pattern>
        ))}
      </defs>
      <ellipse cx="150" cy="238" rx="120" ry="8" fill="#000" opacity="0.06" />
      {swatches.map((s, i) => (
        <g key={i} transform={`rotate(${s.rotate} ${s.x + 55} 200)`}>
          <rect x={s.x} y="40" width="110" height="180" fill={`url(#sw${i})`} stroke="#000" strokeOpacity="0.08" />
          <rect x={s.x} y="196" width="110" height="10" fill={s.border} opacity="0.85" />
          <path d={`M${s.x} 212 h110`} stroke={s.border} strokeWidth="1" strokeDasharray="2 3" />
        </g>
      ))}
      {/* tailor's measuring tape */}
      <path
        d="M20 120 C70 90 120 150 170 118 S260 96 285 128"
        fill="none"
        stroke="#e9d9a8"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M20 120 C70 90 120 150 170 118 S260 96 285 128"
        fill="none"
        stroke="#8a6a3c"
        strokeWidth="5"
        strokeDasharray="0.8 5"
      />
    </svg>
  );
}

export function BringYourFabric({ learnMoreLink = false }: { learnMoreLink?: boolean }) {
  return (
    <section className="paper-texture bg-blush-soft">
      <div className="container-luxe py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Personalised Stitching</p>
            <h2 className="text-4xl text-burgundy-deep md:text-5xl">
              Your Suit, Your Style. <em className="text-burgundy">We&apos;ll Create It for You.</em>
            </h2>
            <Ornament className="mt-5 text-gold" />
            <p className="mt-6 text-[1.05rem] leading-relaxed text-muted">
              Have a fabric but don&apos;t know what to stitch? No design in mind? Don&apos;t worry! At Ruhaniat Studio,
              we&apos;ll help you find the right design.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <FabricSwatches />
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {options.map((o) => (
              <li key={o.title} className="border border-line bg-ivory p-6 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(74,19,32,0.35)] md:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                  {o.icon}
                </span>
                <h3 className="mt-5 text-2xl text-burgundy-deep">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{o.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="leading-relaxed text-muted">
            From simple daily wear suits to stylish Punjabi salwars, ghararas, shararas and palazzo suits, we&apos;ll
            bring your ideas to life through personalised stitching.
          </p>
          <p className="mt-6 font-serif text-3xl italic leading-snug text-burgundy-deep md:text-4xl">
            You bring the fabric. We&apos;ll help you with the design and stitching.
          </p>
          <ButtonLink href={whatsappLink(FABRIC_MESSAGE)} external variant="whatsapp" className="mt-9">
            <WhatsAppIcon /> Discuss Your Suit on WhatsApp
          </ButtonLink>
          {learnMoreLink && (
            <p className="mt-5">
              <Link
                href="/custom-stitching"
                className="border-b border-gold/60 pb-0.5 text-[0.68rem] uppercase tracking-[0.2em] text-burgundy hover:border-burgundy"
              >
                See how custom stitching works
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
