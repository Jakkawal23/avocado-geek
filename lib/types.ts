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
  date: string; // ISO, e.g. "2026-08-10" — always Gregorian (ค.ศ.)
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
  references?: string[]; // sources behind the description/stats above
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

// One ordering channel. `type` picks the icon/label shown on the shop page —
// every shop is expected to list at least tiktok/shopee/lazada/facebook/line/phone;
// add more entries with type "other" for anything else (e.g. a second Line, a website).
export type ShopChannelType = "tiktok" | "shopee" | "lazada" | "facebook" | "line" | "phone" | "other";

export interface ShopChannel {
  type: ShopChannelType;
  label: string;
  value: string; // handle, phone number, or "รอผู้ขายยืนยัน" placeholder
  url?: string;
}

// The shop's social media presence — separate from `channels` (which is
// about placing an order). This is "follow us" content: page/profile links,
// not necessarily a place to buy.
export type SocialMediaPlatform = "facebook" | "instagram" | "tiktok" | "youtube" | "other";

export interface SocialMediaLink {
  platform: SocialMediaPlatform;
  label: string;
  value: string; // handle, or "รอผู้ขายยืนยัน" placeholder
  url?: string;
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
  socialMedia?: SocialMediaLink[]; // "follow us" links — Facebook Page, Instagram, TikTok, YouTube, etc.
  tags?: string[]; // product types on offer, e.g. ["ผลสด", "ต้นพันธุ์"] — doubles as the /shops filter
  saleChannels?: string[]; // e.g. ["ออนไลน์", "หน้าสวน/หน้าร้าน"]
  verifiedDate?: string; // e.g. "ส.ค. 2026" — always Gregorian (ค.ศ.)
}

export interface TraceEvent {
  d: string; // ISO date, e.g. "2025-03-12" — always Gregorian (ค.ศ.)
  h: string; // event title
  p: string; // event description
}

export interface TraceLot {
  id: string;
  code: string; // e.g. "AVO-2503-014" — what growers type into /trace
  slug: string;
  varietySlug: string;
  status: string; // e.g. "รับรองแล้ว · อยู่ในระบบติดตาม"
  graftDate: string; // ISO date — this is what the tree's age is counted from
  certDate: string; // ISO date the certification itself was issued
  rootstock: string;
  scion: string;
  method: string; // e.g. "เสียบยอด"
  graftCheck: string; // graft-union inspection result
  firstFruitEstimate: string; // e.g. "2028 (ประมาณ 3 ปีหลังปลูกลงแปลง)"
  warranty: string;
  events: TraceEvent[];
}

export type ContentType = "article" | "variety" | "shop";

export interface SearchIndexItem {
  type: ContentType;
  id: string;
  title: string;
  slug: string;
  url: string;
  excerpt: string;
  tags: string[];
}
