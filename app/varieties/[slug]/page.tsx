import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllArticles,
  getAllVarieties,
  getShopsForVariety,
  getVarietyBySlug,
} from "@/lib/dataLoader";
import { buildMetadata, varietyJsonLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import VarietyCareTabs from "@/components/VarietyCareTabs";

export function generateStaticParams() {
  return getAllVarieties().map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const variety = getVarietyBySlug(params.slug);
  if (!variety) return {};
  return buildMetadata({
    title: variety.name,
    description: variety.description.slice(0, 155),
    path: `/varieties/${variety.slug}`,
    keywords: [variety.name, variety.origin, "สายพันธุ์อโวคาโด้"],
  });
}

export default function VarietyDetailPage({ params }: { params: { slug: string } }) {
  const variety = getVarietyBySlug(params.slug);
  if (!variety) notFound();

  const shops = getShopsForVariety(variety.slug);
  const relatedArticles = getAllArticles()
    .filter((a) => a.title.includes(variety.name) || a.tags?.some((t) => t.includes(variety.name)))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-content px-4 pb-20 pt-10 sm:px-6">
      <JsonLd data={varietyJsonLd(variety)} />
      <Breadcrumbs
        items={[
          { label: "หน้าแรก", href: "/" },
          { label: "สายพันธุ์", href: "/varieties" },
          { label: variety.name },
        ]}
      />

      <div className="mb-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
        <div className="placeholder-tile flex aspect-[4/3] items-center justify-center rounded-3xl border border-[#D8DFD2]">
          <span className="font-mono text-xs text-[#4E6B4A]">gallery — ผลและต้น {variety.name}</span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-avocado px-3.5 py-1.5 text-xs font-bold text-white">
              ✓ CERTIFIED BY AVOCADO GEEK
            </span>
            {variety.sku && (
              <span className="inline-flex items-center rounded-full border border-border bg-beige px-3.5 py-1.5 font-mono text-xs font-bold tracking-wide text-ink-soft">
                {variety.sku}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-4xl font-bold tracking-tight text-avocado-dark sm:text-5xl">
              {variety.name}
            </h1>
            {variety.scientificName && (
              <span className="font-mono text-sm italic text-ink-fainter">{variety.scientificName}</span>
            )}
          </div>
          <p className="text-[17px] leading-relaxed text-ink-soft">{variety.description}</p>

          {variety.stats && variety.stats.length > 0 && (
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
              {variety.stats.map((s) => (
                <div key={s.k} className="flex flex-col gap-1 bg-white p-4">
                  <span className="text-xs text-ink-fainter">{s.k}</span>
                  <span className="text-[15px] font-semibold text-avocado-dark">{s.v}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2.5 pt-1">
            <Link
              href="/shops"
              className="rounded-xl bg-avocado px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-avocado-dark"
            >
              ซื้อต้นพันธุ์นี้
            </Link>
            <Link
              href="/articles"
              className="rounded-xl border border-[#D8D4C6] bg-white px-6 py-3.5 text-[15px] font-semibold text-avocado hover:border-avocado"
            >
              อ่านบทความที่เกี่ยวข้อง
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-14 flex flex-col gap-5">
        <h2 className="font-display text-[26px] font-semibold tracking-tight text-avocado-dark">
          การปลูกและดูแล (ข้อมูลทั่วไป)
        </h2>
        <VarietyCareTabs />
      </div>

      {relatedArticles.length > 0 && (
        <div className="mb-14 flex flex-col gap-5">
          <h2 className="font-display text-[26px] font-semibold tracking-tight text-avocado-dark">
            บทความที่เกี่ยวข้องกับ{variety.name}
          </h2>
          <div className="flex flex-wrap gap-3">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-avocado hover:border-avocado-light"
              >
                {a.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-5">
        <h2 className="font-display text-[26px] font-semibold tracking-tight text-avocado-dark">
          ร้านค้าที่มีสายพันธุ์นี้
        </h2>
        {shops.length === 0 ? (
          <p className="rounded-xl border border-border bg-beige px-5 py-4 text-[15px] text-ink-faint">
            ยังไม่มีร้านค้าที่ยืนยันว่ามีสายพันธุ์นี้จำหน่าย — ดูร้านค้าทั้งหมดได้ที่หน้า
            <Link href="/shops" className="ml-1 font-semibold text-avocado">ร้านค้าที่รับรอง</Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shops.map((s) => (
              <Link
                key={s.slug}
                href={`/shops/${s.slug}`}
                className="flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-5 text-ink hover:border-avocado-light"
              >
                <span className="font-display text-[17px] font-semibold text-avocado-dark">{s.name}</span>
                <span className="text-sm text-ink-faint">{s.location}</span>
                <span className="mt-1 text-sm font-semibold text-avocado">ดูโปรไฟล์ →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
