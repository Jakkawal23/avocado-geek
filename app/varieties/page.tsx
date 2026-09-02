import type { Metadata } from "next";
import { getAllVarieties } from "@/lib/dataLoader";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import VarietiesBrowser from "@/components/VarietiesBrowser";

export const metadata: Metadata = buildMetadata({
  title: "ตรวจสอบสายพันธุ์อโวคาโด้",
  description:
    "สายพันธุ์ที่มีจำหน่ายในไทย พร้อมรหัสสินค้า ความยาก ฤดูเก็บเกี่ยว ขนาดผล และราคาตลาดโดยประมาณ",
  path: "/varieties",
});

export default function VarietiesPage() {
  const varieties = getAllVarieties();

  return (
    <div className="mx-auto max-w-content px-4 pb-20 pt-10 sm:px-6">
      <Breadcrumbs items={[{ label: "หน้าแรก", href: "/" }, { label: "สายพันธุ์อโวคาโด้" }]} />
      <div className="mb-9 flex flex-col gap-2.5">
        <h1 className="font-display text-4xl font-bold tracking-tight text-avocado-dark sm:text-5xl">
          ตรวจสอบสายพันธุ์อโวคาโด้
        </h1>
        <p className="max-w-[62ch] text-[17px] leading-relaxed text-ink-muted">
          สายพันธุ์ที่มีจำหน่ายในไทย พร้อมรหัสสินค้า ความยาก ฤดูเก็บเกี่ยว ขนาดผล และราคาตลาดโดยประมาณ
        </p>
      </div>
      <VarietiesBrowser varieties={varieties} />
    </div>
  );
}
