import Link from "next/link";
import type { Article } from "@/lib/types";
import { formatThaiDate } from "@/lib/date";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col gap-3.5 text-ink hover:text-avocado"
    >
      <div className="placeholder-tile-soft flex aspect-[16/10] items-center justify-center rounded-2xl border border-border">
        <span className="font-mono text-[11px] text-ink-faint">article image</span>
      </div>
      <div className="flex items-center gap-2.5 text-[13px] text-ink-faint">
        <span className="rounded-full bg-avocado-pale px-2.5 py-1 font-semibold text-avocado">
          {article.category}
        </span>
        {article.readingMinutes && <span>อ่าน {article.readingMinutes} นาที</span>}
      </div>
      <span className="text-pretty font-display text-lg font-semibold leading-snug text-avocado-dark group-hover:text-avocado">
        {article.title}
      </span>
      <span className="line-clamp-2 text-[15px] leading-relaxed text-ink-muted">{article.excerpt}</span>
      <span className="text-[13px] text-ink-fainter">
        {article.author} · {formatThaiDate(article.date)}
      </span>
    </Link>
  );
}
