"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Desktop-only "View" cursor pill that follows the pointer and blooms over
 * artwork cards (`.artwork-card` or anything with `data-cursor="view"`).
 * Hidden for touch devices and reduced-motion visitors (CSS handles the latter).
 */
export function GalleryCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    let active = false;
    const setActive = (next: boolean) => {
      if (next === active) return;
      active = next;
      gsap.to(el, {
        scale: next ? 1 : 0,
        duration: 0.45,
        ease: next ? "back.out(1.6)" : "power3.out",
      });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      setActive(!!target?.closest?.('.artwork-card a, [data-cursor="view"]'));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div ref={ref} className="gallery-cursor hidden lg:flex" aria-hidden>
      View
    </div>
  );
}
