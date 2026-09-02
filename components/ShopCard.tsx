import Link from "next/link";
import type { Shop } from "@/lib/types";

function initials(name: string): string {
  const clean = name.replace(/[^\p{L}\p{N} ]/gu, "").trim();
  const parts = clean.split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

export default function ShopCard({ shop }: { shop: Shop }) {
  return (
    <Link
      href={`/shops/${shop.slug}`}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-6 text-ink hover:border-avocado-light hover:text-ink"
    >
      <div className="flex items-center gap-3.5">
        <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-avocado-pale font-display text-lg font-bold text-avocado">
          {initials(shop.name)}
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="font-display text-lg font-semibold text-avocado-dark">{shop.name}</span>
          <span className="text-[13px] text-ink-faint">{shop.location}</span>
        </div>
      </div>
      <span className="inline-flex w-fit items-center rounded-full bg-[#FDF3E0] px-2.5 py-1 text-[11px] font-bold text-[#8A5B08]">
        ✓ CERTIFIED BY AVOCADO GEEK
      </span>
      <span className="text-[15px] leading-relaxed text-ink-muted">{shop.description}</span>
      {shop.tags && shop.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {shop.tags.map((t) => (
            <span key={t} className="rounded-lg bg-beige px-2.5 py-1 text-xs font-medium text-ink-soft">
              {t}
            </span>
          ))}
        </div>
      )}
      <div className="mt-auto flex items-center justify-between border-t border-[#F0EEE5] pt-3">
        <span className="text-[13px] text-ink-faint">{shop.varieties_available?.length ?? 0} สายพันธุ์</span>
        <span className="text-sm font-semibold text-avocado">ดูโปรไฟล์ →</span>
      </div>
    </Link>
  );
}

export { initials };
