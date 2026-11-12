"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DesignVisual } from "./DesignVisual";
import { WhatsAppIcon } from "./ui";
import { siteConfig } from "@/config/site";
import { colourChips, lookGroups, lookbookOrdered, type ColourChip, type LookItem } from "@/data/lookbook";
import { designEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

const SAVED_KEY = "ruhaniat:saved-looks";

function readSaved(): string[] {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) ?? "[]");
  } catch {
    return [];
  }
}

/** Saved looks live only in this browser (localStorage). */
function useSaved() {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => setSaved(readSaved()), []);
  const toggle = useCallback((id: string) => {
    setSaved((cur) => {
      const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
      try {
        localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable — keep in memory only */
      }
      return next;
    });
  }, []);
  return { saved, toggle };
}

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
    </svg>
  );
}

function Visual({ item }: { item: LookItem }) {
  const d = item.design;
  return <DesignVisual image={d.image} alt={`${d.name} — design concept ${d.ref}`} silhouette={d.silhouette} tone={d.tone} />;
}

function shareText(item: LookItem) {
  return `Look at this on Ruhaniat Studio: ${item.title} — ${siteConfig.url}/lookbook/#${item.id}`;
}
function enquiryText(item: LookItem) {
  return designEnquiryMessage(item.design);
}

function Lightbox({
  items,
  index,
  onClose,
  onMove,
  saved,
  toggle,
}: {
  items: LookItem[];
  index: number;
  onClose: () => void;
  onMove: (i: number) => void;
  saved: string[];
  toggle: (id: string) => void;
}) {
  const item = items[index];
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prev = useCallback(() => onMove((index - 1 + items.length) % items.length), [index, items.length, onMove]);
  const next = useCallback(() => onMove((index + 1) % items.length), [index, items.length, onMove]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const related = items.filter((x) => x.id !== item.id && x.collection && x.collection === item.collection).slice(0, 4);
  const isSaved = saved.includes(item.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[60] flex animate-page-in flex-col bg-[#1d0c10]/95 text-ivory backdrop-blur-sm lg:flex-row"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
        touchX.current = null;
      }}
    >
      <div className="relative min-h-0 flex-1">
        <div key={item.id} className="absolute inset-4 animate-page-in md:inset-10">
          <div className="relative mx-auto aspect-[3/4] max-h-full max-w-full" style={{ height: "100%" }}>
            <Visual item={item} />
          </div>
        </div>
        <button type="button" onClick={prev} aria-label="Previous look"
          className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-xl hover:bg-ivory/20 md:left-4">
          ‹
        </button>
        <button type="button" onClick={next} aria-label="Next look"
          className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-xl hover:bg-ivory/20 md:right-4">
          ›
        </button>
      </div>

      <aside className="max-h-[45vh] shrink-0 overflow-y-auto border-t border-ivory/10 bg-[#2a1116] p-5 lg:max-h-none lg:w-[22rem] lg:border-l lg:border-t-0 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-gold-soft">
            Ruhaniat Design Concept · {index + 1}/{items.length}
          </p>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="-mr-2 -mt-2 h-10 w-10 text-2xl leading-none text-ivory/70 hover:text-ivory">
            ×
          </button>
        </div>
        <h2 className="mt-2 font-serif text-3xl leading-tight">{item.title}</h2>
        <p className="mt-1 text-sm text-ivory/60">{item.subtitle}</p>
        <p className="mt-4 text-sm leading-relaxed text-ivory/70">{item.design.description}</p>
        <Link href={`/designs/${item.design.ref.toLowerCase()}`} className="mt-4 inline-block text-xs uppercase tracking-[0.18em] text-gold-soft underline-offset-4 hover:underline">
          View design details →
        </Link>

        <div className="mt-6 grid gap-2">
          <a href={whatsappLink(enquiryText(item))} target="_blank" rel="noopener noreferrer"
            className="btn-luxe inline-flex items-center justify-center gap-2 bg-whatsapp px-4 py-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-white">
            <WhatsAppIcon /> Enquire About This Look
          </a>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => toggle(item.id)} aria-pressed={isSaved}
              className={`inline-flex items-center justify-center gap-2 border px-3 py-3 text-[0.64rem] uppercase tracking-[0.16em] transition-colors ${
                isSaved ? "border-gold-soft bg-gold-soft/15 text-gold-soft" : "border-ivory/25 hover:border-ivory/60"
              }`}>
              <Heart filled={isSaved} /> {isSaved ? "Saved" : "Save"}
            </button>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText(item))}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-ivory/25 px-3 py-3 text-[0.64rem] uppercase tracking-[0.16em] hover:border-ivory/60">
              Share
            </a>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-8">
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-gold-soft">Related looks</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {related.map((r) => (
                <button key={r.id} type="button" onClick={() => onMove(items.indexOf(r))} aria-label={r.title}
                  className="relative aspect-[3/4] overflow-hidden bg-ivory/10 ring-gold-soft hover:ring-1">
                  <Visual item={r} />
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

