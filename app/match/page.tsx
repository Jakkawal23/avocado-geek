import type { Metadata } from "next";
import { getAllVarieties } from "@/lib/dataLoader";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import MatchQuizClient from "@/components/MatchQuizClient";

export const metadata: Metadata = buildMetadata({
  title: "เลือกพันธุ์ให้ฉัน",
  description:
    "เลือกเท่าที่รู้ ข้ามข้อที่ยังไม่แน่ใจได้ — ยิ่งตอบมาก อันดับยิ่งแม่น เราจะบอกด้วยว่าเหมาะเพราะอะไร และมีอะไรต้องระวัง",
  path: "/match",
});

export default function MatchPage() {
  const varieties = getAllVarieties();

  return (
    <div className="mx-auto max-w-content px-4 pb-20 pt-10 sm:px-6">
      <Breadcrumbs items={[{ label: "หน้าแรก", href: "/" }, { label: "เลือกพันธุ์ให้ฉัน" }]} />
      <div className="mb-9 flex flex-col gap-2.5">
        <span className="font-mono text-[13px] uppercase tracking-wider text-ink-faint">variety matcher</span>
        <h1 className="font-display text-4xl font-bold tracking-tight text-avocado-dark sm:text-5xl">
          สายพันธุ์ไหนเหมาะกับคุณ
        </h1>
        <p className="max-w-[62ch] text-[17px] leading-relaxed text-ink-muted">
          เลือกเท่าที่รู้ ข้ามข้อที่ยังไม่แน่ใจได้ — ยิ่งตอบมาก อันดับยิ่งแม่น เราจะบอกด้วยว่าเหมาะเพราะอะไร
          และมีอะไรต้องระวัง
        </p>
      </div>
      <MatchQuizClient varieties={varieties} />
    </div>
  );
}
