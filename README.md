# Avocado Geek

A modular Next.js (App Router) blog for Thai avocado growers. All content —
articles, varieties, shops — lives in hand-editable JSON files under
`/public/data`. There is no database and no API route for content: pages read
the JSON files directly at build/request time via `lib/dataLoader.ts`. All
dates stored and displayed across the site are Gregorian (ค.ศ.).

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
| `public/data/shops/*.json` | see below | `/shops`, `/shops/[slug]` |
| `public/data/tracelots/*.json` | see below | `/trace` (tree traceability lookup) |

**There is only one knowledge content type: articles.** A quick tip and a
full step-by-step growing guide are both just articles — a "guide" is simply
an article whose `content` sections happen to be numbered steps (see
`how-to-plant-avocado.json` for an example: each section's `h` is
`"ขั้นที่ 1 — ..."`). `/articles` has no บทความ/คู่มือ split; it's one feed
with a category filter (`components/ArticlesBrowser.tsx`). `content` is an
array of `{ h, p, img? }` sections (heading + paragraph, optional image
caption) — that builds the table of contents and body automatically.

**Variety fields** — the full shape is `{ id, name, slug, sku,
scientificName, origin, characteristics, best_season, climate, description,
image, difficultyStars, stats, references }`. `references` is a plain array
of source names shown at the bottom of the variety page (e.g. `["UC Riverside
– Avocado Variety Collection"]`) — keep every variety's facts traceable to a
real source there. Two more field groups only drive filtering/matching (skip
them and that variety just won't show up for that filter/question — nothing
breaks):

- `/varieties` filter sidebar reads `difficultyLabel` (`"ง่าย"|"ปานกลาง"|"ยาก"`),
  `fruitSize` (`"เล็ก"|"กลาง"|"ใหญ่"`), `seasonBuckets` (array of
  `"มิ.ย.–ส.ค."` / `"ก.ย.–พ.ย."` / `"ธ.ค.–ก.พ."`), `highlights` (array, any of
  `"ราคาสูง"`, `"รสชาติเข้ม"`, `"ทนโรค"`, `"ยอดนิยม"`).
- `/match` scoring reads `elevation` (`"สูง"|"ราบ"|"ทุกพื้นที่"`),
  `difficultyLevel` (`1`-`4`), `waterNeed` (`"ต่ำ"|"ปานกลาง"|"สูง"`), `goals`
  (array, any of `"กินเอง"`, `"ขายผลสด"`, `"ขายพรีเมียม"`, `"ทำต้นตอ"`) — see
  `lib/matcher.ts`.

**Shop fields** — `{ id, name, slug, location, phone, website, description,
about, rating, varieties_available, products, tags, saleChannels, channels,
socialMedia, verifiedDate }`. `tags` doubles as the "ประเภทสินค้า" filter on
`/shops` (e.g. `["ผลสด", "ต้นพันธุ์"]`); `saleChannels` drives the
"ช่องทางการขาย" filter (`["ออนไลน์", "หน้าสวน/หน้าร้าน"]`). `channels` is the
**ordering** list ("ช่องทางการสั่งซื้อ") — every shop should list all six
base types (`tiktok`, `shopee`, `lazada`, `facebook`, `line`, `phone`), each
as `{ type, label, value, url? }`. `socialMedia` is a separate **"follow
us"** list ("โซเชียลมีเดีย") — page/profile links rather than a place to buy
— each `{ platform, label, value, url? }` with `platform` one of `facebook`,
`instagram`, `tiktok`, `youtube`, or `other`; add more entries as needed (a
shop can list Facebook in both sections — one for messaging to order, one as
the page to follow). `varieties_available` links to variety `slug`s so the
variety page can list shops carrying it.

**`/trace`** — growers type the code printed on a tree's tag (try
`AVO-2503-014` on the live site) and see a 12-field fact grid (variety, graft
date, computed age, rootstock/scion, graft-union check, certification date,
status, etc.), a timeline, and the warranty — all looked up client-side
against `public/data/tracelots/*.json`, no backend. A `TraceLot` is
`{ id, code, slug, varietySlug, status, graftDate, certDate, rootstock,
scion, method, graftCheck, firstFruitEstimate, warranty, events }`; `events`
is an array of `{ d, h, p }` (date, title, description). Add a new file to
certify a new grafting batch.

**`/match`** — a short quiz (region, elevation, experience, watering habit,
goal) that scores every variety and ranks them with a reason for each; see
`lib/matcher.ts`.

After adding or editing a file, restart `npm run dev` (or re-run
`npm run build`) so the generated search index and any statically generated
pages pick up the change — see `scripts/build-search-index.mjs`, which runs
automatically via the `predev`/`prebuild` npm scripts.

## Code structure

- `lib/dataLoader.ts` — reads and parses the JSON folders.
- `lib/date.ts` — `formatThaiDate()`: Thai month names, Gregorian (ค.ศ.) year.
  Use this everywhere a stored date is displayed — never format a date
  in-line with the default `"th-TH"` locale, which defaults to the Buddhist
  calendar.
- `lib/seo.ts` — `buildMetadata()` for per-page `<head>` tags, plus JSON-LD
  builders for Article / Product (variety) / LocalBusiness (shop).
- `lib/search.ts` / `lib/searchUtils.ts` — builds and filters the unified
  search index consumed by `/search` (served as a static
  `/search-index.json` asset, not an API route).
- `lib/matcher.ts` — question definitions and scoring for `/match`.
- `components/` — cards, browsers (client-side search/filter UI), header,
  footer, share buttons, contact form.
- `app/sitemap.ts` / `app/robots.ts` — auto-generated from the same data.

## Mobile

Every page is built mobile-first (base classes target the phone layout,
`sm:`/`lg:` widen it up). The `/varieties` and `/shops` filter sidebars
collapse behind a "ตัวกรอง" toggle button below the `lg` breakpoint so the
result list isn't pushed below a tall filter panel on a phone.

## SEO

Every page sets title/description/OG/Twitter tags via `buildMetadata()`.
Article, variety, and shop detail pages also embed JSON-LD structured data
(`Article`, `Product`, `LocalBusiness` respectively). `NEXT_PUBLIC_SITE_URL`
controls the canonical/OG URL base — set it in production.
