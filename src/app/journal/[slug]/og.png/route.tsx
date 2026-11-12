import { articles, getArticle, journalCategories } from "@/data/journal";
import { ogImage } from "@/lib/og";

export const dynamic = "force-static";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug)!;
  return ogImage({
    eyebrow: `Ruhaniat Journal · ${journalCategories[a.category].name}`,
    title: a.title,
    silhouette: a.cover.silhouette,
    tone: a.cover.tone,
  });
}
