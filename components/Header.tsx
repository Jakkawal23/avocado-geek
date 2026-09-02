"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/varieties", label: "สายพันธุ์" },
  { href: "/articles", label: "ความรู้" },
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

        <nav className="ml-auto hidden items-center gap-7 text-[15px] font-medium lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-ink hover:text-avocado">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2.5 lg:ml-0 lg:flex">
          <Link
            href="/trace"
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-[10px] border border-[#D8D4C6] bg-white px-4 py-2.5 text-sm font-semibold text-ink-soft hover:border-avocado hover:text-avocado"
          >
            <span className="text-[13px]">▣</span>
            ตรวจรหัสต้น
          </Link>
          <Link
            href="/match"
            className="whitespace-nowrap rounded-[10px] bg-avocado px-5 py-2.5 text-sm font-semibold text-white hover:bg-avocado-light"
          >
            เลือกพันธุ์ให้ฉัน
          </Link>
        </div>

        <button
          type="button"
          aria-label="เปิดเมนู"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#D8D4C6] bg-white text-ink-soft lg:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-3 border-t border-border bg-cream px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
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
          <div className="flex flex-col gap-2 pt-1">
            <Link
              href="/trace"
              onClick={() => setOpen(false)}
              className="rounded-[10px] border border-[#D8D4C6] bg-white px-4 py-3 text-center text-sm font-semibold text-ink-soft"
            >
              ▣ ตรวจรหัสต้น
            </Link>
            <Link
              href="/match"
              onClick={() => setOpen(false)}
              className="rounded-[10px] bg-avocado px-4 py-3 text-center text-sm font-semibold text-white"
            >
              เลือกพันธุ์ให้ฉัน
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
