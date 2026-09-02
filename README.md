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
| `public/data/articles/*.json` | `{ id, title, slug, excerpt, content, category, date, author, image, tags, readingMinutes }` | `/articles`, `/articles/[slug]` |
| `public/data/varieties/*.json` | `{ id, name, slug, origin, characteristics, best_season, climate, description, image, sku, scientificName, difficultyStars, stats }` | `/varieties`, `/varieties/[slug]` |
| `public/data/shops/*.json` | `{ id, name, slug, location, phone, website, description, rating, varieties_available, products, channels, tags }` | `/shops`, `/shops/[slug]` |
| `public/data/guides/*.json` | `{ id, title, slug, type, difficulty, duration, content, steps, tips }` | `/guides`, `/guides/[slug]` |
| `public/data/tracelots/*.json` | `{ id, code, slug, varietySlug, status, graftDate, rootstock, scion, method, warranty, stats, events }` | `/trace` (tree traceability lookup) |

Two more sections beyond the core four, both driven by the same JSON data:

- **`/trace`** — growers type the code printed on a tree's tag (try `AVO-2503-014` on the live site) and see its graft date, computed age, rootstock/scion, a timeline, and warranty — all looked up client-side against `public/data/tracelots/*.json`, no backend. Add a new file to certify a new grafting batch.
- **`/match`** — a short quiz (region, elevation, experience, watering habit, goal) that scores every variety in `public/data/varieties/*.json` and ranks them with a reason for each. The scoring reads four extra fields on the variety JSON: `elevation`, `difficultyLevel`, `waterNeed`, `goals` — set these on a new variety so it participates correctly (see `lib/matcher.ts`).

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
  footer, share buttons, contact form, newsletter box.
- `app/sitemap.ts` / `app/robots.ts` — auto-generated from the same data.

## SEO

Every page sets title/description/OG/Twitter tags via `buildMetadata()`.
Article, variety, shop, and guide detail pages also embed JSON-LD structured
data (`Article`, `Product`, `LocalBusiness`, `HowTo` respectively).
`NEXT_PUBLIC_SITE_URL` controls the canonical/OG URL base — set it in
production.
