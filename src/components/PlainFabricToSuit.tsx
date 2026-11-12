"use client";

import Link from "next/link";
import { useState } from "react";
import { GarmentArt } from "./GarmentArt";
import { ConceptLabel, Ornament, WhatsAppIcon, buttonClass } from "./ui";
import type { Silhouette, Tone } from "@/data/types";
import { whatsappLink } from "@/lib/whatsapp";

type Neck = "square" | "round" | "sweetheart" | "v" | "mandarin";
type Sleeve = "lace" | "cuff" | "cape" | "bell";
type Bottom = "salwar" | "patiala" | "gharara" | "sharara" | "palazzo";

const fabrics: {
  id: string;
  name: string;
  swatch: string;
  weave: string;
  tone: Tone;
  silhouette: Silhouette;
  neck: [Neck, string];
  sleeve: [Sleeve, string];
  bottom: [Bottom, string];
  dupatta: string;
}[] = [
  {
    id: "ivory",
    name: "Ivory cotton",
    swatch: "#f3ead9",
    weave: "#e3d4b9",
    tone: "ivory",
    silhouette: "salwar",
    neck: ["square", "Square neck with lace piping"],
    sleeve: ["lace", "Three-quarter sleeves with a lace edge"],
    bottom: ["salwar", "Classic Punjabi salwar"],
    dupatta: "A printed mulmul dupatta adds colour",
  },
  {
    id: "mustard",
    name: "Mustard cotton-silk",
    swatch: "#d4a347",
    weave: "#bf8f37",
    tone: "mustard",
    silhouette: "patiala",
    neck: ["round", "Round neck with a gota border"],
    sleeve: ["cuff", "Full sleeves with gota cuffs"],
    bottom: ["patiala", "Full Patiala salwar in a contrast colour"],
    dupatta: "A phulkari-style dupatta in pink",
  },
  {
    id: "emerald",
    name: "Emerald silk",
    swatch: "#2f6a53",
    weave: "#255644",
    tone: "emerald",
    silhouette: "gharara",
    neck: ["sweetheart", "Sweetheart neck with zari"],
    sleeve: ["cape", "Sheer cape sleeves"],
    bottom: ["gharara", "Gharara with a gota band at the knee"],
    dupatta: "An organza dupatta with a scalloped edge",
  },
  {
    id: "blush",
    name: "Blush georgette",
    swatch: "#e1b3a6",
    weave: "#d39f91",
    tone: "blush",
    silhouette: "sharara",
    neck: ["v", "Soft V-neck with gathers"],
    sleeve: ["bell", "Bell sleeves"],
    bottom: ["sharara", "Flowing sharara"],
    dupatta: "A sheer dupatta with tassels",
  },
  {
    id: "indigo",
    name: "Indigo khadi",
    swatch: "#3e507d",
    weave: "#33446c",
    tone: "indigo",
    silhouette: "palazzo",
    neck: ["mandarin", "Mandarin collar with buttons"],
    sleeve: ["cuff", "Full sleeves with buttoned cuffs"],
    bottom: ["palazzo", "Wide palazzo"],
    dupatta: "An ivory cotton dupatta",
  },
];

const neckPaths: Record<Neck, string> = {
  square: "M14 10 H50 V40 H34 V24 H30 V40 H14 Z",
  round: "M14 10 Q32 46 50 10",
  sweetheart: "M14 10 Q16 38 32 30 Q48 38 50 10",
  v: "M14 10 L32 44 L50 10",
  mandarin: "M18 10 Q32 18 46 10 M18 10 V16 Q32 24 46 16 V10 M32 20 V44",
};
const sleevePaths: Record<Sleeve, string> = {
  lace: "M20 8 L10 46 H34 L40 8 M10 46 q4 4 8 0 q4 4 8 0 q4 4 8 0",
  cuff: "M20 8 L12 40 H34 L40 8 M12 40 V50 H34 V40 M18 45 h1 M28 45 h1",
  cape: "M22 8 Q6 30 6 50 H50 Q46 28 36 8",
  bell: "M22 8 L18 30 Q6 44 8 50 H44 Q46 44 36 30 L38 8",
};
const bottomPaths: Record<Bottom, string> = {
  salwar: "M18 6 H46 Q52 36 44 52 H34 L32 26 L30 52 H20 Q12 36 18 6 M20 48 H30 M34 48 H44",
  patiala: "M16 6 H48 Q58 34 46 52 H34 L32 24 L30 52 H18 Q6 34 16 6 M22 18 Q19 34 22 48 M42 18 Q45 34 42 48",
  gharara: "M20 6 H44 V30 L54 52 H33 L32 32 L31 52 H10 L20 30 Z M20 30 H31 M33 30 H44",
  sharara: "M20 6 H44 L56 52 H33 L32 22 L31 52 H8 Z",
  palazzo: "M18 6 H46 L52 52 H33 L32 20 L31 52 H12 Z",
};

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 64 56" className="h-12 w-14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

