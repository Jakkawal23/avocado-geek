import Link from "next/link";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="bg-avocado-dark text-avocado-paler">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
        <Newsletter />
      </div>
      <div className="mx-auto grid max-w-content gap-9 px-4 pb-8 sm:grid-cols-2 sm:px-6 md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <span className="font-display text-lg font-bold text-white">Avocado Geek</span>
          <span className="max-w-[30ch] text-sm leading-relaxed">
            ฐานของความรู้อโวคาโด้ทั้งหมด — คู่มือของผู้ปลูกอโวคาโด้ไทย
          </span>
        </div>
        <div className="flex flex-col gap-2.5 text-sm">
          <span className="mb-1 font-semibold text-white">เนื้อหา</span>
          <Link href="/articles" className="text-avocado-paler hover:text-white">บทความความรู้</Link>
          <Link href="/varieties" className="text-avocado-paler hover:text-white">สายพันธุ์อโวคาโด้</Link>
          <Link href="/guides" className="text-avocado-paler hover:text-white">คู่มือปลูก &amp; ดูแล</Link>
          <Link href="/shops" className="text-avocado-paler hover:text-white">ร้านค้าที่รับรอง</Link>
        </div>
        <div className="flex flex-col gap-2.5 text-sm">
          <span className="mb-1 font-semibold text-white">เกี่ยวกับ</span>
          <Link href="/about" className="text-avocado-paler hover:text-white">เกี่ยวกับเรา</Link>
          <Link href="/contact" className="text-avocado-paler hover:text-white">ติดต่อ</Link>
          <Link href="/search" className="text-avocado-paler hover:text-white">ค้นหาทั้งเว็บ</Link>
        </div>
        <div className="flex flex-col gap-2.5 text-sm">
          <span className="mb-1 font-semibold text-white">ติดตาม</span>
          <span className="text-avocado-paler">Facebook</span>
          <span className="text-avocado-paler">Line Official</span>
          <span className="text-avocado-paler">YouTube</span>
        </div>
      </div>
      <div className="mx-auto max-w-content border-t border-white/10 px-4 py-5 text-[13px] text-[#9CBD97] sm:px-6">
        © {new Date().getFullYear()} Avocado Geek. สงวนลิขสิทธิ์ทุกประการ
      </div>
    </footer>
  );
}
