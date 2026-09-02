"use client";

import { useState } from "react";
import Link from "next/link";
import type { TraceLot, Variety } from "@/lib/types";

function ageLabel(graftDateIso: string): string {
  const graft = new Date(graftDateIso);
  const now = new Date();
  let months = (now.getFullYear() - graft.getFullYear()) * 12 + (now.getMonth() - graft.getMonth());
  if (now.getDate() < graft.getDate()) months -= 1;
  months = Math.max(months, 0);
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  if (years === 0) return `${remMonths} เดือน`;
  if (remMonths === 0) return `${years} ปี`;
  return `${years} ปี ${remMonths} เดือน`;
}

function formatThaiDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("th-TH-u-ca-buddhist", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function TraceLookupClient({
  lots,
  varietiesBySlug,
}: {
  lots: TraceLot[];
  varietiesBySlug: Record<string, Variety>;
}) {
  const [code, setCode] = useState("");
  const [lot, setLot] = useState<TraceLot | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = lots.find((l) => l.code.toUpperCase() === code.trim().toUpperCase());
    if (found) {
      setLot(found);
      setError(null);
    } else {
      setLot(null);
      setError(`ไม่พบรหัส "${code.trim()}" — ตรวจสอบรหัสบนป้ายต้นอีกครั้ง หรือลองรหัสตัวอย่าง: ${lots[0]?.code}`);
    }
  }

  const variety = lot ? varietiesBySlug[lot.varietySlug] : null;

  return (
    <div className="flex flex-col gap-14">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[13px] uppercase tracking-wider text-ink-faint">tree traceability</span>
          <h1 className="text-pretty font-display text-4xl font-bold leading-tight tracking-tight text-avocado-dark sm:text-[46px]">
            ตรวจประวัติต้นอโวคาโด้
          </h1>
          <p className="max-w-[48ch] text-[17px] leading-relaxed text-ink-soft">
            ต้นที่รับรองโดย Avocado Geek ทุกต้นมีรหัสของตัวเอง — รหัสหนึ่งใช้ร่วมกันในต้นที่เสียบยอดรอบเดียวกัน
            กรอกรหัสด้านล่างเพื่อดูวันเสียบยอด อายุต้น ต้นตอ และกิ่งพันธุ์ที่ใช้
          </p>
          <form onSubmit={handleSubmit} className="flex max-w-[460px] flex-col gap-3">
            <div className="flex flex-wrap gap-2.5">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="เช่น AVO-2503-014"
                className="flex-1 rounded-xl border border-[#D8D4C6] px-4 py-4 font-mono text-base tracking-wide text-ink outline-none focus:border-avocado"
                style={{ minWidth: 220 }}
              />
              <button
                type="submit"
                className="rounded-xl bg-avocado px-6 py-4 text-base font-semibold text-white hover:bg-avocado-dark"
              >
                ตรวจสอบ
              </button>
            </div>
            {error && (
              <span className="rounded-[10px] border border-[#F0CFC6] bg-[#FBEAE5] px-3.5 py-2.5 text-sm text-[#A8452A]">
                {error}
              </span>
            )}
            <span className="text-xs text-ink-fainter">
              ลองตัวอย่าง: {lots.map((l) => l.code).join(" · ")}
            </span>
          </form>
        </div>

        <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-border bg-beige p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-[130px] w-[130px] items-center justify-center rounded-2xl border-8 border-white bg-white text-5xl shadow-[0_6px_18px_rgba(31,68,32,0.12)]">
              ▦
            </div>
            <span className="max-w-[34ch] text-[15px] leading-relaxed text-ink-soft">
              ป้ายติดต้นพิมพ์ QR ของรหัสต้นไว้ — สแกนแล้วเข้าหน้านี้พร้อมรหัสกรอกไว้ให้อัตโนมัติ
            </span>
          </div>
        </div>
      </div>

      {lot && variety && (
        <div className="flex flex-col gap-7">
          <div className="grid grid-cols-1 items-center gap-7 rounded-3xl bg-avocado p-8 sm:p-10 lg:grid-cols-3">
            <div className="flex flex-col gap-2.5 lg:col-span-1">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold text-white">
                ✓ ต้นนี้ได้รับการรับรอง
              </span>
              <span className="font-mono text-2xl font-bold tracking-wide text-white sm:text-3xl">{lot.code}</span>
              <span className="text-base text-avocado-paler">
                {variety.name} · {lot.status}
              </span>
              <span className="text-[13px] leading-relaxed text-[#A8D49C]">
                รหัสนี้เป็นรหัสของต้นคุณ — ออกให้กับรอบเสียบยอดที่ต้นนี้อยู่ ทุกต้นในรอบเดียวกันใช้กิ่งพันธุ์
                ต้นตอ และวันเสียบยอดชุดเดียวกัน
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-[#A8D49C]">อายุนับจากวันเสียบยอด</span>
              <span className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                {ageLabel(lot.graftDate)}
              </span>
              <span className="text-sm text-avocado-paler">เสียบยอด {formatThaiDate(lot.graftDate)}</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <Link
                href={`/varieties/${variety.slug}`}
                className="rounded-[11px] bg-pit px-5 py-3.5 text-center text-sm font-bold text-pit-dark hover:bg-pit-light"
              >
                ดูข้อมูลสายพันธุ์
              </Link>
              <Link
                href="/shops"
                className="rounded-[11px] border border-white/35 px-5 py-3.5 text-center text-sm font-semibold text-white hover:border-white"
              >
                หาร้านที่รับรอง
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {lot.stats.map((s) => (
              <div key={s.k} className="flex flex-col gap-1.5 bg-white p-5">
                <span className="text-xs text-ink-fainter">{s.k}</span>
                <span className="text-pretty text-[15px] font-semibold leading-snug text-avocado-dark">{s.v}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]">
            <div className="flex min-w-0 flex-col gap-4">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-avocado-dark">ไทม์ไลน์ของต้นนี้</h2>
              <div className="flex flex-col">
                {lot.events.map((e) => (
                  <div key={`${e.d}-${e.h}`} className="grid grid-cols-[110px_1fr] gap-4 pb-6">
                    <span className="pt-0.5 font-mono text-[13px] text-ink-faint">{formatThaiDate(e.d)}</span>
                    <div className="relative flex flex-col gap-1.5 border-l border-border pl-5">
                      <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-cream bg-avocado" />
                      <span className="font-display text-base font-semibold text-avocado-dark">{e.h}</span>
                      <p className="text-[15px] leading-relaxed text-ink-soft">{e.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 rounded-2xl border border-border bg-white p-5">
                <span className="font-display text-base font-semibold text-avocado-dark">การรับประกัน</span>
                <span className="text-[15px] leading-relaxed text-ink-soft">{lot.warranty}</span>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl border border-border bg-white p-5">
                <span className="font-display text-base font-semibold text-avocado-dark">ที่มาของต้น</span>
                <span className="text-[15px] text-ink-soft">ต้นตอ: {lot.rootstock}</span>
                <span className="text-[15px] text-ink-soft">กิ่งพันธุ์: {lot.scion}</span>
                <span className="text-sm text-ink-fainter">วิธีขยายพันธุ์: {lot.method}</span>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl border border-border bg-beige p-5">
                <span className="font-display text-base font-semibold text-avocado-dark">พบข้อมูลไม่ตรง?</span>
                <span className="text-sm leading-relaxed text-ink-soft">
                  ถ้าป้ายต้นระบุไม่ตรงกับข้อมูลนี้ แจ้งทีมงานได้ทันที เราจะตรวจสอบกับร้านต้นทาง
                </span>
                <Link href="/contact" className="text-sm font-semibold text-avocado">
                  แจ้งทีมงาน →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-5">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-avocado-dark">รหัสต้นต่อยอดไปได้อีก</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            {
              n: "01",
              h: "สมุดบันทึกต้นของฉัน",
              p: "ผูกรหัสต้นกับต้นที่ปลูกจริง บันทึกวันปลูก การให้ปุ๋ย และปัญหาที่เจอ เพื่อดูย้อนหลังในปีถัดไป",
            },
            {
              n: "02",
              h: "เตือนงานตามอายุต้น",
              p: "ระบบรู้อายุต้นจากวันเสียบยอด จึงเตือนได้ว่าถึงรอบใส่ปุ๋ย ตัดแต่งกิ่ง หรือคาดว่าจะเริ่มติดผลเมื่อไร",
            },
            {
              n: "03",
              h: "ใบรับรองสำหรับขายผล",
              p: "ผู้ปลูกอ้างรหัสของต้นเพื่อยืนยันสายพันธุ์ตอนขายผล เป็นหลักฐานที่ลูกค้าปลายทางตรวจได้เอง",
            },
          ].map((card) => (
            <div key={card.n} className="flex flex-col gap-2 rounded-2xl border border-border bg-white p-6">
              <span className="font-mono text-[13px] text-ink-faint">{card.n}</span>
              <span className="font-display text-lg font-semibold text-avocado-dark">{card.h}</span>
              <span className="text-[15px] leading-relaxed text-ink-muted">{card.p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
