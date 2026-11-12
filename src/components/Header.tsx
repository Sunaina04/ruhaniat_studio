"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/data/categories";
import { mainNav, siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./ui";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex flex-col items-start leading-none" aria-label="Ruhaniat Studio home">
      <span
        className={`font-serif text-[1.65rem] font-medium tracking-[0.2em] md:text-[1.85rem] ${light ? "text-ivory" : "text-burgundy-deep"}`}
      >
        RUHANIAT
      </span>
      <span className={`mt-1 flex items-center gap-2 text-[0.58rem] tracking-[0.5em] ${light ? "text-gold-soft" : "text-gold"}`}>
        <span className={`h-px w-4 ${light ? "bg-gold-soft" : "bg-gold"}`} />
        STUDIO
        <span className={`h-px w-4 ${light ? "bg-gold-soft" : "bg-gold"}`} />
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/collections" ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled ? "border-line bg-ivory/95 backdrop-blur-md" : "border-transparent bg-ivory"
      }`}
    >
      <div className="hidden bg-burgundy-deep py-2 text-center text-[0.66rem] tracking-[0.22em] text-gold-soft md:block">
        PERSONALISED PUNJABI SUITS · CUSTOM STITCHED TO YOUR MEASUREMENTS
      </div>
      <div className="container-luxe flex h-[4.5rem] items-center justify-between md:h-20">
        <Logo />

        <nav className="hidden items-center gap-7 whitespace-nowrap xl:flex" aria-label="Main">
          <div className="group relative">
            <Link
              href="/collections"
              className={`py-7 text-[0.72rem] uppercase tracking-[0.2em] transition-colors hover:text-burgundy ${
                isActive("/collections") ? "text-burgundy" : "text-ink"
              }`}
            >
              Collections
            </Link>
            <div className="invisible absolute left-1/2 top-full w-[34rem] -translate-x-1/2 translate-y-2 border border-line bg-ivory p-7 opacity-0 shadow-[0_20px_50px_-20px_rgba(74,19,32,0.25)] transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <p className="eyebrow mb-4">Our Collections</p>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/collections/${c.slug}`}
                      className="font-serif text-lg text-burgundy-deep transition-colors hover:text-gold"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/collections"
                className="mt-5 inline-block border-b border-gold pb-0.5 text-[0.66rem] uppercase tracking-[0.2em] text-burgundy"
              >
                View all collections
              </Link>
            </div>
          </div>
          {mainNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.72rem] uppercase tracking-[0.2em] transition-colors hover:text-burgundy ${
                isActive(item.href) ? "text-burgundy" : "text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 bg-burgundy px-5 py-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-burgundy-deep sm:inline-flex"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Enquire
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="relative flex h-11 w-11 items-center justify-center xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className={`absolute h-px w-6 bg-burgundy-deep transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
            <span className={`absolute h-px w-6 bg-burgundy-deep transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full z-40 h-[100dvh] overflow-y-auto pb-32 bg-ivory transition-all duration-300 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="container-luxe flex flex-col py-8" aria-label="Mobile">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-line py-4 font-serif text-[1.7rem] text-burgundy-deep"
            >
              {item.label}
            </Link>
          ))}
          <p className="eyebrow mb-3 mt-8">Collections</p>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/collections/${c.slug}`} className="text-[0.95rem] text-muted hover:text-burgundy">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center justify-center gap-2 bg-whatsapp px-6 py-4 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-white"
          >
            <WhatsAppIcon />
            Chat on WhatsApp
          </a>
          <p className="mt-6 text-center font-gurmukhi text-lg text-gold">{siteConfig.nameGurmukhi}</p>
        </nav>
      </div>
    </header>
  );
}
