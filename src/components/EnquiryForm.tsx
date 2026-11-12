"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { categories } from "@/data/categories";
import { getDesign } from "@/data/designs";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon, buttonClass } from "./ui";

const occasions = [
  "Daily wear",
  "Office / work",
  "Festival",
  "Family function",
  "Wedding guest",
  "Engagement / roka",
  "Mehndi / sangeet",
  "Bridal",
  "Other",
];

const MAX_FILES = 5;
const MAX_FILE_MB = 10;

type Values = {
  enquiryType: string;
  name: string;
  phone: string;
  location: string;
  category: string;
  occasion: string;
  designRef: string;
  budget: string;
  requirements: string;
};

type Errors = Partial<Record<keyof Values | "files", string>>;

function buildMessage(v: Values, fileCount: number) {
  const categoryLabel = categories.find((c) => c.slug === v.category)?.name ?? v.category;
  const details = [
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    v.location && `Delivery location: ${v.location}`,
    categoryLabel && `Outfit category: ${categoryLabel}`,
    v.occasion && `Occasion: ${v.occasion}`,
    v.designRef && `Design reference: ${v.designRef}`,
    v.budget && `Budget: ${v.budget}`,
    v.requirements && `Additional requirements: ${v.requirements}`,
    fileCount > 0 && `I have ${fileCount} reference image${fileCount > 1 ? "s" : ""} to share.`,
  ];
  const opening =
    v.enquiryType === "order"
      ? "Hello Ruhaniat Studio, I would like to place a custom stitching order."
      : "Hello Ruhaniat Studio, I would like to enquire about custom stitching.";
  return `${opening}\n\n${details.filter(Boolean).join("\n")}`;
}

