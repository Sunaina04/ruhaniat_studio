"use client";

import Link from "next/link";
import { useState } from "react";
import { DesignCard } from "./DesignCard";
import { Ornament, WhatsAppIcon, buttonClass } from "./ui";
import { categoryName } from "@/data/categories";
import { designsByCategory } from "@/data/designs";
import type { CategorySlug } from "@/data/types";
import { whatsappLink } from "@/lib/whatsapp";

const questions = [
  {
    q: "Where will you wear it?",
    options: [
      { id: "daily", label: "Every day / work" },
      { id: "festive", label: "Festival or family function" },
      { id: "wedding", label: "Wedding or big occasion" },
      { id: "unsure", label: "Not sure yet" },
    ],
  },
  {
    q: "What feels most like you?",
    options: [
      { id: "comfort", label: "Comfortable and easy" },
      { id: "traditional", label: "Traditional Punjabi" },
      { id: "modern", label: "Modern and stylish" },
      { id: "heritage", label: "Heritage, like our bibiyaan wore" },
    ],
  },
  {
    q: "Which bottom do you love?",
    options: [
      { id: "salwar", label: "Salwar (classic or Patiala)" },
      { id: "flare", label: "Flared — sharara or gharara" },
      { id: "palazzo", label: "Palazzo or straight pants" },
      { id: "any", label: "Surprise me" },
    ],
  },
] as const;

type Answers = string[];

function recommend([where, vibe, bottom]: Answers): { slug: CategorySlug; why: string } {
  if (vibe === "heritage")
    return { slug: "modern-bibiyaan-de-designs", why: "You love heritage details — cuffed sleeves, dori necks and full salwars." };
  if (bottom === "flare")
    return where === "wedding"
      ? { slug: "gharara-suits", why: "A gharara's knee-level flare is made for wedding functions." }
      : { slug: "sharara-suits", why: "A sharara is festive, flowing and easy to move in." };
  if (where === "wedding" && bottom === "any")
    return { slug: "bridal-occasion-wear", why: "For a big day, our occasion designs are a good place to start." };
  if (bottom === "palazzo")
    return { slug: "palazzo-suits", why: "Palazzos are relaxed and modern, and work from daily wear to festive." };
  if (vibe === "modern") return { slug: "stylish-suits", why: "Statement necklines and modern cuts suit your style." };
  if (vibe === "traditional" || bottom === "salwar")
    return where === "daily" && vibe === "comfort"
      ? { slug: "daily-wear-suits", why: "Simple, comfortable suits with a classic salwar." }
      : { slug: "punjabi-salwar-suits", why: "The classic salwar kameez — Patiala pleats, borders and all." };
  return { slug: "daily-wear-suits", why: "Simple, comfortable suits that still look beautifully finished." };
}

export function StyleQuiz() {
  const [answers, setAnswers] = useState<Answers>([]);
  const step = answers.length;
  const done = step === questions.length;
  const rec = done ? recommend(answers) : null;

  const labelFor = (qi: number, id: string) => questions[qi].options.find((o) => o.id === id)?.label ?? id;
  const message = rec
    ? `Hello Ruhaniat Studio, I tried "Find Your Suit Style" on your website. Occasion: ${labelFor(0, answers[0])}. Style: ${labelFor(1, answers[1])}. Bottom: ${labelFor(2, answers[2])}. It suggested ${categoryName(rec.slug)} — can you help me choose a design?`
    : "";

  return (
    <section id="find-your-style" className="scroll-mt-24 bg-burgundy-deep text-ivory">
      <div className="container-luxe py-20 md:py-24">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow !text-gold-soft">Find Your Suit Style</p>
          <h2 className="mt-4 text-4xl text-ivory md:text-5xl">Three questions. One starting point.</h2>
          <Ornament className="mx-auto mt-5 text-gold-soft" />
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="mb-8 flex gap-2" aria-hidden>
            {questions.map((_, i) => (
              <span key={i} className={`h-0.5 flex-1 transition-colors duration-500 ${i < step ? "bg-gold-soft" : "bg-ivory/15"}`} />
            ))}
          </div>

          {!done ? (
            <div key={step} className="animate-page-in" role="group" aria-labelledby="quiz-q">
              <p className="text-center text-xs uppercase tracking-[0.22em] text-gold-soft">
                Question {step + 1} of {questions.length}
              </p>
              <h3 id="quiz-q" className="mt-3 text-center text-3xl text-ivory md:text-4xl">
                {questions[step].q}
              </h3>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {questions[step].options.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setAnswers([...answers, o.id])}
                    className="group flex items-center justify-between border border-ivory/20 bg-ivory/[0.04] px-5 py-4 text-left transition-all duration-300 hover:border-gold-soft hover:bg-ivory/[0.08]"
                  >
                    <span className="font-serif text-xl">{o.label}</span>
                    <span className="text-gold-soft transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setAnswers(answers.slice(0, -1))}
                  className="mx-auto mt-6 block text-xs uppercase tracking-[0.18em] text-ivory/60 hover:text-ivory"
                >
                  ← Back
                </button>
              )}
            </div>
          ) : (
            rec && (
              <div className="animate-page-in text-center" aria-live="polite">
                <p className="text-xs uppercase tracking-[0.22em] text-gold-soft">Our suggestion</p>
                <h3 className="mt-3 text-4xl text-ivory md:text-5xl">{categoryName(rec.slug)}</h3>
                <p className="mx-auto mt-4 max-w-lg text-ivory/75">{rec.why}</p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href={`/collections/${rec.slug}`} className={buttonClass("light")}>
                    See These Designs
                  </Link>
                  <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className={buttonClass("whatsapp")}>
                    <WhatsAppIcon /> Ask Us to Help Choose
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setAnswers([])}
                  className="mt-6 text-xs uppercase tracking-[0.18em] text-ivory/60 hover:text-ivory"
                >
                  Start again
                </button>
              </div>
            )
          )}
        </div>

        {rec && (
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 rounded-sm bg-ivory p-6 text-ink sm:grid-cols-3 md:p-8">
            {designsByCategory(rec.slug)
              .slice(0, 3)
              .map((d, i) => (
                <DesignCard key={d.ref} design={d} index={i} />
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
