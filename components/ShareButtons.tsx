"use client";

import { useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  function shareTo(network: "facebook" | "line") {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = encodeURIComponent(title);
    const href =
      network === "facebook"
        ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        : `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${text}`;
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=600");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — ignore silently
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => shareTo("facebook")}
        className="rounded-[10px] border border-border px-3.5 py-2.5 text-sm text-ink-soft hover:border-avocado hover:text-avocado"
      >
        Facebook
      </button>
      <button
        type="button"
        onClick={() => shareTo("line")}
        className="rounded-[10px] border border-border px-3.5 py-2.5 text-sm text-ink-soft hover:border-avocado hover:text-avocado"
      >
        Line
      </button>
      <button
        type="button"
        onClick={copyLink}
        className="rounded-[10px] border border-border px-3.5 py-2.5 text-sm text-ink-soft hover:border-avocado hover:text-avocado"
      >
        {copied ? "คัดลอกแล้ว ✓" : "คัดลอกลิงก์"}
      </button>
    </div>
  );
}
