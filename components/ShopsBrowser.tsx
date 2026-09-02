"use client";

import { useMemo, useState } from "react";
import type { Shop } from "@/lib/types";
import ShopCard, { initials } from "./ShopCard";

export default function ShopsBrowser({ shops }: { shops: Shop[] }) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"list" | "map">("list");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return shops;
    return shops.filter((s) =>
      [s.name, s.location, s.description, ...(s.tags ?? [])].join(" ").toLowerCase().includes(q)
    );
  }, [shops, query]);

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-6">
        <div className="flex items-center gap-2.5 rounded-[10px] border border-border px-3.5 py-2.5">
          <span className="text-ink-fainter">⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ชื่อร้าน / จังหวัด"
            className="w-full border-none bg-transparent text-[15px] text-ink outline-none"
          />
        </div>
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="placeholder-tile flex aspect-square items-center justify-center text-center">
            <span className="font-mono text-[11px] text-[#4E6B4A]">
              map view
              <br />
              (optional)
            </span>
          </div>
        </div>
      </aside>

      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-ink-faint">แสดง {filtered.length} ร้าน</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`rounded-[10px] px-4 py-2.5 text-sm font-semibold ${
                view === "list" ? "bg-avocado text-white" : "border border-border bg-white text-ink-soft hover:border-avocado-light"
              }`}
            >
              รายการ
            </button>
            <button
              type="button"
              onClick={() => setView("map")}
              className={`rounded-[10px] px-4 py-2.5 text-sm font-medium ${
                view === "map" ? "bg-avocado text-white" : "border border-border bg-white text-ink-soft hover:border-avocado-light"
              }`}
            >
              แผนที่
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-xl border border-border bg-beige px-5 py-4 text-[15px] text-ink-faint">
            ไม่พบร้านค้าที่ตรงกับคำค้นหานี้
          </p>
        ) : view === "map" ? (
          <div className="flex flex-col gap-5 rounded-2xl border border-border bg-beige p-6">
            <div className="placeholder-tile flex aspect-[16/9] items-center justify-center rounded-2xl border border-[#D8DFD2]">
              <span className="font-mono text-xs text-[#4E6B4A]">map view — {filtered.length} ร้านค้า (optional)</span>
            </div>
            <div className="flex flex-col gap-2">
              {filtered.map((s) => (
                <div key={s.slug} className="flex items-center gap-3 rounded-xl bg-white p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-avocado-pale text-xs font-bold text-avocado">
                    {initials(s.name)}
                  </span>
                  <span className="text-sm font-medium text-ink">{s.name}</span>
                  <span className="ml-auto text-xs text-ink-faint">{s.location}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {filtered.map((s) => (
              <ShopCard key={s.slug} shop={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
