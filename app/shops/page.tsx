import type { Metadata } from "next";
import { getAllShops } from "@/lib/dataLoader";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShopsBrowser from "@/components/ShopsBrowser";

export const metadata: Metadata = buildMetadata({
  title: "ร้านค้าที่รับรอง",
  description:
    "ร้านและสวนที่ผ่านการตรวจสอบโดยทีมงาน จำหน่ายทั้งผลอโวคาโด้สดและต้นพันธุ์",
  path: "/shops",
});

export default function ShopsPage() {
  const shops = getAllShops();

  return (
    <div className="mx-auto max-w-content px-4 pb-20 pt-10 sm:px-6">
      <Breadcrumbs items={[{ label: "หน้าแรก", href: "/" }, { label: "ร้านค้าที่รับรอง" }]} />
      <div className="mb-9 flex flex-col gap-2.5">
        <h1 className="font-display text-4xl font-bold tracking-tight text-avocado-dark sm:text-5xl">
          ร้านค้าที่รับรอง
        </h1>
        <p className="max-w-[64ch] text-[17px] leading-relaxed text-ink-muted">
          ร้านและสวนที่ผ่านการตรวจสอบโดยทีมงาน จำหน่ายทั้งผลอโวคาโด้สดและต้นพันธุ์ และกำลังขยายไปสู่สินค้าอื่น
          ที่เกี่ยวข้องกับอโวคาโด้
        </p>
      </div>
      <ShopsBrowser shops={shops} />
    </div>
  );
}
