"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Variety } from "@/lib/types";
import {
  EMPTY_ANSWERS,
  ELEVATIONS,
  EXPERIENCES,
  GOALS,
  REGIONS,
  WATERING_HABITS,
  countAnswered,
  matchVarieties,
  type MatchAnswers,
} from "@/lib/matcher";

function ChipGroup<T extends string>({
  options,
  value,
  onSelect,
}: {
  options: { value: T; label: string; note?: string }[];
  value: T | null;
  onSelect: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-colors ${
              active
                ? "border-avocado bg-avocado text-white"
                : "border-border bg-white text-ink-soft hover:border-avocado-light hover:text-avocado"
            }`}
          >
            <span className="block">{opt.label}</span>
            {opt.note && (
              <span className={`block text-xs ${active ? "text-avocado-paler" : "text-ink-fainter"}`}>
                {opt.note}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function MatchQuizClient({ varieties }: { varieties: Variety[] }) {
  const [answers, setAnswers] = useState<MatchAnswers>(EMPTY_ANSWERS);

  const results = useMemo(() => matchVarieties(varieties, answers), [varieties, answers]);
  const answered = countAnswered(answers);

  function set<K extends keyof MatchAnswers>(key: K, value: MatchAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: prev[key] === value ? null : value }));
  }

  return (
    <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[minmax(280px,1fr)_2fr]">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-beige px-4 py-3.5">
          <span className="text-sm text-ink-soft">
            ตอบแล้ว <span className="font-bold text-avocado">{answered}</span> / 5 ข้อ
          </span>
          <button
            type="button"
            onClick={() => setAnswers(EMPTY_ANSWERS)}
            className="text-sm font-semibold text-avocado hover:text-avocado-dark"
          >
            ล้างคำตอบ
          </button>
        </div>

        <Question label="พื้นที่ปลูกอยู่ภาคไหน">
          <ChipGroup options={REGIONS} value={answers.region} onSelect={(v) => set("region", v)} />
        </Question>

        <Question label="พื้นที่ของคุณเป็นที่ราบหรือที่สูง">
          <ChipGroup options={ELEVATIONS} value={answers.elevation} onSelect={(v) => set("elevation", v)} />
        </Question>

        <Question label="ประสบการณ์ปลูกไม้ผล">
          <ChipGroup options={EXPERIENCES} value={answers.experience} onSelect={(v) => set("experience", v)} />
        </Question>

        <Question label="ให้น้ำได้สม่ำเสมอแค่ไหน">
          <ChipGroup options={WATERING_HABITS} value={answers.watering} onSelect={(v) => set("watering", v)} />
        </Question>

        <Question label="เป้าหมายหลักในการปลูก">
          <ChipGroup options={GOALS} value={answers.goal} onSelect={(v) => set("goal", v)} />
        </Question>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold text-avocado-dark">อันดับสายพันธุ์ที่เหมาะกับคุณ</h2>
          <span className="text-[13px] text-ink-fainter">เรียงตามคะแนนความเหมาะสม</span>
        </div>
        {answered === 0 && (
          <p className="rounded-xl border border-border bg-beige px-5 py-4 text-[15px] text-ink-faint">
            ตอบคำถามด้านซ้ายเพื่อดูอันดับที่แม่นขึ้น — ไม่ตอบเลยก็ยังเห็นสายพันธุ์ทั้งหมดแบบยังไม่จัดอันดับ
          </p>
        )}
        <div className="flex flex-col gap-4">
          {results.map((r) => (
            <div key={r.variety.slug} className="flex flex-col gap-3.5 rounded-2xl border border-border bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 flex-col gap-1">
                  {r.variety.sku && (
                    <span className="font-mono text-[11px] font-bold tracking-wide text-ink-fainter">
                      {r.variety.sku}
                    </span>
                  )}
                  <Link
                    href={`/varieties/${r.variety.slug}`}
                    className="font-display text-lg font-semibold text-avocado-dark hover:text-avocado"
                  >
                    {r.variety.name}
                  </Link>
                  <span className="text-sm text-ink-faint">
                    เก็บเกี่ยว {r.variety.best_season} · {r.variety.characteristics}
                  </span>
                </div>
                {answered > 0 && (
                  <div className="flex shrink-0 flex-col items-end gap-0.5">
                    <span className="font-mono text-2xl font-bold" style={{ color: r.tone }}>
                      {r.score}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: r.tone }}>
                      {r.verdict}
                    </span>
                  </div>
                )}
              </div>
              {answered > 0 && (
                <div className="h-[7px] overflow-hidden rounded-full bg-[#F0EEE5]">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${r.score}%`, backgroundColor: r.tone }}
                  />
                </div>
              )}
              {(r.pros.length > 0 || r.cons.length > 0) && (
                <div className="flex flex-col gap-1.5">
                  {r.pros.map((p) => (
                    <div key={p} className="flex gap-2 text-sm text-[#3C3C36]">
                      <span className="text-avocado">✓</span>
                      <span>{p}</span>
                    </div>
                  ))}
                  {r.cons.map((c) => (
                    <div key={c} className="flex gap-2 text-sm text-ink-faint">
                      <span className="text-pit">!</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-3.5 pt-1">
                <Link href={`/varieties/${r.variety.slug}`} className="text-sm font-semibold text-avocado">
                  ดูข้อมูลสายพันธุ์ →
                </Link>
                <Link href="/shops" className="text-sm font-semibold text-ink-faint hover:text-avocado">
                  หาร้านที่ขาย
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Question({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[15px] font-bold text-avocado-dark">{label}</span>
      {children}
    </div>
  );
}
