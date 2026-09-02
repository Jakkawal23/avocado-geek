import type { Metadata } from "next";
import type { Article, Guide, Shop, Variety } from "./types";

export const SITE_NAME = "Avocado Geek";
export const SITE_DESCRIPTION =
  "Avocado Geek — ศูนย์รวมความรู้อโวคาโด้ของไทย: ฐานข้อมูลสายพันธุ์ วิธีปลูก การให้น้ำ การแก้ปัญหาโรคและแมลง และร้านค้าที่รับรอง";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://avocado-geek.example.com";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
}

// Central helper so every page builds its <head> the same way — one place to
// change the OG image fallback, the title template, etc.
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image,
  type = "website",
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? `${SITE_URL}/og-default.png`;

  return {
    // Plain string here — the root layout's title.template ("%s | Avocado
    // Geek") appends the site name, so don't double it up here.
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage }],
      locale: "th_TH",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// ---- JSON-LD structured data builders ----

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image ? `${SITE_URL}${article.image}` : undefined,
    datePublished: article.date,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: SITE_NAME },
    keywords: article.tags?.join(", "),
    mainEntityOfPage: `${SITE_URL}/articles/${article.slug}`,
  };
}

export function varietyJsonLd(variety: Variety) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: variety.name,
    description: variety.description,
    image: variety.image ? `${SITE_URL}${variety.image}` : undefined,
    brand: { "@type": "Brand", name: SITE_NAME },
    additionalProperty: (variety.stats ?? []).map((s) => ({
      "@type": "PropertyValue",
      name: s.k,
      value: s.v,
    })),
  };
}

export function shopJsonLd(shop: Shop) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: shop.name,
    description: shop.description,
    address: { "@type": "PostalAddress", addressLocality: shop.location },
    telephone: shop.phone,
    url: shop.website,
    aggregateRating: shop.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: shop.rating,
          reviewCount: 1,
        }
      : undefined,
  };
}

export function guideJsonLd(guide: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.content,
    totalTime: guide.duration,
    step: guide.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };
}
