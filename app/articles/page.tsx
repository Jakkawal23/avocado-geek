import type { Metadata } from "next";
import { getAllArticles, getAllGuides } from "@/lib/dataLoader";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import KnowledgeBrowser from "@/components/KnowledgeBrowser";

export const metadata: Metadata = buildMetadata({
  title: "องค์ความรู้อโวคาโด้",
  description:
    "บทความและคู่มือที่เขียนจากเอกสารวิชาการและคู่มือส่งเสริมการเกษตร อ้างอิงแหล่งข้อมูลอย่าง UC IPM, UC ANR และ UC Davis พร้อมปรับให้เข้ากับสภาพการปลูกในไทย",
  path: "/articles",
});

export default function ArticlesPage() {
  const articles = getAllArticles();
  const guides = getAllGuides();

  return (
    <div className="mx-auto max-w-content px-4 pb-20 pt-10 sm:px-6">
      <Breadcrumbs items={[{ label: "หน้าแรก", href: "/" }, { label: "ความรู้" }]} />
      <div className="mb-9 flex flex-col gap-2.5">
        <h1 className="font-display text-4xl font-bold tracking-tight text-avocado-dark sm:text-5xl">
          องค์ความรู้อโวคาโด้
        </h1>
        <p className="max-w-[66ch] text-[17px] leading-relaxed text-ink-muted">
          บทความและคู่มือแบบทำตามได้ทีละขั้นตอน เขียนจากเอกสารวิชาการอย่าง UC IPM, UC ANR และ
          ศูนย์วิจัยหลังการเก็บเกี่ยว UC Davis พร้อมปรับให้เข้ากับสภาพการปลูกในไทย
        </p>
      </div>
      <KnowledgeBrowser articles={articles} guides={guides} />
    </div>
  );
}
