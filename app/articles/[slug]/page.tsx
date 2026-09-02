import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug, getRelatedArticles, getAllVarieties } from "@/lib/dataLoader";
import { articleJsonLd, buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import JsonLd from "@/components/JsonLd";
import { formatThaiDate } from "@/components/ArticleCard";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/articles/${article.slug}`,
    keywords: article.tags,
    type: "article",
  });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);
  const mentionedVarieties = getAllVarieties()
    .filter((v) => article.tags?.some((t) => article.title.includes(v.name) || t.includes(v.name)))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-content px-4 pb-20 pt-10 sm:px-6">
      <JsonLd data={articleJsonLd(article)} />
      <Breadcrumbs
        items={[
          { label: "หน้าแรก", href: "/" },
          { label: "บล็อกความรู้", href: "/articles" },
          { label: article.category },
        ]}
      />

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]">
        <article className="flex min-w-0 flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full bg-avocado-pale px-3.5 py-1.5 text-[13px] font-semibold text-avocado">
              {article.category}
            </span>
            <h1 className="text-pretty font-display text-[32px] font-bold leading-tight tracking-tight text-avocado-dark sm:text-[44px]">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-ink-faint">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-avocado-pale text-sm font-bold text-avocado">
                {article.author.charAt(0)}
              </span>
              <span className="font-semibold text-ink">{article.author}</span>
              <span>·</span>
              <span>{formatThaiDate(article.date)}</span>
              {article.readingMinutes && (
                <>
                  <span>·</span>
                  <span>อ่าน {article.readingMinutes} นาที</span>
                </>
              )}
            </div>
          </div>

          <div className="placeholder-tile flex aspect-video items-center justify-center rounded-3xl border border-[#D8DFD2]">
            <span className="font-mono text-xs text-[#4E6B4A]">featured image — 1200×800</span>
          </div>

          <div className="flex flex-col gap-2.5 rounded-2xl border border-border bg-beige p-6">
            <span className="font-display text-[15px] font-semibold text-avocado-dark">สารบัญ</span>
            {article.content.map((section) => (
              <a
                key={section.h}
                href={`#${slugify(section.h)}`}
                className="text-[15px] text-[#4A6B47] hover:text-avocado"
              >
                {section.h}
              </a>
            ))}
          </div>

          {article.content.map((section) => (
            <div key={section.h} id={slugify(section.h)} className="flex flex-col gap-3.5 scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-avocado-dark">
                {section.h}
              </h2>
              <p className="text-pretty text-[17px] leading-loose text-[#3C3C36]">{section.p}</p>
              {section.img && (
                <figure className="mt-1.5 flex flex-col gap-2">
                  <div className="placeholder-tile flex aspect-video items-center justify-center rounded-2xl border border-border" />
                  <figcaption className="text-sm text-ink-fainter">{section.img}</figcaption>
                </figure>
              )}
            </div>
          ))}

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-col gap-2.5 border-t border-border pt-5">
              <span className="text-[13px] text-ink-fainter">หัวข้อที่เกี่ยวข้อง</span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border bg-beige px-3 py-1.5 text-[13px] text-ink-soft">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-2 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-avocado p-8">
            <div className="flex flex-col gap-1.5">
              <span className="font-display text-xl font-semibold text-white">
                อยากรู้ว่าสายพันธุ์ไหนเหมาะกับสวนคุณ?
              </span>
              <span className="text-[15px] text-avocado-paler">เปิดดูข้อมูลสายพันธุ์แบบละเอียด</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/varieties"
                className="rounded-[10px] bg-pit px-5 py-3.5 text-sm font-bold text-pit-dark hover:bg-pit-light"
              >
                ค้นหาสายพันธุ์
              </Link>
              <Link
                href="/match"
                className="rounded-[10px] border border-white/35 px-5 py-3.5 text-sm font-semibold text-white hover:border-white"
              >
                เลือกพันธุ์ให้ฉัน
              </Link>
            </div>
          </div>
        </article>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
          {related.length > 0 && (
            <div className="flex flex-col gap-3.5 rounded-2xl border border-border bg-white p-6">
              <span className="font-display text-base font-semibold text-avocado-dark">บทความที่เกี่ยวข้อง</span>
              {related.map((r) => (
                <Link key={r.slug} href={`/articles/${r.slug}`} className="flex items-start gap-3 text-ink hover:text-avocado">
                  <span className="placeholder-tile-soft h-12 w-14 shrink-0 rounded-lg" />
                  <span className="text-sm font-medium leading-snug">{r.title}</span>
                </Link>
              ))}
            </div>
          )}

          {mentionedVarieties.length > 0 && (
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-6">
              <span className="font-display text-base font-semibold text-avocado-dark">สายพันธุ์ที่กล่าวถึง</span>
              {mentionedVarieties.map((v) => (
                <Link
                  key={v.slug}
                  href={`/varieties/${v.slug}`}
                  className="flex items-center justify-between gap-2.5 rounded-[10px] border border-border px-3.5 py-2.5 text-sm font-semibold text-avocado hover:border-avocado-light"
                >
                  <span>{v.name}</span>
                  <span>→</span>
                </Link>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-6">
            <span className="font-display text-base font-semibold text-avocado-dark">แชร์บทความ</span>
            <ShareButtons title={article.title} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/(^-|-$)/g, "");
}
