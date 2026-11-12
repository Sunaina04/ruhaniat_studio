"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { WhatsAppIcon } from "./ui";
import { categories } from "@/data/categories";
import { whatsappLink } from "@/lib/whatsapp";

/** Any button can open the quick-enquiry panel with: window.dispatchEvent(new Event(OPEN_QUICK_ENQUIRY)) */
export const OPEN_QUICK_ENQUIRY = "ruhaniat:quick-enquiry";

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [looking, setLooking] = useState("");
  const [note, setNote] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const show = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener(OPEN_QUICK_ENQUIRY, show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_QUICK_ENQUIRY, show);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>("input,select")?.focus();
  }, [open]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hello Ruhaniat Studio, I have a quick enquiry.",
      name && `Name: ${name}`,
      looking && `Looking for: ${looking}`,
      note && `Details: ${note}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <>
      {open && <button type="button" aria-label="Close quick enquiry" onClick={() => setOpen(false)} className="fixed inset-0 z-50 cursor-default bg-ink/20 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-none" />}

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-label="Quick enquiry"
        className={`fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm origin-bottom-right border border-line bg-ivory shadow-[0_30px_60px_-25px_rgba(74,19,32,0.55)] transition-all duration-500 md:bottom-28 md:right-7 ${
          open ? "visible translate-y-0 scale-100 opacity-100" : "invisible translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between bg-burgundy-deep px-5 py-4 text-ivory">
          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.22em] text-gold-soft">Quick Enquiry</p>
            <p className="mt-1 font-serif text-2xl leading-tight">How can we help?</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="-mr-1 h-9 w-9 text-2xl leading-none text-ivory/70 hover:text-ivory">
            ×
          </button>
        </div>
        <form onSubmit={submit} className="space-y-3 p-5">
          <input className="field !py-2.5" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} aria-label="Your name" autoComplete="name" />
          <select className="field !py-2.5" value={looking} onChange={(e) => setLooking(e.target.value)} aria-label="What are you looking for?">
            <option value="">What are you looking for?</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.name}>{c.name}</option>
            ))}
            <option value="Stitching with my own fabric">Stitching with my own fabric</option>
            <option value="Help choosing a design">Help choosing a design</option>
          </select>
          <textarea className="field !py-2.5" rows={3} placeholder="Occasion, design number, fabric… (optional)" value={note} onChange={(e) => setNote(e.target.value)} aria-label="Details" />
          <button type="submit" className="btn-luxe flex w-full items-center justify-center gap-2 bg-whatsapp px-4 py-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white">
            <WhatsAppIcon /> Send on WhatsApp
          </button>
          <p className="text-center text-[0.68rem] text-muted">
            Opens WhatsApp with your message ready to send ·{" "}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-burgundy underline underline-offset-2">
              or just start a chat
            </a>
          </p>
        </form>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close quick enquiry" : "Open quick enquiry on WhatsApp"}
        className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-whatsapp p-3.5 text-white shadow-[0_12px_30px_-8px_rgba(31,143,78,0.6)] transition-transform hover:scale-105 md:bottom-7 md:right-7"
      >
        {!open && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp/40 [animation-duration:2.6s]" />}
        <WhatsAppIcon className="h-7 w-7" />
        <span className="hidden pr-2 text-[0.7rem] font-medium uppercase tracking-[0.16em] md:inline">{open ? "Close" : "Chat with us"}</span>
      </button>
    </>
  );
}
