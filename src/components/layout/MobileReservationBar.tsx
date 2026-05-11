import Link from "next/link";

export function MobileReservationBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 lg:hidden">
      <Link
        href="/reservations"
        className="flex min-h-14 items-center justify-center rounded-full border border-gold/70 bg-gold px-6 text-[0.72rem] font-bold uppercase tracking-[0.28em] text-charcoal shadow-[0_18px_50px_rgba(0,0,0,0.34)]"
      >
        Reserve Table
      </Link>
    </div>
  );
}
