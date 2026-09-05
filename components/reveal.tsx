"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Works settle onto the wall as they come into view.
 *
 * The previous build hid every element in CSS and relied on a scroll library
 * to bring it back, so when that library and the scroll position disagreed the
 * page rendered blank. This fails open instead: the hiding rule is scoped to
 * `.js-reveal`, which is only added once this observer exists to remove it
 * again, and anything already on screen at mount is revealed immediately.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("js-reveal");
      return;
    }

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-lift]")
    );
    if (!targets.length) {
      root.classList.remove("js-reveal");
      return;
    }

    root.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.lift) || 0;
          el.style.transitionDelay = `${delay * 70}ms`;
          el.classList.add("is-in");
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 }
    );

    for (const el of targets) {
      // Anything already in view when the page loads is simply shown.
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-in");
      else observer.observe(el);
    }

    // A last-resort guarantee: nothing stays hidden for longer than this.
    const failsafe = window.setTimeout(() => {
      for (const el of targets) el.classList.add("is-in");
    }, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
