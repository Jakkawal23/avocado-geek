"use client";

import { useState } from "react";

// No backend: this just confirms the submission in the UI. Wire it to a real
// list provider later (Buttondown, Mailchimp, etc.) by replacing handleSubmit.
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("done");
  }

  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="flex flex-col gap-1.5">
        <span className="font-display text-lg font-semibold text-white">รับความรู้ใหม่ทางอีเมล</span>
        <span className="text-sm text-avocado-paler">บทความและคู่มือใหม่ ส่งถึงคุณเดือนละ 1–2 ครั้ง ไม่มีสแปม</span>
      </div>
      {status === "done" ? (
        <span className="rounded-xl bg-pit px-5 py-3 text-sm font-semibold text-pit-dark">
          สมัครแล้ว ขอบคุณครับ 🎉
        </span>
      ) : (
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-xl border-0 px-4 py-3 text-sm text-ink outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-pit px-5 py-3 text-sm font-semibold text-pit-dark hover:bg-pit-light"
          >
            สมัคร
          </button>
        </form>
      )}
    </div>
  );
}