export function EnquiryForm() {
  const params = useSearchParams();
  const [values, setValues] = useState<Values>({
    enquiryType: "enquiry",
    name: "",
    phone: "",
    location: "",
    category: "",
    occasion: "",
    designRef: "",
    budget: "",
    requirements: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [waUrl, setWaUrl] = useState("");

  // Pre-fill from links like /contact?design=RS-001&category=stylish-suits
  useEffect(() => {
    const ref = params.get("design");
    const cat = params.get("category");
    const design = ref ? getDesign(ref) : undefined;
    setValues((v) => ({
      ...v,
      enquiryType: params.get("type") === "order" ? "order" : v.enquiryType,
      designRef: design ? `${design.ref} – ${design.name}` : (ref ?? v.designRef),
      category: design?.category ?? (cat && categories.some((c) => c.slug === cat) ? cat : v.category),
    }));
  }, [params]);

  const previews = useMemo(() => files.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })), [files]);
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p.url)), [previews]);

  const set = (key: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list).filter((f) => f.type.startsWith("image/"));
    const tooBig = incoming.find((f) => f.size > MAX_FILE_MB * 1024 * 1024);
    if (tooBig) {
      setErrors((er) => ({ ...er, files: `${tooBig.name} is larger than ${MAX_FILE_MB} MB.` }));
      return;
    }
    const next = [...files, ...incoming].slice(0, MAX_FILES);
    setFiles(next);
    setErrors((er) => ({
      ...er,
      files: files.length + incoming.length > MAX_FILES ? `You can add up to ${MAX_FILES} images.` : undefined,
    }));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Please enter your name.";
    const digits = values.phone.replace(/\D/g, "");
    if (!digits) e.phone = "Please enter your phone number.";
    else if (digits.length < 8 || digits.length > 15) e.phone = "Please enter a valid phone number, with your country code if outside India.";
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }

    const url = whatsappLink(buildMessage(values, files.length));
    setWaUrl(url);

    if (!siteConfig.enquiryEndpoint) {
      // WhatsApp-only mode: open the chat straight away with the details filled in.
      window.open(url, "_blank", "noopener,noreferrer");
      setStatus("done");
      return;
    }

    setStatus("sending");
    try {
      const data = new FormData();
      Object.entries(values).forEach(([k, v]) => data.append(k, v));
      files.forEach((f) => data.append("referenceImages", f));
      const res = await fetch(siteConfig.enquiryEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-gold/40 bg-ivory p-8 text-center md:p-12" role="status">
        <p className="eyebrow">Thank you</p>
        <h2 className="mt-4 text-4xl text-burgundy-deep">Your enquiry is ready</h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          {siteConfig.enquiryEndpoint
            ? "We have received your enquiry and will get back to you soon. For a quicker reply, you can also send it on WhatsApp."
            : "WhatsApp should have opened with your details. Just press send in the chat."}
          {files.length > 0 && " Please attach your reference images in the WhatsApp chat."}
        </p>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("whatsapp", "mt-8")}>
          <WhatsAppIcon /> {siteConfig.enquiryEndpoint ? "Send on WhatsApp" : "Open WhatsApp Again"}
        </a>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 block w-full text-xs uppercase tracking-[0.18em] text-muted underline-offset-4 hover:underline"
        >
          Edit enquiry
        </button>
      </div>
    );
  }

  const label = "mb-2 block text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ink";
  const err = "mt-1.5 text-xs text-burgundy";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      <fieldset className="sm:col-span-2">
        <legend className={label}>I would like to</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { id: "enquiry", title: "Ask about a design", text: "Questions on designs, fabric or price" },
            { id: "order", title: "Place a custom stitching order", text: "In India or from abroad — we ship worldwide" },
          ].map((o) => (
            <label
              key={o.id}
              className={`flex cursor-pointer items-start gap-3 border px-4 py-3.5 transition-colors ${
                values.enquiryType === o.id ? "border-burgundy bg-blush-soft/60" : "border-line bg-[#fffdf9] hover:border-gold"
              }`}
            >
              <input
                type="radio"
                name="enquiryType"
                value={o.id}
                checked={values.enquiryType === o.id}
                onChange={set("enquiryType")}
                className="mt-1 accent-[#6e1e2f]"
              />
              <span>
                <span className="block font-serif text-lg leading-tight text-burgundy-deep">{o.title}</span>
                <span className="mt-0.5 block text-xs text-muted">{o.text}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="f-name" className={label}>Name *</label>
        <input id="f-name" className="field" autoComplete="name" value={values.name} onChange={set("name")}
          aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} placeholder="Your full name" />
        {errors.name && <p id="e-name" className={err}>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="f-phone" className={label}>Phone / WhatsApp *</label>
        <input id="f-phone" type="tel" inputMode="tel" className="field" autoComplete="tel" value={values.phone}
          onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined}
          placeholder="With country code, e.g. +91 / +44 / +1" />
        {errors.phone && <p id="e-phone" className={err}>{errors.phone}</p>}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="f-location" className={label}>Delivery City &amp; Country</label>
        <input id="f-location" className="field" autoComplete="address-level2" value={values.location} onChange={set("location")}
          placeholder="e.g. Ludhiana, India · Toronto, Canada · London, UK" />
        <p className="mt-1.5 text-xs text-muted">We ship worldwide — shipping charges and timelines are confirmed for your destination.</p>
      </div>
      <div>
        <label htmlFor="f-category" className={label}>Outfit Category</label>
        <select id="f-category" className="field" value={values.category} onChange={set("category")}>
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>
      <div>
        <label htmlFor="f-occasion" className={label}>Occasion</label>
        <select id="f-occasion" className="field" value={values.occasion} onChange={set("occasion")}>
          <option value="">Select an occasion</option>
          {occasions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="f-designRef" className={label}>Design Reference</label>
        <input id="f-designRef" className="field" value={values.designRef} onChange={set("designRef")}
          placeholder="e.g. RS-009, or describe it" />
      </div>
      <div>
        <label htmlFor="f-budget" className={label}>Budget</label>
        <input id="f-budget" className="field" value={values.budget} onChange={set("budget")}
          placeholder="Your approximate budget" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="f-requirements" className={label}>Additional Requirements</label>
        <textarea id="f-requirements" rows={5} className="field resize-y" value={values.requirements}
          onChange={set("requirements")}
          placeholder="Changes you would like, fabric (yours or ours), colours, required-by date, measurements…" />
      </div>
      <div className="sm:col-span-2">
        <span className={label}>Reference Images</span>
        <label
          htmlFor="f-files"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            addFiles(e.dataTransfer.files);
          }}
          className="flex cursor-pointer flex-col items-center justify-center border border-dashed border-gold/60 bg-[#fffdf9] px-6 py-8 text-center transition-colors hover:bg-blush-soft/50"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
            <path d="M4 16l4.6-4.6a2 2 0 0 1 2.8 0L16 16m-2-2 1.6-1.6a2 2 0 0 1 2.8 0L20 14M14 8h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
          </svg>
          <span className="mt-3 text-sm text-ink">Tap to upload or drag photos here</span>
          <span className="mt-1 text-xs text-muted">Up to {MAX_FILES} images · {MAX_FILE_MB} MB each</span>
          <input id="f-files" type="file" accept="image/*" multiple className="sr-only"
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }} />
        </label>
        {errors.files && <p className={err}>{errors.files}</p>}
        {previews.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-3">
            {previews.map((p, i) => (
              <li key={p.url} className="relative h-24 w-20 overflow-hidden border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
                <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ivory/90 text-sm text-burgundy"
                  aria-label={`Remove ${p.name}`}>×</button>
              </li>
            ))}
          </ul>
        )}
        {!siteConfig.enquiryEndpoint && files.length > 0 && (
          <p className="mt-3 text-xs text-muted">
            WhatsApp links can&apos;t carry photos automatically — once the chat opens, please attach these images there.
          </p>
        )}
      </div>

      {status === "error" && (
        <div className="border border-burgundy/30 bg-blush-soft p-4 text-sm text-burgundy sm:col-span-2" role="alert">
          Sorry, we couldn&apos;t send the form just now.{" "}
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="font-medium underline">
            Send your enquiry on WhatsApp instead
          </a>
          .
        </div>
      )}

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending"} className={buttonClass("whatsapp", "disabled:opacity-60")}>
          <WhatsAppIcon /> {status === "sending" ? "Sending…" : siteConfig.enquiryEndpoint ? "Send Enquiry" : "Send Enquiry on WhatsApp"}
        </button>
        <p className="text-xs text-muted">We only use your details to reply to your enquiry.</p>
      </div>
    </form>
  );
}
