import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllShops, getShopBySlug, getAllVarieties } from "@/lib/dataLoader";
import { buildMetadata, shopJsonLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { initials } from "@/components/ShopCard";
import type { ShopChannelType, SocialMediaPlatform } from "@/lib/types";

const CHANNEL_ICON: Record<ShopChannelType, string> = {
  tiktok: "🎵",
  shopee: "🛒",
  lazada: "🛍️",
  facebook: "📘",
  line: "💬",
  phone: "☎️",
  other: "🔗",
};

const SOCIAL_ICON: Record<SocialMediaPlatform, string> = {
  facebook: "📘",
  instagram: "📸",
  tiktok: "🎵",
  youtube: "▶️",
  other: "🔗",
};

export function generateStaticParams() {
  return getAllShops().map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const shop = getShopBySlug(params.slug);
  if (!shop) return {};
  return buildMetadata({
    title: shop.name,
    description: shop.description,
    path: `/shops/${shop.slug}`,
    keywords: [shop.name, shop.location, "ร้านต้นพันธุ์อโวคาโด้"],
  });
}

export default function ShopDetailPage({ params }: { params: { slug: string } }) {
  const shop = getShopBySlug(params.slug);
  if (!shop) notFound();

  const allShops = getAllShops();
  const related = allShops.filter((s) => s.slug !== shop.slug).slice(0, 3);
  const varieties = getAllVarieties().filter((v) => shop.varieties_available?.includes(v.slug));

  return (
    <div className="mx-auto max-w-content px-4 pb-20 pt-10 sm:px-6">
      <JsonLd data={shopJsonLd(shop)} />
      <Breadcrumbs
        items={[
          { label: "หน้าแรก", href: "/" },
          { label: "ร้านค้าที่รับรอง", href: "/shops" },
          { label: shop.name },
        ]}
      />

      <div className="mb-10 grid grid-cols-1 items-center gap-8 rounded-3xl border border-border bg-white p-8 sm:p-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl bg-avocado-pale font-display text-2xl font-bold text-avocado">
              {initials(shop.name)}
            </span>
            <div className="flex flex-col gap-1.5">
              <h1 className="font-display text-3xl font-bold tracking-tight text-avocado-dark sm:text-4xl">
                {shop.name}
              </h1>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-avocado px-4 py-2 text-[13px] font-bold text-white">
            ✓ CERTIFIED BY AVOCADO GEEK{shop.verifiedDate ? ` — ตรวจสอบเมื่อ ${shop.verifiedDate}` : ""}
          </span>
          <div className="grid grid-cols-1 gap-3.5 pt-1 text-[15px] text-ink-soft sm:grid-cols-2">
            <span>📍 {shop.location}</span>
            <span>☎️ {shop.phone}</span>
            {shop.hours && <span>🕘 {shop.hours}</span>}
            {shop.email && <span>✉️ {shop.email}</span>}
          </div>
        </div>
        <div className="placeholder-tile flex min-h-[220px] items-center justify-center rounded-2xl border border-border">
          <span className="text-center font-mono text-xs text-[#4E6B4A]">
            map embed — {shop.province ?? shop.location}
          </span>
        </div>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-6">
          <span className="font-display text-lg font-semibold text-avocado-dark">เกี่ยวกับร้าน</span>
          <p className="text-[15px] leading-loose text-ink-soft">{shop.about ?? shop.description}</p>
        </div>
        {shop.products && shop.products.length > 0 && (
          <div className="flex flex-col gap-3.5 rounded-2xl border border-border bg-white p-6">
            <span className="font-display text-lg font-semibold text-avocado-dark">สินค้า</span>
            {shop.products.map((p) => (
              <div key={p.name} className="flex items-baseline justify-between gap-3 border-b border-[#F0EEE5] pb-2.5">
                <span className="text-[15px] text-ink">{p.name}</span>
                <span className="whitespace-nowrap font-mono text-sm font-bold text-avocado">{p.price}</span>
              </div>
            ))}
          </div>
        )}
        {shop.channels && shop.channels.length > 0 && (
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-6">
            <span className="font-display text-lg font-semibold text-avocado-dark">ช่องทางการสั่งซื้อ</span>
            {shop.channels.map((c) => (
              <div
                key={c.type + c.label}
                className="flex items-center justify-between gap-2.5 rounded-[11px] border border-border px-3.5 py-3 text-[15px] text-ink"
              >
                <span className="flex items-center gap-2 font-medium">
                  <span aria-hidden>{CHANNEL_ICON[c.type]}</span>
                  {c.label}
                </span>
                <span className="text-sm text-ink-faint">{c.value}</span>
              </div>
            ))}
          </div>
        )}
        {shop.socialMedia && shop.socialMedia.length > 0 && (
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-6">
            <span className="font-display text-lg font-semibold text-avocado-dark">โซเชียลมีเดีย</span>
            {shop.socialMedia.map((s) => (
              <div
                key={s.platform + s.label}
                className="flex items-center justify-between gap-2.5 rounded-[11px] border border-border px-3.5 py-3 text-[15px] text-ink"
              >
                <span className="flex items-center gap-2 font-medium">
                  <span aria-hidden>{SOCIAL_ICON[s.platform]}</span>
                  {s.label}
                </span>
                <span className="text-sm text-ink-faint">{s.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {varieties.length > 0 && (
        <div className="mb-12 flex flex-col gap-5">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-avocado-dark">สายพันธุ์ที่มีจำหน่าย</h2>
          <div className="flex flex-wrap gap-3">
            {varieties.map((v) => (
              <Link
                key={v.slug}
                href={`/varieties/${v.slug}`}
                className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-avocado hover:border-avocado-light"
              >
                {v.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-avocado-dark">ร้านค้าใกล้เคียง</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/shops/${s.slug}`}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-white p-5 text-ink hover:border-avocado-light"
              >
                <span className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-avocado-pale font-display font-bold text-avocado">
                  {initials(s.name)}
                </span>
                <span className="font-display text-[17px] font-semibold text-avocado-dark">{s.name}</span>
                <span className="text-sm text-ink-faint">{s.location}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
