// Shared content types. These mirror the JSON files under /public/data — keep
// the two in sync when you add a new field. Every field is intentionally
// plain (string/number/array) so the JSON files stay easy to hand-edit.

export interface ArticleBody {
  h: string;
  p: string;
  img?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ArticleBody[];
  category: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
  readingMinutes?: number;
}

export interface VarietyStat {
  k: string;
  v: string;
}

export interface Variety {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  scientificName?: string;
  origin: string;
  characteristics: string;
  best_season: string;
  climate: string;
  description: string;
  image?: string;
  difficultyStars?: string;
  stats?: VarietyStat[];
  // ---- Used by the /match variety matcher (lib/matcher.ts) ----
  elevation?: "สูง" | "ราบ" | "ทุกพื้นที่"; // suitable growing elevation
  difficultyLevel?: 1 | 2 | 3 | 4; // 1 = easiest, matches difficultyStars count
  waterNeed?: "ต่ำ" | "ปานกลาง" | "สูง";
  goals?: string[]; // e.g. ["กินเอง", "ขายผลสด", "ขายพรีเมียม", "ทำต้นตอ"]
  // ---- Used by the /varieties filter sidebar ----
  difficultyLabel?: "ง่าย" | "ปานกลาง" | "ยาก";
  fruitSize?: "เล็ก" | "กลาง" | "ใหญ่"; // เล็ก <200g, กลาง 200-350g, ใหญ่ >350g
  seasonBuckets?: string[]; // any of "มิ.ย.–ส.ค." | "ก.ย.–พ.ย." | "ธ.ค.–ก.พ."
  highlights?: string[]; // e.g. ["ราคาสูง", "รสชาติเข้ม", "ทนโรค", "ยอดนิยม"]
}

export interface ShopProduct {
  name: string;
  price: string;
}

export interface ShopChannel {
  label: string;
}

export interface Shop {
  id: string;
  name: string;
  slug: string;
  location: string;
  province?: string;
  phone: string;
  website?: string;
  email?: string;
  hours?: string;
  description: string;
  about?: string;
  rating?: number;
  varieties_available: string[];
  products?: ShopProduct[];
  channels?: ShopChannel[];
  tags?: string[]; // product types on offer, e.g. ["ผลสด", "ต้นพันธุ์"] — doubles as the /shops filter
  saleChannels?: string[]; // e.g. ["ออนไลน์", "หน้าสวน/หน้าร้าน"]
  verifiedDate?: string;
}

export interface Guide {
  id: string;
  title: string;
  slug: string;
  type: string;
  difficulty: string;
  duration: string;
  content: string;
  steps: { title: string; description: string }[];
  tips: string[];
  category?: string;
  date?: string;
}

export interface TraceEvent {
  d: string; // date label, e.g. "15 มี.ค. 2567"
  h: string; // event title
  p: string; // event description
}

export interface TraceLot {
  id: string;
  code: string; // e.g. "AVO-2503-014" — what growers type into /trace
  slug: string;
  varietySlug: string;
  status: string; // e.g. "รับรองแล้ว"
  graftDate: string; // ISO date
  rootstock: string;
  scion: string;
  method: string; // e.g. "เสียบยอด (cleft grafting)"
  warranty: string;
  stats: VarietyStat[];
  events: TraceEvent[];
}

export type ContentType = "article" | "variety" | "shop" | "guide";

export interface SearchIndexItem {
  type: ContentType;
  id: string;
  title: string;
  slug: string;
  url: string;
  excerpt: string;
  tags: string[];
}
