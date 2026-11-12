import { GarmentArt } from "./GarmentArt";
import { FadeImage } from "./motion";
import type { Silhouette, Tone } from "@/data/types";

/**
 * Shows the photograph when one is set, otherwise the sample illustration.
 * The parent decides the size; this fills it.
 */
export function DesignVisual({
  image,
  alt,
  silhouette,
  tone,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className = "",
}: {
  image?: string;
  alt: string;
  silhouette: Silhouette;
  tone: Tone;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (image) {
    return <FadeImage src={image} alt={alt} sizes={sizes} priority={priority} className={className} />;
  }
  return <GarmentArt silhouette={silhouette} tone={tone} label={alt} className={`absolute inset-0 h-full w-full ${className}`} />;
}
