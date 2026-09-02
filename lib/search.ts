import type { SearchIndexItem } from "./types";
import { getAllArticles, getAllVarieties, getAllShops, getAllGuides } from "./dataLoader";

export { filterSearchIndex, CONTENT_TYPE_LABELS } from "./searchUtils";

// Builds the flat, unified index used for site-wide search. Server-only
// (reads the filesystem via dataLoader) — the build-time generator script
// (scripts/build-search-index.mjs) re-implements this same shape to write
// /public/search-index.json, since that script runs outside the Next.js
// module graph. Keep the two in sync when the shape changes.
export function buildSearchIndex(): SearchIndexItem[] {
  const articles: SearchIndexItem[] = getAllArticles().map((a) => ({
    type: "article",
    id: a.id,
    title: a.title,
    slug: a.slug,
    url: `/articles/${a.slug}`,
    excerpt: a.excerpt,
    tags: [a.category, ...(a.tags ?? [])],
  }));

  const varieties: SearchIndexItem[] = getAllVarieties().map((v) => ({
    type: "variety",
    id: v.id,
    title: v.name,
    slug: v.slug,
    url: `/varieties/${v.slug}`,
    excerpt: v.characteristics,
    tags: [v.origin, v.best_season].filter(Boolean),
  }));

  const shops: SearchIndexItem[] = getAllShops().map((s) => ({
    type: "shop",
    id: s.id,
    title: s.name,
    slug: s.slug,
    url: `/shops/${s.slug}`,
    excerpt: s.description,
    tags: [s.location, ...(s.tags ?? [])].filter(Boolean),
  }));

  const guides: SearchIndexItem[] = getAllGuides().map((g) => ({
    type: "guide",
    id: g.id,
    title: g.title,
    slug: g.slug,
    url: `/guides/${g.slug}`,
    excerpt: g.content,
    tags: [g.type, g.difficulty].filter(Boolean),
  }));

  return [...articles, ...varieties, ...shops, ...guides];
}
