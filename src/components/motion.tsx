"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { assetPath } from "@/lib/assets";

/**
 * Watches every [data-reveal] element and marks it shown when it scrolls into view.
 * Mounted once in the root layout; re-scans after each navigation.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const show = (el: Element) => el.setAttribute("data-shown", "");
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(show);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const scan = () =>
      document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el));
    scan();
    // Client components (filters, galleries) can add new reveal targets later.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}

/** Photograph that fades in over a shimmer once loaded. Fills its parent. */
export function FadeImage({
  src,
  alt,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const flag = loaded ? { "data-loaded": "" } : {};
  return (
    <span className="img-shell absolute inset-0 block" {...flag}>
      <Image
        src={assetPath(src)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        ref={(img) => {
          // Cached images can finish before hydration attaches onLoad.
          if (img?.complete && img.naturalWidth > 0 && !loaded) setLoaded(true);
        }}
        className={`img-fade object-cover ${className}`}
        {...flag}
      />
    </span>
  );
}
