import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M14.5 7.5H16.5V4.5H14.5C12.29 4.5 10.5 6.29 10.5 8.5V10.5H8.5V13.5H10.5V19.5H13.5V13.5H16.5L17 10.5H13.5V8.75C13.5 8.06 14.06 7.5 14.5 7.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TripAdvisorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="7.25" cy="12.5" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.75" cy="12.5" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.25" cy="12.5" r="1.1" fill="currentColor" />
      <circle cx="16.75" cy="12.5" r="1.1" fill="currentColor" />
      <path
        d="M12 5.5L13.15 8.35L16.2 8.55L13.85 10.45L14.55 13.45L12 11.85L9.45 13.45L10.15 10.45L7.8 8.55L10.85 8.35L12 5.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
