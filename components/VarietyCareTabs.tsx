"use client";

import { useState } from "react";

// Generic growing/care reference shared across every variety page — the same
// four tabs the design uses on every variety detail view. Edit the TABS
// array below to change this content site-wide.
const TABS = [
  {
    key: "info",
    label: "ข้อมูล",
    content: [
      { h: "ลักษณะผล", p: "ทรงผล เปลือก และสีเมื่อสุกต่างกันชัดเจนระหว่างสายพันธุ์ ควรสังเกตก้านผลและความแน่นของเปลือกเพื่อตัดสินความสุก" },
      { h: "รสชาติและเนื้อ", p: "เนื้อละเอียดมันตามปริมาณน้ำมัน ยิ่งน้ำมันสูงยิ่งเข้มข้น เหมาะทำกัวคาโมเลและสลัด" },
      { h: "เมล็ด", p: "สัดส่วนเมล็ดต่อผลมีผลต่อเนื้อที่กินได้ สายพันธุ์เมล็ดเล็กให้เนื้อมากกว่าถึง 15%" },
      { h: "คุณค่าทางอาหาร", p: "ไขมันไม่อิ่มตัวเชิงเดี่ยวสูง พร้อมโพแทสเซียมและวิตามินอี ปริมาณต่างกันตามความสุกและสายพันธุ์" },
    ],
  },
  {
    key: "grow",
    label: "วิธีปลูก",
    content: [
      { h: "สภาพดิน", p: "ดินร่วนระบายน้ำดี pH 5.5–6.5 หลีกเลี่ยงดินเหนียวและพื้นที่น้ำขัง ยกโคกปลูกสูง 20–30 ซม." },
      { h: "สภาพอากาศ", p: "ต้องการอุณหภูมิ 20–30 องศา ช่วงออกดอกอากาศเย็นช่วยติดผล ลมแรงทำให้ผลร่วง ควรปลูกแนวกันลม" },
      { h: "การให้น้ำ", p: "ระบบน้ำหยดสม่ำเสมอ ต้นเล็ก 20–30 ลิตร/สัปดาห์ ต้นให้ผล 60–100 ลิตร/สัปดาห์ งดรดเมื่อดินยังชื้น" },
      { h: "ปุ๋ยและการทาบกิ่ง", p: "ปุ๋ยคอกปีละ 2 ครั้งร่วมกับปุ๋ยเคมีสูตรเสมอในระยะต้นเล็ก และใช้ต้นทาบเสมอเพื่อให้ได้ลักษณะตรงตามสายพันธุ์" },
    ],
  },
  {
    key: "care",
    label: "ดูแลรักษา",
    content: [
      { h: "การตัดแต่งกิ่ง", p: "ตัดกิ่งแห้ง กิ่งไขว้ และกิ่งน้ำค้างหลังเก็บเกี่ยว คุมความสูงไม่เกิน 5–6 เมตรเพื่อให้จัดการง่าย" },
      { h: "การเก็บเกี่ยว", p: "เก็บเมื่อได้น้ำหนักและปริมาณน้ำมันตามเกณฑ์ ตัดโดยเหลือก้านสั้นติดผลเพื่อลดการเข้าทำลายของเชื้อ" },
      { h: "หลังเก็บเกี่ยว", p: "บ่มที่อุณหภูมิห้อง 3–7 วัน เก็บผลสุกในตู้เย็น 5–7 องศาได้อีก 5 วัน ไม่วางซ้อนกันเกินสองชั้น" },
      { h: "การฟื้นต้น", p: "ใส่ปุ๋ยคอกและปรับ pH ดินหลังเก็บเกี่ยว ให้ต้นพักตัวก่อนเข้าฤดูออกดอกครั้งถัดไป" },
    ],
  },
  {
    key: "problem",
    label: "ปัญหา",
    content: [
      { h: "รากเน่า (Phytophthora)", p: "ใบเหลืองร่วง กิ่งแห้งย้อน แก้ด้วยการระบายน้ำ ยกโคก และราดเมทาแลกซิลตามอัตราแนะนำ" },
      { h: "แอนแทรคโนส", p: "จุดดำบนผลช่วงใกล้สุก ลดโดยตัดแต่งให้ทรงพุ่มโปร่งและฉีดสารป้องกันเชื้อราก่อนฝนชุก" },
      { h: "เพลี้ยไฟและไรแดง", p: "ทำให้ผิวผลกร้าน ระบาดในหน้าแล้ง ใช้น้ำมันปิโตรเลียมหรือสารชีวภัณฑ์สลับกลุ่มสารเพื่อกันการดื้อ" },
      { h: "ผลร่วงผิดปกติ", p: "มักมาจากขาดแคลเซียม–โบรอน น้ำไม่สม่ำเสมอ หรือขาดพันธุ์ผสมเกสร ควรตรวจทั้งสามปัจจัย" },
    ],
  },
];

export default function VarietyCareTabs() {
  const [active, setActive] = useState(TABS[0].key);
  const activeTab = TABS.find((t) => t.key === active) ?? TABS[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-1 border-b border-border">
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={`border-b-[3px] px-5 py-3.5 text-[15px] font-semibold ${
                isActive ? "border-avocado text-avocado" : "border-transparent text-ink-faint hover:text-avocado"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {activeTab.content.map((c) => (
          <div key={c.h} className="flex flex-col gap-2 rounded-2xl border border-border bg-white p-6">
            <span className="font-display text-[17px] font-semibold text-avocado-dark">{c.h}</span>
            <span className="text-[15px] leading-relaxed text-ink-soft">{c.p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
