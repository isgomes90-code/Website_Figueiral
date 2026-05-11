import Link from "next/link";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

export function MobileReservationBar({ dictionary, lang }: { dictionary: Dictionary; lang: Locale }) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 lg:hidden">
      <Link
        href={localizedPath(lang, "/reservations")}
        className="flex min-h-14 items-center justify-center rounded-full border border-gold/70 bg-gold px-6 text-[0.72rem] font-bold uppercase tracking-[0.28em] text-charcoal shadow-[0_18px_46px_rgba(111,80,50,0.22)]"
      >
        {dictionary.navigation.reserveTable}
      </Link>
    </div>
  );
}
