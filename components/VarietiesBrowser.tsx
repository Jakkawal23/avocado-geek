"use client";

import { useMemo, useState } from "react";
import type { Variety } from "@/lib/types";
import VarietyCard from "./VarietyCard";

const DIFFICULTIES = ["ง่าย", "ปานกลาง", "ยาก"] as const;
const SEASONS = ["มิ.ย.–ส.ค.", "ก.ย.–พ.ย.", "ธ.ค.–ก.พ."] as const;
const SIZES: { value: string; label: string }[] = [
  { value: "เล็ก", label: "เล็ก (<200 ก.)" },
  { value: "กลาง", label: "กลาง (200–350 ก.)" },
  { value: "ใหญ่", label: "ใหญ่ (>350 ก.)" },
];
const HIGHLIGHTS = ["ราคาสูง", "รสชาติเข้ม", "ทนโรค", "ยอดนิยม"] as const;

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function CheckboxGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[13px] font-bold tracking-wide text-avocado-dark">{title}</span>
      {options.map((opt) => (
        <label key={opt.value} className="flex cursor-pointer items-center gap-2.5 text-[15px] text-ink-soft">
          <input
            type="checkbox"
            checked={selected.includes(opt.value)}
            onChange={() => onToggle(opt.value)}
            className="h-[17px] w-[17px] shrink-0 rounded border-[#C9C5B6] accent-avocado"
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

export default function VarietiesBrowser({ varieties }: { varieties: Variety[] }) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [season, setSeason] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [highlight, setHighlight] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return varieties.filter((v) => {
      if (difficulty.length > 0 && !difficulty.includes(v.difficultyLabel ?? "")) return false;
      if (season.length > 0 && !season.some((s) => v.seasonBuckets?.includes(s))) return false;
      if (size.length > 0 && !size.includes(v.fruitSize ?? "")) return false;
      if (highlight.length > 0 && !highlight.some((h) => v.highlights?.includes(h))) return false;
      if (!q) return true;
      const haystack = [v.name, v.scientificName, v.characteristics, v.origin].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [varieties, query, difficulty, season, size, highlight]);

  const activeFilterCount = difficulty.length + season.length + size.length + highlight.length;
  const hasActiveFilters = query !== "" || activeFilterCount > 0;

  function clearAll() {
    setQuery("");
    setDifficulty([]);
    setSeason([]);
    setSize([]);
    setHighlight([]);
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        type="button"
        onClick={() => setFiltersOpen((v) => !v)}
        className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3.5 text-[15px] font-semibold text-ink-soft lg:hidden"
      >
        <span className="flex items-center gap-2">
          ตัวกรอง
          {activeFilterCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-avocado px-1 text-xs font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </span>
        <span className="text-ink-fainter">{filtersOpen ? "ซ่อน ▲" : "แสดง ▼"}</span>
      </button>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[260px_1fr]">
        <aside
          className={`${filtersOpen ? "flex" : "hidden"} flex-col gap-6 rounded-2xl border border-border bg-white p-6 lg:flex`}
        >
          <div className="flex items-center gap-2.5 rounded-[10px] border border-border px-3.5 py-2.5">
            <span className="text-ink-fainter">⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ชื่อสายพันธุ์"
              className="w-full border-none bg-transparent text-[15px] text-ink outline-none"
            />
          </div>

          <CheckboxGroup
            title="ระดับความยาก"
            options={DIFFICULTIES.map((d) => ({ value: d, label: d }))}
            selected={difficulty}
            onToggle={(v) => setDifficulty((prev) => toggle(prev, v))}
          />
          <CheckboxGroup
            title="ฤดูเก็บเกี่ยว"
            options={SEASONS.map((s) => ({ value: s, label: s }))}
            selected={season}
            onToggle={(v) => setSeason((prev) => toggle(prev, v))}
          />
          <CheckboxGroup title="ขนาดผล" options={SIZES} selected={size} onToggle={(v) => setSize((prev) => toggle(prev, v))} />
          <CheckboxGroup
            title="ลักษณะเด่น"
            options={HIGHLIGHTS.map((h) => ({ value: h, label: h }))}
            selected={highlight}
            onToggle={(v) => setHighlight((prev) => toggle(prev, v))}
          />

          <button
            type="button"
            onClick={clearAll}
            disabled={!hasActiveFilters}
            className="rounded-[10px] bg-beige py-2.5 text-sm font-semibold text-ink-soft hover:bg-avocado-pale hover:text-avocado disabled:cursor-not-allowed disabled:opacity-50"
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
    </div>
  );
}
