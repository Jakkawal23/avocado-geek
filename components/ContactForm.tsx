"use client";

import { useState } from "react";

// No backend wired up yet — replace handleSubmit with a real endpoint or
// form service (Formspree, Resend, etc.) when one is available.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col gap-2 rounded-3xl border border-border bg-white p-10 text-center">
        <span className="text-3xl">🌱</span>
        <span className="font-display text-xl font-semibold text-avocado-dark">ส่งข้อความแล้ว</span>
        <span className="text-[15px] text-ink-muted">ขอบคุณครับ ทีมงานจะตอบกลับภายใน 2 วันทำการ</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl border border-border bg-white p-9"
    >
      <span className="font-display text-xl font-semibold text-avocado-dark">ส่งข้อความ</span>
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink-soft">
        ชื่อ
        <input
          required
          placeholder="ชื่อ–นามสกุล"
          className="rounded-[10px] border border-border px-4 py-3.5 text-[15px] text-ink outline-none focus:border-avocado"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink-soft">
        อีเมล
        <input
          type="email"
          required
          placeholder="you@email.com"
          className="rounded-[10px] border border-border px-4 py-3.5 text-[15px] text-ink outline-none focus:border-avocado"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink-soft">
        ข้อความ
        <textarea
          required
          rows={5}
          placeholder="เล่าให้เราฟัง…"
          className="resize-y rounded-[10px] border border-border px-4 py-3.5 text-[15px] text-ink outline-none focus:border-avocado"
        />
      </label>
      <button
        type="submit"
        className="rounded-xl bg-avocado py-3.5 text-base font-semibold text-white hover:bg-avocado-dark"
      >
        ส่งข้อความ
      </button>
    </form>
  );
}
