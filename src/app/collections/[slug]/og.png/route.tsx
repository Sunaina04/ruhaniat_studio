import { categories, getCategory } from "@/data/categories";
import { ogImage } from "@/lib/og";

export const dynamic = "force-static";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const c = getCategory((await params).slug)!;
  return ogImage({ eyebrow: "Collection", title: c.name, subtitle: c.tagline, silhouette: c.silhouette, tone: c.tone });
}
