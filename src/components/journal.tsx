"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GarmentArt } from "./GarmentArt";
import { articles, journalCategories, journalThemes, readingTime, type Article, type JournalCategory } from "@/data/journal";

const issueNo = (a: Article) => String(articles.indexOf(a) + 1).padStart(2, "0");

/**
 * Editorial cover: the article's sketch inside an arch window, with the story number
 * and theme set like a magazine page.
 */
export function JournalCover({ article, size = "card" }: { article: Article; size?: "card" | "feature" }) {
  const t = journalThemes[article.category];
  const big = size === "feature";
  return (
    <div className={`absolute inset-0 overflow-hidden ${t.bg}`}>
      <div className="paper-texture absolute inset-0 opacity-60" aria-hidden />
      <div className={`absolute inset-3 border ${t.line} md:inset-4`} aria-hidden />
      <div className={`absolute bottom-0 right-[8%] top-[12%] aspect-[3/4.2] overflow-hidden rounded-t-[999px] border ${t.line} shadow-[0_20px_40px_-25px_rgba(0,0,0,0.5)] transition-transform duration-[1.2s] ease-out group-hover:-translate-y-1.5`}>
        <GarmentArt
          silhouette={article.cover.silhouette}
          tone={article.cover.tone}
          className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
        />
      </div>
      <div className={`absolute left-6 top-6 md:left-8 md:top-8 ${t.text}`}>
        <p className={`font-serif italic leading-none ${t.accent} ${big ? "text-7xl md:text-8xl" : "text-5xl"}`}>{issueNo(article)}</p>
        <p className={`mt-3 max-w-[9rem] text-[0.58rem] uppercase leading-relaxed tracking-[0.22em] ${big ? "md:max-w-[12rem] md:text-[0.64rem]" : ""}`}>
          {journalCategories[article.category].name}
        </p>
      </div>
      <p className={`absolute bottom-6 left-6 text-[0.58rem] uppercase tracking-[0.24em] md:bottom-8 md:left-8 ${t.text} opacity-70`}>
        Ruhaniat Journal
      </p>
    </div>
  );
}

function Meta({ article }: { article: Article }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.64rem] uppercase tracking-[0.2em] text-gold">
      <span>{journalCategories[article.category].name}</span>
      <span className="h-px w-4 bg-gold/50" />
      <span className="text-muted">{readingTime(article)} min read</span>
    </p>
  );
}

export function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  return (
    <article data-reveal style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as React.CSSProperties} className="group">
      <Link href={`/journal/${article.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_24px_50px_-30px_rgba(74,19,32,0.55)]">
          <JournalCover article={article} />
        </div>
        <div className="pt-5">
          <Meta article={article} />
          <h3 className="mt-2 text-2xl text-burgundy-deep transition-colors group-hover:text-burgundy">{article.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{article.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-burgundy">
            Read More
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

/** Large split layout for the lead story. */
export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article data-reveal className="group">
      <Link href={`/journal/${article.slug}`} className="grid overflow-hidden border border-line bg-ivory md:grid-cols-12">
        <div className="relative aspect-[4/3] md:col-span-7 md:aspect-auto md:min-h-[26rem]">
          <JournalCover article={article} size="feature" />
        </div>
        <div className="flex flex-col justify-center p-7 md:col-span-5 md:p-10 lg:p-12">
          <p className="eyebrow mb-4">Featured Story</p>
          <Meta article={article} />
          <h2 className="mt-3 text-3xl leading-tight text-burgundy-deep transition-colors group-hover:text-burgundy md:text-[2.6rem]">
            {article.title}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">{article.excerpt}</p>
          <span className="btn-luxe mt-7 inline-flex w-fit items-center gap-2 bg-burgundy px-6 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ivory transition-colors group-hover:bg-burgundy-deep">
            Read the Story <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

const filters: ("all" | JournalCategory)[] = ["all", "heritage", "styling", "latest", "fabric"];

/** Filterable article list. The chosen theme is kept in the URL hash (#styling). */
export function JournalExplorer() {
  const [active, setActive] = useState<"all" | JournalCategory>("all");

  useEffect(() => {
    const fromHash = window.location.hash.slice(1) as JournalCategory;
    if (fromHash in journalCategories) setActive(fromHash);
  }, []);

  const choose = (f: "all" | JournalCategory, scroll = false) => {
    setActive(f);
    history.replaceState(null, "", f === "all" ? window.location.pathname : `#${f}`);
    if (scroll) document.getElementById("journal-stories")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const list = active === "all" ? articles : articles.filter((a) => a.category === active);
  const [featured, ...rest] = list;

  return (
    <>
      {/* Browse by theme */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {(Object.keys(journalCategories) as JournalCategory[]).map((c, i) => {
          const t = journalThemes[c];
          const count = articles.filter((a) => a.category === c).length;
          const sample = articles.find((a) => a.category === c)!;
          return (
            <button
              key={c}
              type="button"
              onClick={() => choose(c, true)}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className={`group relative flex min-h-[9.5rem] flex-col justify-between overflow-hidden p-5 text-left transition-transform duration-500 hover:-translate-y-1 md:min-h-[11rem] ${t.bg} ${t.text}`}
            >
              <span className="absolute -bottom-6 -right-4 h-32 w-24 overflow-hidden rounded-t-[999px] opacity-80 transition-transform duration-700 group-hover:-translate-y-2 md:h-40 md:w-28">
                <GarmentArt silhouette={sample.cover.silhouette} tone={sample.cover.tone} className="absolute inset-0 h-full w-full" />
              </span>
              <span className={`relative text-[0.58rem] uppercase tracking-[0.22em] ${t.accent}`}>
                {count} {count === 1 ? "story" : "stories"}
              </span>
              <span className="relative max-w-[70%] font-serif text-xl leading-tight md:text-2xl">{journalCategories[c].name}</span>
            </button>
          );
        })}
      </div>

      <div id="journal-stories" className="scroll-mt-28 pt-14">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:justify-center md:px-0">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => choose(f)}
              aria-pressed={active === f}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-[0.66rem] uppercase tracking-[0.16em] transition-all duration-300 ${
                active === f
                  ? "border-burgundy bg-burgundy text-ivory shadow-[0_8px_20px_-12px_rgba(110,30,47,0.8)]"
                  : "border-line bg-ivory text-ink hover:border-gold hover:text-burgundy"
              }`}
            >
              {f === "all" ? "All Stories" : journalCategories[f].name}
            </button>
          ))}
        </div>
        {active !== "all" && (
          <p className="mx-auto mt-6 max-w-xl text-center text-sm text-muted">{journalCategories[active].description}</p>
        )}

        <div key={active} className="animate-page-in">
          {featured && (
            <div className="mt-10">
              <FeaturedArticle article={featured} />
            </div>
          )}
          {rest.length > 0 && (
            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((a, i) => (
                <ArticleCard key={a.slug} article={a} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/** Thin gold bar at the top of an article showing how far you have read. */
export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("article-body");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setP(Math.min(1, Math.max(0, -r.top / (total > 0 ? total : 1))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[45] h-[3px]" aria-hidden>
      <div className="h-full origin-left bg-gold transition-transform duration-150" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
