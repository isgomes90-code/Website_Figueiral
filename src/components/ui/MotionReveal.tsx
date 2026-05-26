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

const revealCallbacks = new WeakMap<Element, () => void>();
let sharedRevealObserver: IntersectionObserver | null = null;

function getSharedRevealObserver() {
  if (typeof window === "undefined") return null;
  if (sharedRevealObserver) return sharedRevealObserver;

  sharedRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealCallbacks.get(entry.target)?.();
        revealCallbacks.delete(entry.target);
        sharedRevealObserver?.unobserve(entry.target);
      });
    },
    { rootMargin: "80px 0px", threshold: 0.025 }
  );

  return sharedRevealObserver;
}

function observeReveal(el: Element, onReveal: () => void) {
  const observer = getSharedRevealObserver();
  if (!observer) {
    onReveal();
    return () => {};
  }

  revealCallbacks.set(el, onReveal);
  observer.observe(el);

  return () => {
    revealCallbacks.delete(el);
    observer.unobserve(el);
  };
}

/**
 * Revelação ao scroll sem Framer Motion — observer partilhado para reduzir TBT.
 */
export function MotionReveal({ children, className = "", delay = 0, style, ...rest }: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancel = false;

    function revealNow() {
      if (!cancel) setRevealed(true);
    }

    if (typeof IntersectionObserver === "undefined") {
      revealNow();
      return () => {
        cancel = true;
      };
    }

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mqReduce.matches) {
      revealNow();
      return () => {
        cancel = true;
      };
    }

    const cleanup = observeReveal(el, revealNow);
    return () => {
      cancel = true;
      cleanup();
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
