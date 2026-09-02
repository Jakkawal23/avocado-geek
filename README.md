# Avocado Geek

A modular Next.js (App Router) blog for Thai avocado growers. All content —
articles, varieties, shops, guides — lives in hand-editable JSON files under
`/public/data`. There is no database and no API route for content: pages read
the JSON files directly at build/request time via `lib/dataLoader.ts`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Adding content — no coding required

Every content type is a folder of individual JSON files, one file per item.
To add a new one, **copy an existing file in the same folder, rename it, and
edit the fields.** The filename doesn't matter to the app (the `slug` field
does), but keeping `filename == slug` makes the folder easy to scan.

| Folder | Shape | Used by |
|---|---|---|
| `public/data/articles/*.json` | `{ id, title, slug, excerpt, content, category, date, author, image, tags, readingMinutes }` | `/articles` ("ความรู้"), `/articles/[slug]` |
| `public/data/varieties/*.json` | see below | `/varieties`, `/varieties/[slug]` |
| `public/data/shops/*.json` | `{ id, name, slug, location, phone, website, description, rating, varieties_available, products, channels, tags, saleChannels }` | `/shops`, `/shops/[slug]` |
| `public/data/guides/*.json` | `{ id, title, slug, type, difficulty, duration, content, steps, tips }` | listed inside `/articles` too, detail page at `/guides/[slug]` |
| `public/data/tracelots/*.json` | `{ id, code, slug, varietySlug, status, graftDate, rootstock, scion, method, warranty, stats, events }` | `/trace` (tree traceability lookup) |

**Articles and guides share one listing page.** `/articles` ("ความรู้" in the
nav) renders both content types together with a ทั้งหมด/บทความ/คู่มือ filter
(`components/KnowledgeBrowser.tsx`); `/guides` is kept only as a redirect to
`/articles` for old links. Each guide still has its own detail page at
`/guides/[slug]`.

**Variety fields** — the full shape is `{ id, name, slug, sku,
scientificName, origin, characteristics, best_season, climate, description,
image, difficultyStars, stats }` plus two groups of fields that only exist to
drive filtering/matching (skip them and that variety just won't show up for
that filter/question — nothing breaks):

- `/varieties` filter sidebar reads `difficultyLabel` (`"ง่าย"|"ปานกลาง"|"ยาก"`),
  `fruitSize` (`"เล็ก"|"กลาง"|"ใหญ่"`), `seasonBuckets` (array of
  `"มิ.ย.–ส.ค."` / `"ก.ย.–พ.ย."` / `"ธ.ค.–ก.พ."`), `highlights` (array, any of
  `"ราคาสูง"`, `"รสชาติเข้ม"`, `"ทนโรค"`, `"ยอดนิยม"`).
- `/match` scoring reads `elevation` (`"สูง"|"ราบ"|"ทุกพื้นที่"`),
  `difficultyLevel` (`1`-`4`), `waterNeed` (`"ต่ำ"|"ปานกลาง"|"สูง"`), `goals`
  (array, any of `"กินเอง"`, `"ขายผลสด"`, `"ขายพรีเมียม"`, `"ทำต้นตอ"`) — see
  `lib/matcher.ts`.

Two feature pages beyond the four content types, both still just JSON + client-side logic:

- **`/trace`** — growers type the code printed on a tree's tag (try `AVO-2503-014` on the live site) and see its graft date, computed age, rootstock/scion, a timeline, and warranty — all looked up client-side against `public/data/tracelots/*.json`, no backend. Add a new file to certify a new grafting batch.
- **`/match`** — a short quiz (region, elevation, experience, watering habit, goal) that scores every variety and ranks them with a reason for each.

Shop `tags` doubles as the "ประเภทสินค้า" (product type) filter on `/shops`
(e.g. `["ผลสด", "ต้นพันธุ์"]`); `saleChannels` drives the "ช่องทางการขาย"
filter (e.g. `["ออนไลน์", "หน้าสวน/หน้าร้าน"]`).

`content` on an article is an array of `{ h, p, img? }` sections (heading +
paragraph, with an optional image caption) — that's what builds the table of
contents and the body automatically.

`varieties_available` on a shop and the article `tags` field link content
together (variety pages list shops carrying that slug; the homepage and
article pages surface related content by matching tags/slugs) — use the same
`slug` string that the linked file uses.

After adding or editing a file, restart `npm run dev` (or re-run
`npm run build`) so the generated search index and any statically generated
pages pick up the change — see `scripts/build-search-index.mjs`, which runs
automatically via the `predev`/`prebuild` npm scripts.

## Code structure

- `lib/dataLoader.ts` — reads and parses the JSON folders.
- `lib/seo.ts` — `buildMetadata()` for per-page `<head>` tags, plus JSON-LD
  builders for Article / Product (variety) / LocalBusiness (shop) / HowTo
  (guide) structured data.
- `lib/search.ts` / `lib/searchUtils.ts` — builds and filters the unified search index consumed by
  `/search` (served as a static `/search-index.json` asset, not an API route).
- `lib/matcher.ts` — question definitions and scoring for `/match`.
- `components/` — cards, browsers (client-side search/filter UI), header,
  footer, share buttons, contact form.
- `app/sitemap.ts` / `app/robots.ts` — auto-generated from the same data.

## SEO

Every page sets title/description/OG/Twitter tags via `buildMetadata()`.
Article, variety, shop, and guide detail pages also embed JSON-LD structured
data (`Article`, `Product`, `LocalBusiness`, `HowTo` respectively).
`NEXT_PUBLIC_SITE_URL` controls the canonical/OG URL base — set it in
production.
