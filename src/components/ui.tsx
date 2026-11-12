import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "whatsapp" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-burgundy text-ivory hover:bg-burgundy-deep",
  outline: "border border-burgundy/40 text-burgundy hover:border-burgundy hover:bg-burgundy hover:text-ivory",
  whatsapp: "bg-whatsapp text-white hover:brightness-110",
  light: "border border-ivory/60 text-ivory hover:bg-ivory hover:text-burgundy-deep",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `btn-luxe inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-center leading-snug text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-all duration-300 ${variants[variant]} ${extra}`;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  external,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; external?: boolean }) {
  if (external) {
    return (
      <a
        href={String(props.href)}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass(variant, className)}
        aria-label={props["aria-label"]}
      >
        {children}
      </a>
    );
  }
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      {children}
    </Link>
  );
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 14" className={`h-3.5 w-28 ${className}`} aria-hidden>
      <path d="M0 7 H46 M74 7 H120" stroke="currentColor" strokeWidth="0.8" />
      <path d="M60 1 L66 7 L60 13 L54 7 Z" fill="none" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="60" cy="7" r="1.6" fill="currentColor" />
      <circle cx="49" cy="7" r="1" fill="currentColor" />
      <circle cx="71" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className = "",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Tag className="text-4xl text-burgundy-deep md:text-5xl">{title}</Tag>
      <Ornament className={`mt-5 text-gold ${centered ? "mx-auto" : ""}`} />
      {intro && <div className="mt-5 text-[1.02rem] leading-relaxed text-muted">{intro}</div>}
    </div>
  );
}

export function ConceptLabel({ className = "left-3 top-3" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute z-[1] bg-burgundy/90 px-2 py-1 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-ivory ${className}`}
    >
      Ruhaniat Design Concept
    </span>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.45-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.9.99 6.68 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.45 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.07c0 2 .52 3.96 1.52 5.68L.58 23.7l6.08-1.6a11.36 11.36 0 0 0 5.39 1.37h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.9-3.33-8.04" />
    </svg>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="paper-texture border-b border-line bg-ivory-deep">
      <div className="container-luxe py-16 text-center md:py-24">
        <p className="eyebrow mb-5 animate-fade-up">{eyebrow}</p>
        <h1 className="mx-auto max-w-3xl animate-fade-up text-[2.6rem] leading-[1.05] text-burgundy-deep md:text-6xl">
          {title}
        </h1>
        <Ornament className="mx-auto mt-6 text-gold" />
        {intro && (
          <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-muted">{intro}</p>
        )}
        {children}
      </div>
    </section>
  );
}
