"use client";

import { useMemo, useState } from "react";
import type { Article, Guide } from "@/lib/types";
import ArticleCard from "./ArticleCard";
import GuideCard from "./GuideCard";

type Kind = "article" | "guide";
type KnowledgeItem =
  | { kind: "article"; key: string; category: string; searchText: string; data: Article }
  | { kind: "guide"; key: string; category: string; searchText: string; data: Guide };

export default function KnowledgeBrowser({ articles, guides }: { articles: Article[]; guides: Guide[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<Kind | "all">("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const items: KnowledgeItem[] = useMemo(() => {
    const articleItems: KnowledgeItem[] = articles.map((a) => ({
      kind: "article",
      key: `article-${a.slug}`,
      category: a.category,
      searchText: [a.title, a.excerpt, a.category, ...(a.tags ?? [])].join(" ").toLowerCase(),
      data: a,
    }));
    const guideItems: KnowledgeItem[] = guides.map((g) => ({
      kind: "guide",
      key: `guide-${g.slug}`,
      category: g.type,
      searchText: [g.title, g.content, g.type].join(" ").toLowerCase(),
      data: g,
    }));
    return [...articleItems, ...guideItems];
  }, [articles, guides]);

  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.category))), [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (kind !== "all" && item.kind !== kind) return false;
      if (activeTag && item.category !== activeTag) return false;
      if (!q) return true;
      return item.searchText.includes(q);
    });
  }, [items, query, kind, activeTag]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-border bg-white px-4 py-3.5 sm:min-w-[280px]">
          <span className="text-ink-fainter">⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาความรู้ เช่น รากเน่า, ทาบกิ่ง, ปุ๋ย"
            className="w-full border-none bg-transparent text-[15px] text-ink outline-none"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "article", "guide"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${
                kind === k
                  ? "border-avocado bg-avocado text-white"
                  : "border-border bg-white text-ink-soft hover:border-avocado hover:text-avocado"
              }`}
            >
              {k === "all" ? "ทั้งหมด" : k === "article" ? "บทความ" : "คู่มือ"}
            </button>
          ))}
        </div>
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
          หมวดทั้งหมด
        </button>
        {categories.map((tag) => (
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

      <span className="text-sm text-ink-faint">พบ {filtered.length} รายการ</span>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-border bg-beige px-5 py-4 text-[15px] text-ink-faint">
          ไม่พบเนื้อหาที่ตรงกับคำค้นหานี้ ลองคำอื่นหรือล้างตัวกรองดูนะครับ
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) =>
            item.kind === "article" ? (
              <ArticleCard key={item.key} article={item.data} />
            ) : (
              <GuideCard key={item.key} guide={item.data} />
            )
          )}
        </div>
      )}
    </div>
  );
}
