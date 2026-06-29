import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MotionReveal } from "@/components/ui/MotionReveal";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import type { SubscriptionConfirmedContent } from "@/lib/subscription-confirmation";
import { bodyNoteClasses, bodyTextClasses, pageTitleClasses } from "@/lib/sectionTitle";

function SuccessCheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-8 w-8 text-brandGreen"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function SubscriptionConfirmedView({
  locale,
  content
}: {
  locale: Locale;
  content: SubscriptionConfirmedContent;
}) {
  return (
    <section className="pt-36 pb-24 sm:pt-44">
      <div className="section-shell max-w-2xl">
        <MotionReveal className="luxury-card rounded-[2rem] px-6 py-12 text-center sm:px-10 sm:py-14">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brandGreen/12 ring-1 ring-brandGreen/25"
            aria-hidden
          >
            <SuccessCheckIcon />
          </div>
          <h1 className={`mt-8 text-balance text-charcoal ${pageTitleClasses}`}>{content.title}</h1>
          <p className={`mx-auto mt-5 max-w-md text-walnut ${bodyTextClasses}`}>{content.body1}</p>
          <p className={`mx-auto mt-4 max-w-md text-walnut/70 ${bodyNoteClasses}`}>{content.footnote}</p>
          <div className="mt-8 flex justify-center">
            <LuxuryButton href={localizedPath(locale, "/")}>{content.cta}</LuxuryButton>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
