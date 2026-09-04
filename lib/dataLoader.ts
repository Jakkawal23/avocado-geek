import fs from "fs";
import path from "path";
import type { Article, Shop, TraceLot, Variety } from "./types";

// All content lives as individual, hand-editable JSON files under
// /public/data/<type>/<slug>.json — no database, no API route. Adding a new
// article/variety/shop is just "copy a file, edit the fields". A how-to guide
// is just an article whose `content` sections happen to be numbered steps.

const DATA_DIR = path.join(process.cwd(), "public", "data");

function readJsonDir<T>(dir: string): T[] {
  const fullDir = path.join(DATA_DIR, dir);
  if (!fs.existsSync(fullDir)) return [];
  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".json"));
  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(fullDir, file), "utf-8");
    try {
      return JSON.parse(raw) as T;
    } catch (err) {
      throw new Error(`Failed to parse ${dir}/${file}: ${(err as Error).message}`);
    }
  });
  return items;
}

function bySlug<T extends { slug: string }>(items: T[], slug: string): T | undefined {
  return items.find((item) => item.slug === slug);
}

// ---- Articles ----

export function getAllArticles(): Article[] {
  return readJsonDir<Article>("articles").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return bySlug(getAllArticles(), slug);
}

export function getArticleTags(): string[] {
  const tags = new Set<string>();
  getAllArticles().forEach((a) => a.tags?.forEach((t) => tags.add(t)));
  return Array.from(tags);
}

export function getArticleCategories(): string[] {
  const categories = new Set<string>();
  getAllArticles().forEach((a) => categories.add(a.category));
  return Array.from(categories);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .filter((a) => a.category === article.category || a.tags?.some((t) => article.tags?.includes(t)))
    .slice(0, limit);
}

// ---- Varieties ----

export function getAllVarieties(): Variety[] {
  return readJsonDir<Variety>("varieties").sort((a, b) => a.name.localeCompare(b.name, "th"));
}

export function getVarietyBySlug(slug: string): Variety | undefined {
  return bySlug(getAllVarieties(), slug);
}

// ---- Shops ----

export function getAllShops(): Shop[] {
  return readJsonDir<Shop>("shops").sort((a, b) => a.name.localeCompare(b.name, "th"));
}

export function getShopBySlug(slug: string): Shop | undefined {
  return bySlug(getAllShops(), slug);
}

export function getShopsForVariety(varietySlug: string): Shop[] {
  return getAllShops().filter((s) => s.varieties_available?.includes(varietySlug));
}

// ---- Trace lots (tree traceability codes, used by /trace) ----

export function getAllTraceLots(): TraceLot[] {
  return readJsonDir<TraceLot>("tracelots");
}

export function getTraceLotByCode(code: string): TraceLot | undefined {
  const normalized = code.trim().toUpperCase();
  return getAllTraceLots().find((lot) => lot.code.toUpperCase() === normalized);
}

// ---- Aggregate stats (used on the homepage) ----

export function getSiteStats() {
  return {
    varietyCount: getAllVarieties().length,
    articleCount: getAllArticles().length,
    shopCount: getAllShops().length,
  };
}
