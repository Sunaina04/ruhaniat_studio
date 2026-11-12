import { categoryName } from "@/data/categories";
import { designs, getDesign } from "@/data/designs";
import { ogImage } from "@/lib/og";

export const dynamic = "force-static";

export function generateStaticParams() {
  return designs.map((d) => ({ ref: d.ref.toLowerCase() }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ ref: string }> }) {
  const d = getDesign((await params).ref)!;
  return ogImage({
    eyebrow: `${categoryName(d.category)} · ${d.ref}`,
    title: d.name,
    subtitle: d.description,
    silhouette: d.silhouette,
    tone: d.tone,
  });
}
