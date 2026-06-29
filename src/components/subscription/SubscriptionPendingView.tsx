import { MotionReveal } from "@/components/ui/MotionReveal";
import type { SubscriptionPendingContent } from "@/lib/subscription-confirmation";
import { bodyNoteClasses, bodyTextClasses, pageTitleClasses } from "@/lib/sectionTitle";

function MailIcon() {
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function SubscriptionPendingView({ content }: { content: SubscriptionPendingContent }) {
  return (
    <section className="pt-36 pb-24 sm:pt-44">
      <div className="section-shell max-w-2xl">
        <MotionReveal className="luxury-card rounded-[2rem] px-6 py-12 text-center sm:px-10 sm:py-14">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brandGreen/12 ring-1 ring-brandGreen/25"
            aria-hidden
          >
            <MailIcon />
          </div>
          <h1 className={`mt-8 text-balance text-charcoal ${pageTitleClasses}`}>{content.title}</h1>
          <p className={`mx-auto mt-5 max-w-md text-walnut ${bodyTextClasses}`}>{content.body1}</p>
          <p className={`mx-auto mt-4 max-w-md text-walnut ${bodyTextClasses}`}>{content.body2}</p>
          <p className={`mx-auto mt-6 max-w-md text-walnut/70 ${bodyNoteClasses}`}>{content.footnote}</p>
        </MotionReveal>
      </div>
    </section>
  );
}
