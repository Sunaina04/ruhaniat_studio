import Link from "next/link";
import { categories } from "@/data/categories";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { Logo } from "./Header";
import { Ornament, WhatsAppIcon } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-burgundy-deep text-ivory/80">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo light />
          <p className="mt-6 max-w-xs font-serif text-xl italic leading-snug text-ivory">{siteConfig.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            A Punjabi ethnic wear design and custom-stitching studio. Choose a design, share your idea, and we stitch it
            for you.
          </p>
          <p className="mt-6 font-gurmukhi text-2xl text-gold-soft">{siteConfig.nameGurmukhi}</p>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow mb-5 !text-gold-soft">Collections</p>
          <ul className="grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/collections/${c.slug}`} className="transition-colors hover:text-gold-soft">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow mb-5 !text-gold-soft">Studio</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/custom-stitching" className="hover:text-gold-soft">Custom Stitching</Link></li>
            <li><Link href="/inspiration" className="hover:text-gold-soft">Design Inspiration</Link></li>
            <li><Link href="/lookbook" className="hover:text-gold-soft">Lookbook</Link></li>
            <li><Link href="/journal" className="hover:text-gold-soft">Ruhaniat Journal</Link></li>
            <li><Link href="/about" className="hover:text-gold-soft">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-gold-soft">Contact &amp; Enquiry</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow mb-5 !text-gold-soft">Talk to Us</p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ivory hover:text-gold-soft"
          >
            <WhatsAppIcon /> WhatsApp
          </a>
          {siteConfig.email && (
            <a href={`mailto:${siteConfig.email}`} className="mt-3 block text-sm hover:text-gold-soft">
              {siteConfig.email}
            </a>
          )}
          {siteConfig.instagram && (
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-sm hover:text-gold-soft"
            >
              Instagram
            </a>
          )}
          <p className="mt-4 text-xs leading-relaxed text-ivory/60">Enquiries by WhatsApp or our enquiry form.</p>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs text-ivory/50 md:flex-row">
          <p>© {year} Ruhaniat Studio. All rights reserved.</p>
          <Ornament className="text-gold/60" />
          <p>Design images shown are sample illustrations.</p>
        </div>
      </div>
    </footer>
  );
}
