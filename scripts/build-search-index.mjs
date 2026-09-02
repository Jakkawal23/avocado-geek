// Regenerates /public/search-index.json from the JSON files under
// /public/data/**. Runs automatically before `next dev` / `next build`
// (see package.json), so editing or adding a content file is picked up the
// next time the dev server restarts or the site is built — no API route,
// no database.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "public", "data");
const OUT_FILE = path.join(ROOT, "public", "search-index.json");

function readJsonDir(dir) {
  const fullDir = path.join(DATA_DIR, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(fullDir, f), "utf-8")));
}

const articles = readJsonDir("articles").map((a) => ({
  type: "article",
  id: a.id,
  title: a.title,
  slug: a.slug,
  url: `/articles/${a.slug}`,
  excerpt: a.excerpt,
  tags: [a.category, ...(a.tags ?? [])].filter(Boolean),
}));

const varieties = readJsonDir("varieties").map((v) => ({
  type: "variety",
  id: v.id,
  title: v.name,
  slug: v.slug,
  url: `/varieties/${v.slug}`,
  excerpt: v.characteristics,
  tags: [v.origin, v.best_season].filter(Boolean),
}));

const shops = readJsonDir("shops").map((s) => ({
  type: "shop",
  id: s.id,
  title: s.name,
  slug: s.slug,
  url: `/shops/${s.slug}`,
  excerpt: s.description,
  tags: [s.location, ...(s.tags ?? [])].filter(Boolean),
}));

const guides = readJsonDir("guides").map((g) => ({
  type: "guide",
  id: g.id,
  title: g.title,
  slug: g.slug,
  url: `/guides/${g.slug}`,
  excerpt: g.content,
  tags: [g.type, g.difficulty].filter(Boolean),
}));

const index = [...articles, ...varieties, ...shops, ...guides];
fs.writeFileSync(OUT_FILE, JSON.stringify(index), "utf-8");
console.log(`[build-search-index] wrote ${index.length} entries to public/search-index.json`);
