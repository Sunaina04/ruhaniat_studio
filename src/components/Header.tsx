"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/data/categories";
import { mainNav, siteConfig } from "@/config/site";
import { assetPath } from "@/lib/assets";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./ui";
import { OPEN_QUICK_ENQUIRY } from "./WhatsAppFloat";

export function Logo({ light = false }: { light?: boolean }) {
  // Phulkari star + needle wordmark. Source files live in public/brand.
  return (
    <Link href="/" className="group flex items-center" aria-label="Ruhaniat Studio home">
      <Image
        src={assetPath(light ? "/brand/ruhaniat-logo-horizontal-light.svg" : "/brand/ruhaniat-logo-horizontal.svg")}
        alt="Ruhaniat Studio"
        width={1029}
        height={232}
        priority={!light}
        className={`w-auto transition-opacity duration-300 group-hover:opacity-85 ${light ? "h-14 md:h-16" : "h-12 md:h-[3.75rem]"}`}
      />
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

  const navLink =
    "relative text-[0.7rem] uppercase tracking-[0.16em] transition-colors hover:text-burgundy after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:scale-x-100";

  const isActive = (href: string) =>
    href === "/collections" ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-line bg-ivory/90 shadow-[0_10px_30px_-22px_rgba(74,19,32,0.45)] backdrop-blur-md"
          : "border-transparent bg-ivory"
      }`}
    >
      <div
        className={`hidden overflow-hidden bg-burgundy-deep text-center text-[0.66rem] tracking-[0.22em] text-gold-soft transition-all duration-500 md:block ${
          scrolled ? "max-h-0 py-0 opacity-0" : "max-h-10 py-2 opacity-100"
        }`}
      >
        CUSTOM STITCHED TO YOUR MEASUREMENTS · WORLDWIDE SHIPPING AVAILABLE
      </div>
      <div
        className={`container-luxe flex h-[4.5rem] items-center justify-between transition-[height] duration-500 ${
          scrolled ? "md:h-16" : "md:h-20"
        }`}
      >
        <Logo />

        <nav className="hidden items-center gap-6 whitespace-nowrap xl:flex" aria-label="Main">
          <div className="group relative py-5">
            <Link
              href="/collections"
              className={`${navLink} ${isActive("/collections") ? "text-burgundy after:scale-x-100" : "text-ink"}`}
            >
              Collections
            </Link>
            <div className="invisible absolute left-1/2 top-full w-[34rem] -translate-x-1/2 translate-y-2 border border-line bg-ivory p-7 opacity-0 shadow-[0_20px_50px_-20px_rgba(74,19,32,0.25)] transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <Link
                href="/collections/modern-bibiyaan-de-designs"
                className="group/feat mb-5 flex items-center justify-between border border-gold/40 bg-ivory-deep px-4 py-3"
              >
                <span>
                  <span className="eyebrow block !text-[0.58rem]">Signature Collection</span>
                  <span className="font-serif text-xl text-burgundy-deep">Modern Bibiyaan De Designs</span>
                </span>
                <span className="text-gold transition-transform duration-300 group-hover/feat:translate-x-1">→</span>
              </Link>
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
              className={`${navLink} ${isActive(item.href) ? "text-burgundy after:scale-x-100" : "text-ink"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_QUICK_ENQUIRY))}
            className="btn-luxe hidden items-center gap-2 bg-burgundy px-5 py-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-burgundy-deep sm:inline-flex"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Enquire
          </button>
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
          {mainNav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              className={`border-b border-line py-4 font-serif text-[1.7rem] text-burgundy-deep transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
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
