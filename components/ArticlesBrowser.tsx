"use client";

import { useMemo, useState } from "react";
import type { Article } from "@/lib/types";
import ArticleCard from "./ArticleCard";

export default function ArticlesBrowser({
  articles,
  tags,
}: {
  articles: Article[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (activeTag && a.category !== activeTag && !a.tags?.includes(activeTag)) return false;
      if (!q) return true;
      const haystack = [a.title, a.excerpt, a.category, ...(a.tags ?? [])].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [articles, query, activeTag]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-border bg-white px-4 py-3.5 sm:min-w-[280px]">
          <span className="text-ink-fainter">⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาบทความ เช่น รากเน่า, ทาบกิ่ง, ปุ๋ย"
            className="w-full border-none bg-transparent text-[15px] text-ink outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full border px-4 py-2 text-sm font-medium ${
              activeTag === null
                ? "border-avocado bg-avocado text-white"
                : "border-border bg-white text-ink-soft hover:border-avocado hover:text-avocado"
            }`}
          >
            ทั้งหมด
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${
                activeTag === tag
                  ? "border-avocado bg-avocado text-white"
                  : "border-border bg-white text-ink-soft hover:border-avocado hover:text-avocado"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <span className="text-sm text-ink-faint">พบ {filtered.length} บทความ</span>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-border bg-beige px-5 py-4 text-[15px] text-ink-faint">
          ไม่พบบทความที่ตรงกับคำค้นหานี้ ลองคำอื่นหรือล้างตัวกรองดูนะครับ
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
