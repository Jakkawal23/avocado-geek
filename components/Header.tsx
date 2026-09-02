"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/varieties", label: "สายพันธุ์" },
  { href: "/articles", label: "ความรู้" },
  { href: "/guides", label: "คู่มือ" },
  { href: "/shops", label: "ร้านค้ารับรอง" },
  { href: "/about", label: "เกี่ยวกับเรา" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="relative block h-[34px] w-[34px] rounded-[50%_50%_48%_48%/60%_60%_40%_40%] bg-avocado">
            <span className="absolute inset-[9px_10px] rounded-full bg-pit" />
          </span>
          <span className="font-display text-[19px] font-bold tracking-tight text-avocado">
            Avocado Geek
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 text-[15px] font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-ink hover:text-avocado">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#D8D4C6] bg-white px-3.5 py-2.5 text-sm font-semibold text-ink-soft hover:border-avocado hover:text-avocado"
          >
            <span aria-hidden>⌕</span>
            <span className="hidden sm:inline">ค้นหา</span>
          </Link>
          <button
            type="button"
            aria-label="เปิดเมนู"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#D8D4C6] bg-white text-ink-soft md:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-cream px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink hover:bg-avocado-pale hover:text-avocado"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
