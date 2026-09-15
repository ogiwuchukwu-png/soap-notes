"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

// One-shot scroll reveal: fades a section in the first time it enters the
// viewport, then stops observing. Never re-hides on scroll up. The visible
// styling (and the reduced-motion override) lives in globals.css against the
// data-reveal attribute.
export default function Reveal({ id, className, style, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={style}
      data-reveal={revealed ? "in" : ""}
    >
      {children}
    </section>
  );
}
