import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "เกี่ยวกับเรา",
  description: "Avocado Geek รวบรวมความรู้ ตรวจสอบสายพันธุ์ และคัดกรองร้านค้าอโวคาโด้ไทยไว้ในที่เดียว",
  path: "/about",
});

const PILLARS = [
  {
    n: "01",
    h: "ฐานข้อมูลที่ตรวจสอบแล้ว",
    p: "ทุกสายพันธุ์และร้านค้าผ่านการตรวจสอบก่อนเผยแพร่ พร้อมอัปเดตเมื่อมีข้อมูลใหม่",
  },
  {
    n: "02",
    h: "อ้างอิงงานวิชาการ",
    p: "บทความและคู่มืออ้างอิงแหล่งข้อมูลอย่าง UC IPM, UC ANR และ UC Davis แล้วปรับให้เข้ากับสภาพไทย",
  },
  {
    n: "03",
    h: "แก้ไขและเพิ่มเนื้อหาได้ง่าย",
    p: "ข้อมูลทั้งหมดเก็บเป็นไฟล์ JSON ธรรมดา ผู้ดูแลเว็บแก้ไขหรือเพิ่มเนื้อหาใหม่ได้โดยไม่ต้องเขียนโค้ด",
  },
];

const FAQS = [
  {
    q: "ข้อมูลสายพันธุ์มาจากไหน",
    a: "รวบรวมจากเอกสารวิชาการของหน่วยงานเกษตรต่างประเทศ ผสมกับข้อมูลจากผู้ปลูกและร้านต้นพันธุ์ในไทย แล้วตรวจทานโดยทีมวิชาการก่อนเผยแพร่",
  },
  {
    q: "ร้านค้าที่ขึ้นในเว็บได้รับการรับรองอย่างไร",
    a: "ร้านค้าต้องผ่านการตรวจสอบตัวตนและแหล่งที่มาของต้นพันธุ์เบื้องต้น และมีการทบทวนซ้ำเป็นระยะ",
  },
  {
    q: "ฉันสามารถเพิ่มบทความหรือสายพันธุ์เองได้ไหม",
    a: "ได้ — เนื้อหาทั้งเว็บเก็บเป็นไฟล์ JSON แยกไฟล์ต่อรายการใน /public/data คัดลอกไฟล์ตัวอย่างแล้วแก้ไขข้อมูลได้ทันที",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-4 pb-20 pt-10 sm:px-6">
      <Breadcrumbs items={[{ label: "หน้าแรก", href: "/" }, { label: "เกี่ยวกับเรา" }]} />

      <div className="mb-16 flex flex-col gap-4">
        <h1 className="text-pretty font-display text-4xl font-bold leading-tight tracking-tight text-avocado-dark sm:text-5xl">
          เราสร้างฐานความรู้ที่ผู้ปลูกไทยเชื่อถือได้
        </h1>
        <p className="max-w-[70ch] text-lg leading-relaxed text-ink-soft">
          Avocado Geek เริ่มจากกลุ่มผู้ปลูกอโวคาโด้ในภาคเหนือที่เจอปัญหาเดียวกัน — ข้อมูลกระจัดกระจาย
          ต้นพันธุ์ไม่ตรงปก และไม่รู้จะถามใคร เราจึงรวบรวมความรู้ ตรวจสอบสายพันธุ์ และคัดกรองร้านค้าไว้ในที่เดียว
        </p>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.n} className="flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-7">
            <span className="font-mono text-[13px] text-ink-faint">{p.n}</span>
            <span className="font-display text-xl font-semibold text-avocado-dark">{p.h}</span>
            <span className="text-[15px] leading-relaxed text-ink-muted">{p.p}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="font-display text-2xl font-semibold text-avocado-dark">คำถามที่พบบ่อย</h2>
        {FAQS.map((f) => (
          <div key={f.q} className="flex flex-col gap-2 rounded-2xl border border-border bg-white p-6">
            <span className="text-lg font-semibold text-avocado-dark">{f.q}</span>
            <span className="text-[15px] leading-relaxed text-ink-soft">{f.a}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
