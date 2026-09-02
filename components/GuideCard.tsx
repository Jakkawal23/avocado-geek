import Link from "next/link";
import type { Guide } from "@/lib/types";

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-6 text-ink hover:border-avocado-light hover:text-ink"
    >
      <div className="flex flex-wrap items-center gap-2 text-[13px]">
        <span className="rounded-full bg-avocado-pale px-2.5 py-1 font-semibold text-avocado">{guide.type}</span>
        <span className="text-ink-faint">ความยาก: {guide.difficulty}</span>
      </div>
      <span className="font-display text-lg font-semibold leading-snug text-avocado-dark">
        {guide.title}
      </span>
      <span className="line-clamp-3 text-[15px] leading-relaxed text-ink-muted">{guide.content}</span>
      <div className="mt-auto flex items-center justify-between pt-2 text-[13px] text-ink-faint">
        <span>⏱ {guide.duration}</span>
        <span className="font-semibold text-avocado">{guide.steps?.length ?? 0} ขั้นตอน →</span>
      </div>
    </Link>
  );
}
