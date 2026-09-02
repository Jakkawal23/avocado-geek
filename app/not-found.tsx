import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-4 py-32 text-center sm:px-6">
      <span className="text-5xl">🥑</span>
      <h1 className="font-display text-3xl font-bold text-avocado-dark">ไม่พบหน้านี้</h1>
      <p className="text-ink-muted">หน้าที่คุณกำลังหาอาจถูกย้ายหรือไม่มีอยู่</p>
      <Link href="/" className="rounded-xl bg-avocado px-6 py-3 font-semibold text-white hover:bg-avocado-dark">
        กลับหน้าแรก
      </Link>
    </div>
  );
}
