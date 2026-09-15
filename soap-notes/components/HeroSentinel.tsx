"use client";

import { useEffect, useRef } from "react";
import { setStickyBarVisible } from "@/lib/sticky-bar-store";

// A 1px sentinel placed right after the hero. When it's scrolled past (not
// just approached from below), the sticky buy bar slides in.
export default function HeroSentinel() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setStickyBarVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} style={{ height: 1 }} aria-hidden="true" />;
}
