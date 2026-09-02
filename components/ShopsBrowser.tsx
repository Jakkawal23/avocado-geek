"use client";

import { useMemo, useState } from "react";
import type { Shop } from "@/lib/types";
import ShopCard from "./ShopCard";

const PRODUCT_TYPES = ["ผลสด", "ต้นพันธุ์"] as const;
const SALE_CHANNELS = ["ออนไลน์", "หน้าสวน/หน้าร้าน"] as const;

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
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[13px] font-bold tracking-wide text-avocado-dark">{title}</span>
      {options.map((opt) => (
        <label key={opt} className="flex cursor-pointer items-center gap-2.5 text-[15px] text-ink-soft">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
            className="h-[17px] w-[17px] shrink-0 rounded border-[#C9C5B6] accent-avocado"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

export default function ShopsBrowser({ shops }: { shops: Shop[] }) {
  const [query, setQuery] = useState("");
  const [productType, setProductType] = useState<string[]>([]);
  const [channel, setChannel] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return shops.filter((s) => {
      if (productType.length > 0 && !productType.some((p) => s.tags?.includes(p))) return false;
      if (channel.length > 0 && !channel.some((c) => s.saleChannels?.includes(c))) return false;
      if (!q) return true;
      return [s.name, s.location, s.description, ...(s.tags ?? [])].join(" ").toLowerCase().includes(q);
    });
  }, [shops, query, productType, channel]);

  const hasActiveFilters = query !== "" || productType.length > 0 || channel.length > 0;

  function clearAll() {
    setQuery("");
    setProductType([]);
    setChannel([]);
  }

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="flex flex-col gap-6 rounded-2xl border border-border bg-white p-6">
        <div className="flex items-center gap-2.5 rounded-[10px] border border-border px-3.5 py-2.5">
          <span className="text-ink-fainter">⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ชื่อร้าน / จังหวัด"
            className="w-full border-none bg-transparent text-[15px] text-ink outline-none"
          />
        </div>

        <CheckboxGroup
          title="ประเภทสินค้า"
          options={PRODUCT_TYPES}
          selected={productType}
          onToggle={(v) => setProductType((prev) => toggle(prev, v))}
        />
        <CheckboxGroup
          title="ช่องทางการขาย"
          options={SALE_CHANNELS}
          selected={channel}
          onToggle={(v) => setChannel((prev) => toggle(prev, v))}
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
        <span className="text-sm text-ink-faint">แสดง {filtered.length} ร้าน</span>
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-border bg-beige px-5 py-4 text-[15px] text-ink-faint">
            ไม่พบร้านค้าที่ตรงกับตัวกรอง
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
