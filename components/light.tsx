"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The moving light source.
 *
 * The work is chalk on black, so the site is lit the way the work is: one warm
 * beam that rakes across the wall and catches the tooth of the paper as it
 * passes. On a desktop the beam follows the pointer. On a touch device it
 * hangs fixed in the viewport — a spot on the ceiling — and the wall scrolls
 * through it, which is exactly what walking a gallery does.
 *
 * Cost control: one pointer listener and one scroll listener for the whole
 * page, both passive. A frame reads the rects of only the surfaces currently
 * on screen, then writes only two custom properties per surface, both of which
 * feed a single translate. Nothing else changes per frame, and nothing at all
 * runs when the visitor prefers reduced motion.
 */

type Surface = { host: HTMLElement; beam: HTMLElement };

const surfaces = new Map<Element, Surface>();
const onscreen = new Set<Surface>();

let observer: IntersectionObserver | null = null;
let listening = false;
let queued = false;

// Light source position, in viewport coordinates.
let sourceX = 0;
let sourceY = 0;

function paint() {
  queued = false;
  if (!onscreen.size) return;

  const list = Array.from(onscreen);
  // Read every rect first, then write — never interleave, or each write
  // invalidates the next read and forces a synchronous layout.
  const rects = list.map((s) => s.host.getBoundingClientRect());
  for (let i = 0; i < list.length; i++) {
    const { beam } = list[i];
    const r = rects[i];
    beam.style.setProperty("--lx", `${Math.round(sourceX - r.left)}px`);
    beam.style.setProperty("--ly", `${Math.round(sourceY - r.top)}px`);
  }
}

function schedule() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(paint);
}

function ensureListening() {
  if (listening || typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  listening = true;

  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (fine) {
    window.addEventListener(
      "pointermove",
      (e) => {
        sourceX = e.clientX;
        sourceY = e.clientY;
        schedule();
      },
      { passive: true }
    );
  } else {
    // A fixed spot, high and slightly left of centre, like a real ceiling
    // track. The wall moves through it.
    const place = () => {
      sourceX = window.innerWidth * 0.46;
      sourceY = window.innerHeight * 0.4;
      schedule();
    };
    place();
    window.addEventListener("resize", place, { passive: true });
    // Coalesced to one frame; only runs while the wall is actually moving.
    window.addEventListener("scroll", schedule, { passive: true });
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const surface = surfaces.get(entry.target);
        if (!surface) continue;
        if (entry.isIntersecting) onscreen.add(surface);
        else onscreen.delete(surface);
      }
      schedule();
    },
    { rootMargin: "20% 0px" }
  );

  for (const s of surfaces.values()) observer.observe(s.host);
}

/**
 * Wraps any surface that should catch the light. Children render beneath the
 * scrim; the beam sits above them and is purely decorative.
 */
export function Lit({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const beam = beamRef.current;
    if (!host || !beam) return;

    const surface: Surface = { host, beam };
    surfaces.set(host, surface);
    ensureListening();
    observer?.observe(host);

    return () => {
      observer?.unobserve(host);
      surfaces.delete(host);
      onscreen.delete(surface);
    };
  }, []);

  return (
    <div ref={hostRef} className={`lit ${className ?? ""}`} style={style}>
      {children}
      <span className="lit__scrim" aria-hidden />
      <span ref={beamRef} className="lit__beam" aria-hidden />
    </div>
  );
}
