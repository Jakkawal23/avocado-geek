import type { Metadata } from "next";
import { getAllGuides } from "@/lib/dataLoader";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import GuideCard from "@/components/GuideCard";

export const metadata: Metadata = buildMetadata({
  title: "คู่มือปลูกและดูแล",
  description: "ขั้นตอนปลูก ดูแล เก็บเกี่ยว และให้คะแนนความแก่อโวคาโด้ อ้างอิงงานวิชาการ",
  path: "/guides",
});

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <div className="mx-auto max-w-content px-4 pb-20 pt-10 sm:px-6">
      <Breadcrumbs items={[{ label: "หน้าแรก", href: "/" }, { label: "คู่มือ" }]} />
      <div className="mb-9 flex flex-col gap-2.5">
        <h1 className="font-display text-4xl font-bold tracking-tight text-avocado-dark sm:text-5xl">
          คู่มือปลูกและดูแล
        </h1>
        <p className="max-w-[62ch] text-[17px] leading-relaxed text-ink-muted">
          คู่มือแบบทำตามได้ทีละขั้นตอน ตั้งแต่การปลูก การให้น้ำ ไปจนถึงการให้คะแนนความแก่ก่อนเก็บเกี่ยว
        </p>
      </div>
      {guides.length === 0 ? (
        <p className="text-ink-faint">ยังไม่มีคู่มือ — เพิ่มไฟล์ .json ใหม่ใน /public/data/guides ได้เลย</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      )}
    </div>
  );
}