export function Lookbook() {
  const [group, setGroup] = useState<(typeof lookGroups)[number]["id"]>("all");
  const [colour, setColour] = useState<ColourChip | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const { saved, toggle } = useSaved();

  const items = useMemo(
    () =>
      lookbookOrdered.filter(
        (l) =>
          (group === "all" || (group === "saved" ? saved.includes(l.id) : l.group === group)) &&
          (!colour || l.colours.includes(colour)),
      ),
    [group, colour, saved],
  );

  // Open a shared look from the URL hash, e.g. /lookbook/#gharara-1950
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const i = lookbookOrdered.findIndex((l) => l.id === id);
    if (i >= 0) setOpen(i);
  }, []);

  const openItem = (l: LookItem) => {
    const i = items.indexOf(l);
    setOpen(i);
    history.replaceState(null, "", `#${l.id}`);
  };
  const close = useCallback(() => {
    setOpen(null);
    history.replaceState(null, "", window.location.pathname);
  }, []);
  const move = useCallback(
    (i: number) => {
      setOpen(i);
      history.replaceState(null, "", `#${items[i]?.id ?? ""}`);
    },
    [items],
  );
  // A hash-opened look must be found in the current (unfiltered) list.
  const boxItems = open !== null && open < items.length ? items : lookbookOrdered;

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:justify-center md:px-0">
        {lookGroups.map((g) => (
          <button key={g.id} type="button" onClick={() => setGroup(g.id)} aria-pressed={group === g.id}
            className={`shrink-0 rounded-full border px-4 py-2.5 text-[0.66rem] uppercase tracking-[0.16em] transition-all duration-300 ${
              group === g.id ? "border-burgundy bg-burgundy text-ivory" : "border-line bg-ivory text-ink hover:border-gold hover:text-burgundy"
            }`}>
            {g.id === "saved" ? `Saved ♥ ${saved.length ? `(${saved.length})` : ""}` : g.label}
          </button>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2" aria-label="Filter by colour">
        <span className="mr-1 text-[0.62rem] uppercase tracking-[0.2em] text-muted">Colour</span>
        {colourChips.map((c) => (
          <button key={c.id} type="button" onClick={() => setColour(colour === c.id ? null : c.id)} aria-pressed={colour === c.id}
            title={c.label} aria-label={c.label}
            className={`h-7 w-7 rounded-full border-2 transition-transform duration-300 hover:scale-110 ${
              colour === c.id ? "scale-110 border-burgundy" : "border-ivory shadow-[0_0_0_1px_var(--color-line)]"
            }`}
            style={{ background: c.swatch }} />
        ))}
        {colour && (
          <button type="button" onClick={() => setColour(null)} className="ml-1 text-[0.62rem] uppercase tracking-[0.18em] text-burgundy underline underline-offset-4">
            Clear
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="py-20 text-center text-muted">
          {group === "saved" ? "You haven't saved any looks yet — tap ♥ Save on a look to keep it here." : "No looks match these filters yet."}
        </p>
      ) : (
        <div key={`${group}-${colour}`} className="mt-10 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
          {items.map((l, i) => (
            <figure key={l.id} data-reveal style={{ "--reveal-delay": `${(i % 4) * 70}ms` } as React.CSSProperties}
              className="group relative mb-3 break-inside-avoid sm:mb-4">
              <button type="button" onClick={() => openItem(l)} className="relative block w-full overflow-hidden bg-beige text-left"
                style={{ aspectRatio: i % 3 === 1 ? "3 / 4.6" : "3 / 4" }} aria-label={`View ${l.title}`}>
                <span className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]">
                  <Visual item={l} />
                </span>
                <span className="pointer-events-none absolute left-2 top-2 bg-ivory/90 px-2 py-0.5 text-[0.6rem] tracking-[0.18em] text-burgundy">
                  {l.design.ref}
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-burgundy-deep/80 to-transparent p-3 pt-10 text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="block font-serif text-lg leading-tight">{l.title}</span>
                  <span className="block text-[0.6rem] uppercase tracking-[0.18em] text-ivory/70">{l.subtitle}</span>
                  <span className="text-[0.6rem] uppercase tracking-[0.18em] text-gold-soft">View full screen</span>
                </span>
              </button>
              <button type="button" onClick={() => toggle(l.id)} aria-pressed={saved.includes(l.id)}
                aria-label={saved.includes(l.id) ? `Remove ${l.title} from saved` : `Save ${l.title}`}
                className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-colors ${
                  saved.includes(l.id) ? "bg-burgundy text-ivory" : "bg-ivory/85 text-burgundy hover:bg-ivory"
                }`}>
                <Heart filled={saved.includes(l.id)} />
              </button>
            </figure>
          ))}
        </div>
      )}
      <p className="mt-8 text-center text-xs text-muted">Saved looks are kept only in this browser on this device.</p>

      {/* Portal: page wrappers animate with transforms, which would trap a fixed overlay. */}
      {open !== null &&
        boxItems[open] &&
        createPortal(
          <Lightbox items={boxItems} index={open} onClose={close} onMove={move} saved={saved} toggle={toggle} />,
          document.body,
        )}
    </div>
  );
}
