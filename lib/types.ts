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
  tags?: string[];
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
