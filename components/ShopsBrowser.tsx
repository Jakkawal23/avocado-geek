"use client";

import { useMemo, useState } from "react";
import type { Shop } from "@/lib/types";
import ShopCard from "./ShopCard";

export default function ShopsBrowser({ shops }: { shops: Shop[] }) {
  const [query, setQuery] = useState("");

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
        <span className="text-sm text-ink-faint">แสดง {filtered.length} ร้าน</span>
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-border bg-beige px-5 py-4 text-[15px] text-ink-faint">
            ไม่พบร้านค้าที่ตรงกับคำค้นหานี้
          </p>
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
