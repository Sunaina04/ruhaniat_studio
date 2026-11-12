import { siteConfig } from "@/config/site";
import { ogImage } from "@/lib/og";

export const dynamic = "force-static";

export function GET() {
  return ogImage({
    eyebrow: "Punjabi Suit Designs · Custom Stitching",
    title: siteConfig.tagline,
    subtitle: "Daily wear, salwar, gharara, sharara and heritage suits — stitched to your measurements.",
  });
}
