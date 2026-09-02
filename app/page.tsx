import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles, getAllVarieties, getSiteStats } from "@/lib/dataLoader";
import { buildMetadata } from "@/lib/seo";
import ArticleCard from "@/components/ArticleCard";
import VarietyCard from "@/components/VarietyCard";

export const metadata: Metadata = buildMetadata({
  title: "ฐานของความรู้อโวคาโด้ทั้งหมด",
  description:
    "ตั้งแต่การเลือกสายพันธุ์ การปลูก ไปจนถึงร้านค้าที่เราตรวจสอบแล้ว — คู่มือของผู้ปลูกอโวคาโด้ไทย รวบรวมไว้ในที่เดียว",
  path: "/",
});

const QUICK_LINKS = [
  {
    href: "/articles",
    emoji: "📚",
    title: "เรียนรู้",
    desc: "วิธีปลูก การดูแล และเทคนิคจากผู้ปลูกจริง ตลอดทั้งปี",
    cta: "ไปยังบล็อก →",
    tone: "primary" as const,
  },
  {
    href: "/match",
    emoji: "🎯",
    title: "จับคู่สายพันธุ์",
    desc: "บอกพื้นที่และสิ่งที่ต้องการ เราจัดอันดับสายพันธุ์ที่เหมาะกับคุณพร้อมเหตุผล",
    cta: "เริ่มจับคู่ →",
    tone: "light" as const,
  },
  {
    href: "/shops",
    emoji: "🏪",
    title: "ซื้อ",
    desc: "เชื่อมต่อกับร้านต้นพันธุ์และผู้ผลิตที่เราตรวจสอบแล้ว",
    cta: "ดูร้านค้า →",
    tone: "light" as const,
  },
  {
    href: "/guides",
    emoji: "📖",
    title: "คู่มือ",
    desc: "ขั้นตอนปลูก ดูแล และให้คะแนนความแก่ อ้างอิงงานวิชาการ",
    cta: "อ่านคู่มือ →",
    tone: "light" as const,
  },
];

