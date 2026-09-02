import type { Metadata } from "next";
import { getAllTraceLots, getAllVarieties } from "@/lib/dataLoader";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import TraceLookupClient from "@/components/TraceLookupClient";
import type { Variety } from "@/lib/types";

export const metadata: Metadata = buildMetadata({
  title: "ตรวจรหัสต้น",
  description:
    "ต้นที่รับรองโดย Avocado Geek ทุกต้นมีรหัสของตัวเอง กรอกรหัสเพื่อดูวันเสียบยอด อายุต้น ต้นตอ และกิ่งพันธุ์ที่ใช้",
  path: "/trace",
});

export default function TracePage() {
  const lots = getAllTraceLots();
  const varieties = getAllVarieties();
  const varietiesBySlug = varieties.reduce<Record<string, Variety>>((acc, v) => {
    acc[v.slug] = v;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-content px-4 pb-20 pt-10 sm:px-6">
      <Breadcrumbs items={[{ label: "หน้าแรก", href: "/" }, { label: "ตรวจรหัสต้น" }]} />
      <TraceLookupClient lots={lots} varietiesBySlug={varietiesBySlug} />
    </div>
  );
}
