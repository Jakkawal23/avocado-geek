import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllGuides, getGuideBySlug } from "@/lib/dataLoader";
import { buildMetadata, guideJsonLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ShareButtons from "@/components/ShareButtons";

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.title,
    description: guide.content,
    path: `/guides/${guide.slug}`,
    keywords: [guide.title, guide.type],
  });
}

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const otherGuides = getAllGuides().filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-content px-4 pb-20 pt-10 sm:px-6">
      <JsonLd data={guideJsonLd(guide)} />
      <Breadcrumbs
        items={[
          { label: "หน้าแรก", href: "/" },
          { label: "ความรู้", href: "/articles" },
          { label: guide.title },
        ]}
      />

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(220px,1fr)]">
        <article className="flex min-w-0 flex-col gap-7">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2.5 text-[13px]">
              <span className="rounded-full bg-avocado-pale px-3 py-1 font-semibold text-avocado">{guide.type}</span>
              <span className="text-ink-faint">ความยาก: {guide.difficulty}</span>
              <span className="text-ink-faint">⏱ {guide.duration}</span>
            </div>
            <h1 className="text-pretty font-display text-[32px] font-bold leading-tight tracking-tight text-avocado-dark sm:text-[44px]">
              {guide.title}
            </h1>
            <p className="text-[17px] leading-relaxed text-ink-soft">{guide.content}</p>
          </div>

          <ol className="flex flex-col gap-0">
            {guide.steps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[40px_1fr] gap-4 pb-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-avocado font-mono text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1.5 border-l border-border pb-1 pl-5 -ml-[19px]">
                  <span className="font-display text-lg font-semibold text-avocado-dark">{step.title}</span>
                  <p className="text-[15px] leading-loose text-ink-soft">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          {guide.tips && guide.tips.length > 0 && (
            <div className="flex flex-col gap-3 rounded-2xl border border-[#F0CFC6] bg-[#FBEAE5] p-6">
              <span className="font-display text-base font-semibold text-[#7A2E1B]">ข้อควรระวัง</span>
              <ul className="flex flex-col gap-2">
                {guide.tips.map((tip) => (
                  <li key={tip} className="flex gap-2.5 text-[15px] leading-relaxed text-[#7A2E1B]">
                    <span aria-hidden>⚠</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
          {otherGuides.length > 0 && (
            <div className="flex flex-col gap-3.5 rounded-2xl border border-border bg-white p-6">
              <span className="font-display text-base font-semibold text-avocado-dark">คู่มืออื่น ๆ</span>
              {otherGuides.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="text-sm font-medium text-ink hover:text-avocado">
                  {g.title}
                </Link>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-6">
            <span className="font-display text-base font-semibold text-avocado-dark">แชร์คู่มือนี้</span>
            <ShareButtons title={guide.title} />
          </div>
        </aside>
      </div>
    </div>
  );
}