export default function HomePage() {
  const varieties = getAllVarieties();
  const articles = getAllArticles();
  const stats = getSiteStats();

  const topVarietySlugs = ["hass", "pinkerton", "booth-8", "cuba"];
  const topVarieties = topVarietySlugs
    .map((slug) => varieties.find((v) => v.slug === slug))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));
  const topArticles = articles.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto grid max-w-content items-center gap-12 px-4 pb-6 pt-14 sm:px-6 sm:pt-16 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-avocado-pale px-3.5 py-1.5 text-[13px] font-semibold text-avocado">
            ศูนย์รวมความรู้อโวคาโด้ของไทย
          </span>
          <h1 className="text-pretty font-display text-[36px] font-bold leading-[1.14] tracking-tight text-avocado-dark sm:text-5xl">
            ฐานของความรู้
            <br />
            อโวคาโด้ทั้งหมด
          </h1>
          <p className="max-w-[46ch] text-lg leading-relaxed text-ink-muted">
            ตั้งแต่การเลือกสายพันธุ์ การปลูก ไปจนถึงร้านค้าที่เราตรวจสอบแล้ว — คู่มือของผู้ปลูกอโวคาโด้ไทย
            รวบรวมไว้ในที่เดียว
          </p>
          <div className="flex flex-wrap gap-3 pt-1.5">
            <Link
              href="/varieties"
              className="rounded-xl bg-avocado px-7 py-4 text-base font-semibold text-white hover:bg-avocado-dark"
            >
              ค้นหาสายพันธุ์
            </Link>
            <Link
              href="/guides"
              className="rounded-xl border border-[#D8D4C6] bg-white px-7 py-4 text-base font-semibold text-avocado hover:border-avocado"
            >
              อ่านคู่มือปลูก →
            </Link>
          </div>
          <div className="mt-2 flex w-full flex-wrap gap-10 border-t border-border pt-6">
            <Stat value={stats.varietyCount} label="สายพันธุ์ในฐานข้อมูล" />
            <Stat value={stats.articleCount} label="บทความความรู้" />
            <Stat value={stats.guideCount} label="คู่มือปฏิบัติ" />
            <Stat value={stats.shopCount} label="ร้านค้าที่รับรอง" />
          </div>
        </div>

        <div className="relative">
          <div className="placeholder-tile flex aspect-[4/4.4] items-center justify-center rounded-3xl border border-[#D8DFD2]">
            <span className="rounded-lg bg-cream/85 px-3.5 py-2 text-center font-mono text-[13px] text-[#4E6B4A]">
              hero photo — สวนอโวคาโด้ / ผลบนต้น
            </span>
          </div>
          <Link
            href="/trace"
            className="absolute -left-4 bottom-6 flex max-w-[270px] items-center gap-3 rounded-2xl border border-border bg-white p-4 text-ink shadow-[0_8px_24px_rgba(31,68,32,0.10)] hover:border-avocado-light"
          >
            <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-avocado-pale text-lg text-avocado">
              ✓
            </span>
            <span className="text-sm font-medium leading-snug text-ink">
              ต้นพันธุ์ทุกต้นมีรหัสตรวจสอบได้
              <br />
              <span className="font-bold text-avocado">ตรวจรหัสต้น →</span>
            </span>
          </Link>
        </div>
      </section>

      {/* Quick nav cards */}
      <section className="mx-auto max-w-content px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`flex min-h-[210px] flex-col gap-3 rounded-2xl p-7 ${
                card.tone === "primary"
                  ? "bg-avocado text-white hover:bg-avocado-dark"
                  : "border border-border bg-white text-ink hover:border-avocado-light"
              }`}
            >
              <span className="text-[26px]">{card.emoji}</span>
              <span
                className={`font-display text-xl font-semibold ${
                  card.tone === "primary" ? "text-white" : "text-avocado-dark"
                }`}
              >
                {card.title}
              </span>
              <span className={`text-[15px] leading-relaxed ${card.tone === "primary" ? "text-avocado-paler" : "text-ink-muted"}`}>
                {card.desc}
              </span>
              <span
                className={`mt-auto text-sm font-semibold ${
                  card.tone === "primary" ? "text-[#A8D49C]" : "text-avocado"
                }`}
              >
                {card.cta}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular varieties */}
      <section className="border-y border-border bg-beige">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[13px] uppercase tracking-wider text-ink-faint">
                variety guide
              </span>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-avocado-dark">
                สายพันธุ์ยอดนิยม
              </h2>
            </div>
            <Link href="/varieties" className="text-[15px] font-semibold text-avocado">
              ดูสายพันธุ์ทั้งหมด →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topVarieties.map((v) => (
              <VarietyCard key={v.slug} variety={v} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest articles */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[13px] uppercase tracking-wider text-ink-faint">knowledge</span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-avocado-dark">
              บทความล่าสุด
            </h2>
          </div>
          <Link href="/articles" className="text-[15px] font-semibold text-avocado">
            อ่านทั้งหมด →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {topArticles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-content px-4 pb-20 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-avocado p-8 sm:p-14 lg:grid-cols-2">
          <div className="flex flex-col gap-3.5">
            <h2 className="text-pretty font-display text-3xl font-semibold text-white">
              เริ่มปลูกอโวคาโด้ต้นแรกของคุณ
            </h2>
            <p className="max-w-[48ch] text-[17px] leading-relaxed text-avocado-paler">
              เลือกสายพันธุ์ที่เหมาะกับพื้นที่ของคุณ แล้วไปต่อที่ร้านค้าที่เราตรวจสอบแล้ว
            </p>
          </div>
          <div className="flex flex-wrap justify-start gap-3 lg:justify-end">
            <Link
              href="/varieties"
              className="rounded-xl bg-pit px-7 py-4 text-base font-bold text-pit-dark hover:bg-pit-light"
            >
              เริ่มต้น
            </Link>
            <Link
              href="/guides"
              className="rounded-xl border border-white/35 px-7 py-4 text-base font-semibold text-white hover:border-white"
            >
              อ่านคู่มือปลูก
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[26px] font-bold text-avocado">{value}</span>
      <span className="text-sm text-ink-faint">{label}</span>
    </div>
  );
}
