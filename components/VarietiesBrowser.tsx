"use client";

import { useMemo, useState } from "react";
import type { Variety } from "@/lib/types";
import VarietyCard from "./VarietyCard";

function seasonBucket(season: string): string {
  // best_season strings look like "ส.ค.–พ.ย." — bucket by first month mentioned.
  if (/(มิ\.ย|ก\.ค|ส\.ค)/.test(season)) return "กลางปี (มิ.ย.–ส.ค.)";
  if (/(ก\.ย|ต\.ค|พ\.ย)/.test(season)) return "ปลายปี (ก.ย.–พ.ย.)";
  return "อื่น ๆ / แปรผัน";
}

export default function VarietiesBrowser({ varieties }: { varieties: Variety[] }) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [season, setSeason] = useState<string | null>(null);

  const seasons = useMemo(
    () => Array.from(new Set(varieties.map((v) => seasonBucket(v.best_season)))),
    [varieties]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return varieties.filter((v) => {
      if (difficulty !== null && (v.difficultyStars ?? "").split("★").length - 1 !== difficulty) return false;
      if (season && seasonBucket(v.best_season) !== season) return false;
      if (!q) return true;
      const haystack = [v.name, v.scientificName, v.characteristics, v.origin].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [varieties, query, difficulty, season]);

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-6">
        <div className="flex items-center gap-2.5 rounded-[10px] border border-border px-3.5 py-2.5">
          <span className="text-ink-fainter">⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ชื่อสายพันธุ์"
            className="w-full border-none bg-transparent text-[15px] text-ink outline-none"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-bold tracking-wide text-avocado-dark">ความยาก</span>
          {[1, 2, 3, 4].map((n) => (
            <label key={n} className="flex cursor-pointer items-center gap-2 text-[15px] text-ink-soft">
              <input
                type="radio"
                name="difficulty"
                checked={difficulty === n}
                onChange={() => setDifficulty(difficulty === n ? null : n)}
              />
              {"★".repeat(n)}
              {"☆".repeat(4 - n)}
            </label>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-bold tracking-wide text-avocado-dark">ฤดูเก็บเกี่ยว</span>
          {seasons.map((s) => (
            <label key={s} className="flex cursor-pointer items-center gap-2 text-[15px] text-ink-soft">
              <input
                type="radio"
                name="season"
                checked={season === s}
                onChange={() => setSeason(season === s ? null : s)}
              />
              {s}
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            setQuery("");
            setDifficulty(null);
            setSeason(null);
          }}
          className="rounded-[10px] bg-beige py-2.5 text-sm font-semibold text-ink-soft hover:bg-avocado-pale hover:text-avocado"
        >
          ล้างตัวกรอง
        </button>
      </aside>

      <div className="flex flex-col gap-5">
        <span className="text-sm text-ink-faint">แสดง {filtered.length} สายพันธุ์</span>
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-border bg-beige px-5 py-4 text-[15px] text-ink-faint">
            ไม่พบสายพันธุ์ที่ตรงกับตัวกรอง ลองล้างตัวกรองดูนะครับ
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((v) => (
              <VarietyCard key={v.slug} variety={v} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
