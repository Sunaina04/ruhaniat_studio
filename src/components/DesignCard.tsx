import Link from "next/link";
import { DesignVisual } from "./DesignVisual";
import { ConceptLabel, WhatsAppIcon } from "./ui";
import { categoryName } from "@/data/categories";
import type { Design } from "@/data/types";
import { designEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

export function DesignCard({ design, priority = false, index = 0 }: { design: Design; priority?: boolean; index?: number }) {
  const href = `/designs/${design.ref.toLowerCase()}`;
  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${(index % 4) * 80}ms` } as React.CSSProperties}
      className="group flex flex-col"
    >
      <Link href={href} className="relative block aspect-[3/4] overflow-hidden bg-beige">
        <DesignVisual
          image={design.image}
          alt={`${design.name} — ${categoryName(design.category)} design ${design.ref}`}
          silhouette={design.silhouette}
          tone={design.tone}
          priority={priority}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 bg-ivory/90 px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.18em] text-burgundy backdrop-blur-sm">
          {design.ref}
        </span>
        {!design.image && <ConceptLabel className="bottom-3 left-3" />}
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">{categoryName(design.category)}</p>
        <h3 className="mt-1.5 text-2xl text-burgundy-deep">
          <Link href={href} className="hover:text-burgundy">
            {design.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{design.description}</p>
        <a
          href={whatsappLink(designEnquiryMessage(design))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-luxe mt-4 inline-flex items-center justify-center gap-2 border border-burgundy/30 px-4 py-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-burgundy transition-colors hover:border-burgundy hover:bg-burgundy hover:text-ivory"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          Enquire About This Design
        </a>
      </div>
    </article>
  );
}
