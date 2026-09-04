// Client-safe search helpers — no filesystem imports here, so this file can
// be bundled into <SearchClient> (a "use client" component) without pulling
// in lib/dataLoader.ts (which uses `fs` and only runs on the server).
import type { SearchIndexItem, ContentType } from "./types";

export function filterSearchIndex(
  items: SearchIndexItem[],
  query: string,
  type: ContentType | "all" = "all"
): SearchIndexItem[] {
  const q = query.trim().toLowerCase();
  return items.filter((item) => {
    if (type !== "all" && item.type !== type) return false;
    if (!q) return true;
    const haystack = [item.title, item.excerpt, ...item.tags].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  article: "บทความ",
  variety: "สายพันธุ์",
  shop: "ร้านค้า",
};
