import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "ติดต่อเรา",
  description: "ติดต่อทีมงาน Avocado Geek สำหรับคำถามเรื่องการปลูก เสนอร้านค้า หรือแจ้งข้อมูลผิดพลาด",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-4 pb-20 pt-10 sm:px-6">
      <Breadcrumbs items={[{ label: "หน้าแรก", href: "/" }, { label: "ติดต่อเรา" }]} />
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-4xl font-bold tracking-tight text-avocado-dark sm:text-[44px]">
            ติดต่อทีมงาน
          </h1>
          <p className="max-w-[46ch] text-[17px] leading-relaxed text-ink-soft">
            มีคำถามเรื่องการปลูก อยากเสนอร้านค้าเข้ารับการรับรอง หรือพบข้อมูลผิดพลาด — เขียนมาได้เลย
            เราตอบภายใน 2 วันทำการ
          </p>
          <div className="flex flex-col gap-3 pt-2">
            {[
              { k: "อีเมล", v: "hello@avocadogeek.example" },
              { k: "Line Official", v: "@avocadogeek" },
              { k: "เวลาทำการ", v: "จันทร์–ศุกร์ 9:00–17:00" },
            ].map((c) => (
              <div
                key={c.k}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-5 py-4"
              >
                <span className="text-[15px] text-ink-faint">{c.k}</span>
                <span className="text-[15px] font-semibold text-avocado">{c.v}</span>
              </div>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
