"use client";

import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState
} from "react";

type MotionRevealProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  children: ReactNode;
  delay?: number;
};

/**
 * Revelação ao scroll sem Framer Motion — menos JS no bundle e compilador mais rápido em dev.
 */
export function MotionReveal({ children, className = "", delay = 0, style, ...rest }: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    let cancel = false;

    function revealNow() {
      if (!cancel) setRevealed(true);
    }

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mqReduce.matches) {
      revealNow();
      return () => {
        cancel = true;
      };
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry?.isIntersecting) return;
          obs.disconnect();
          revealNow();
        });
      },
      { rootMargin: "80px 0px", threshold: 0.025 }
    );
    obs.observe(el);
    return () => {
      cancel = true;
      obs.disconnect();
    };
  }, []);

  const delayedStyle = {
    ...style,
    ["--reveal-delay" as string]: `${delay}s`
  } satisfies CSSProperties;

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${revealed ? "reveal-on-scroll--visible" : ""} ${className}`}
      style={delayedStyle}
      {...rest}
    >
      {children}
    </div>
  );
}
