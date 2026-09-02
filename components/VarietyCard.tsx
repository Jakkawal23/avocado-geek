import Link from "next/link";
import type { Variety } from "@/lib/types";

export default function VarietyCard({ variety }: { variety: Variety }) {
  return (
    <Link
      href={`/varieties/${variety.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white text-ink hover:border-avocado-light hover:text-ink"
    >
      <div className="placeholder-tile flex aspect-[4/3] items-center justify-center">
        <span className="font-mono text-[11px] text-[#4E6B4A]">variety photo</span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {variety.sku && (
          <span className="font-mono text-[11px] font-bold tracking-wide text-ink-fainter">
            {variety.sku}
          </span>
        )}
        <span className="font-display text-lg font-semibold text-avocado-dark group-hover:text-avocado">
          {variety.name}
        </span>
        {variety.scientificName && (
          <span className="font-mono text-xs italic text-ink-fainter">{variety.scientificName}</span>
        )}
        <span className="line-clamp-3 text-sm leading-relaxed text-ink-muted">
          {variety.characteristics}
        </span>
        <div className="mt-auto flex items-center justify-between pt-3.5 text-[13px] text-ink-faint">
          <span>{variety.difficultyStars ?? "—"}</span>
          <span>{variety.best_season}</span>
        </div>
      </div>
    </Link>
  );
}
