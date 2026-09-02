import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import SearchClient from "@/components/SearchClient";

export const metadata: Metadata = buildMetadata({
  title: "ค้นหา",
  description: "ค้นหาบทความ สายพันธุ์ ร้านค้า และคู่มือ ทั่วทั้งเว็บ Avocado Geek",
  path: "/search",
});

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <div className="mx-auto max-w-content px-4 pb-20 pt-10 sm:px-6">
      <Breadcrumbs items={[{ label: "หน้าแรก", href: "/" }, { label: "ค้นหา" }]} />
      <h1 className="mb-7 font-display text-4xl font-bold tracking-tight text-avocado-dark sm:text-5xl">
        ค้นหา
      </h1>
      <SearchClient initialQuery={searchParams.q ?? ""} />
    </div>
  );
}