export function PlainFabricToSuit() {
  const [id, setId] = useState(fabrics[1].id);
  const f = fabrics.find((x) => x.id === id)!;

  const steps = [
    { label: "Your plain fabric", value: f.name, icon: null },
    { label: "Suggested neckline", value: f.neck[1], icon: neckPaths[f.neck[0]] },
    { label: "Sleeve design", value: f.sleeve[1], icon: sleevePaths[f.sleeve[0]] },
    { label: "Salwar / bottom style", value: f.bottom[1], icon: bottomPaths[f.bottom[0]] },
  ];

  return (
    <section id="plain-fabric" className="relative overflow-hidden bg-blush-soft">
      <div className="paper-texture absolute inset-0" aria-hidden />
      <div className="container-luxe relative py-20 md:py-28">
        <div data-reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-4">Bring Your Own Fabric</p>
          <h2 className="text-4xl text-burgundy-deep md:text-5xl">
            Have Plain Fabric? <em className="text-burgundy">Let&apos;s Turn It Into Something Beautiful.</em>
          </h2>
          <Ornament className="mx-auto mt-5 text-gold" />
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted">
            Bring your own plain or printed fabric. We&apos;ll suggest a neckline, sleeves and bottom style that suit it —
            then our tailor stitches it to your measurements. Pick a fabric below to see one idea.
          </p>
        </div>

        <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3" role="radiogroup" aria-label="Choose a sample fabric">
          {fabrics.map((x) => (
            <button
              key={x.id}
              type="button"
              role="radio"
              aria-checked={x.id === id}
              onClick={() => setId(x.id)}
              className={`flex items-center gap-2.5 rounded-full border bg-ivory py-1.5 pl-1.5 pr-4 text-xs transition-all duration-300 ${
                x.id === id ? "border-burgundy shadow-[0_8px_20px_-12px_rgba(110,30,47,0.8)]" : "border-line hover:border-gold"
              }`}
            >
              <span
                className="h-7 w-7 rounded-full border border-black/10"
                style={{ background: `repeating-linear-gradient(45deg, ${x.swatch} 0 3px, ${x.weave} 3px 4px)` }}
              />
              {x.name}
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-12">
          {/* Before */}
          <div data-reveal className="flex flex-col border border-line bg-ivory p-5 lg:col-span-3">
            <p className="eyebrow">Before</p>
            <div
              key={f.id}
              className="mt-4 aspect-[3/4] flex-1 animate-page-in shadow-inner"
              style={{
                background: `repeating-linear-gradient(0deg, ${f.weave}33 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, ${f.weave}55 0 1px, transparent 1px 4px), ${f.swatch}`,
              }}
              role="img"
              aria-label={`Plain ${f.name} fabric`}
            />
            <p className="mt-3 font-serif text-xl text-burgundy-deep">{f.name}</p>
          </div>

          {/* Steps */}
          <ol data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="grid gap-3 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
            {steps.slice(1).map((s, i) => (
              <li key={s.label} className="flex items-center gap-4 border border-line bg-ivory p-4">
                <span className="flex h-14 w-16 shrink-0 items-center justify-center text-gold">
                  <Icon d={s.icon!} />
                </span>
                <span key={f.id + i} className="animate-page-in">
                  <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-gold">
                    {String(i + 1).padStart(2, "0")} · {s.label}
                  </span>
                  <span className="mt-1 block font-serif text-xl leading-tight text-burgundy-deep">{s.value}</span>
                </span>
              </li>
            ))}
            <li className="border border-dashed border-gold/50 px-4 py-3 text-sm text-muted">
              <span className="text-gold">Dupatta:</span> {f.dupatta}
            </li>
          </ol>

          {/* After */}
          <div data-reveal style={{ "--reveal-delay": "240ms" } as React.CSSProperties} className="flex flex-col border border-gold/40 bg-ivory p-5 lg:col-span-4">
            <p className="eyebrow">After — finished outfit inspiration</p>
            <div className="relative mt-4 aspect-[3/4] flex-1 overflow-hidden">
              <div key={f.id} className="absolute inset-0 animate-page-in">
                <GarmentArt silhouette={f.silhouette} tone={f.tone} className="h-full w-full" />
              </div>
              <ConceptLabel />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Illustration of a Ruhaniat design concept — design inspiration, not a completed customer order.
            </p>
          </div>
        </div>

        <div data-reveal className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/inspiration" className={buttonClass("primary")}>
            Show Me Design Ideas
          </Link>
          <a
            href={whatsappLink(
              "Hello Ruhaniat Studio, I have my own fabric and would like design suggestions and stitching. I can share a photo of the fabric.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("whatsapp")}
          >
            <WhatsAppIcon /> I Have My Own Fabric
          </a>
          <Link href="/inspiration#find-your-style" className={buttonClass("outline")}>
            Help Me Choose a Design
          </Link>
        </div>
      </div>
    </section>
  );
}
