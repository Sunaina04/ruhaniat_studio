import Image from "next/image";
import { ButtonLink, Ornament, SectionHeading, WhatsAppIcon } from "./ui";
import { previewReviews, reviews, type Review } from "@/data/reviews";
import { whatsappLink } from "@/lib/whatsapp";
import { assetPath } from "@/lib/assets";

const REVIEW_MESSAGE = "Hello Ruhaniat Studio, I would like to share my review of the outfit you stitched for me: ";

function Stars({ rating }: { rating: number }) {
  return (
    <p className="flex gap-1 text-gold" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1" aria-hidden>
          <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z" />
        </svg>
      ))}
    </p>
  );
}

function ReviewCard({ review, sample = false }: { review: Review; sample?: boolean }) {
  return (
    <figure className="relative flex h-full flex-col border border-line bg-ivory p-7 md:p-8">
      {sample && (
        <span className="absolute right-4 top-4 bg-burgundy px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-ivory">
          Sample
        </span>
      )}
      <span className="font-serif text-6xl leading-none text-gold/50" aria-hidden>
        &ldquo;
      </span>
      {review.rating && <Stars rating={review.rating} />}
      <blockquote className="mt-4 flex-1 font-serif text-xl leading-snug text-burgundy-deep">{review.text}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        {review.image && (
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
            <Image src={assetPath(review.image)} alt={review.name} fill sizes="44px" className="object-cover" />
          </span>
        )}
        <span>
          <span className="block text-sm font-medium text-ink">{review.name}</span>
          {(review.location || review.outfit) && (
            <span className="block text-xs text-muted">
              {[review.location, review.outfit].filter(Boolean).join(" · ")}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  // Sample reviews only on the developer's computer — never in production.
  const isPreview = reviews.length === 0 && process.env.NODE_ENV === "development";
  const list = isPreview ? previewReviews : reviews;

  const shareButton = (
    <ButtonLink href={whatsappLink(REVIEW_MESSAGE)} external variant="outline">
      <WhatsAppIcon /> Share Your Review
    </ButtonLink>
  );

  if (list.length === 0) {
    return (
      <section className="bg-ivory-deep">
        <div className="container-luxe py-20 text-center md:py-24">
          <p className="eyebrow mb-4">Customer Stories</p>
          <h2 className="mx-auto max-w-2xl text-4xl text-burgundy-deep md:text-5xl">
            Your Experience, <em className="text-burgundy">Our Inspiration</em>
          </h2>
          <Ornament className="mx-auto mt-5 text-gold" />
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted">
            Ruhaniat Studio is just beginning, and we look forward to creating personalised outfits for our first
            customers. Rather than fill this space with borrowed words, we&apos;ll share real feedback here as it arrives.
            Had an outfit stitched with us? We would love to hear from you.
          </p>
          <div className="mt-9 flex justify-center">{shareButton}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ivory-deep">
      <div className="container-luxe py-20 md:py-28">
        <SectionHeading eyebrow="Customer Reviews" title="Kind words from our customers" />
        {isPreview && (
          <p className="mx-auto mt-8 max-w-xl border border-dashed border-burgundy/40 bg-ivory px-4 py-3 text-center text-xs text-burgundy">
            Layout preview — sample reviews are shown only on your computer (npm run dev) and never on the live site.
            Add real reviews in src/data/reviews.ts.
          </p>
        )}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} review={r} sample={isPreview} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">{shareButton}</div>
      </div>
    </section>
  );
}
