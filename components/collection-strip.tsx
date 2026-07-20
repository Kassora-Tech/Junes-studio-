"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Artwork } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic pinned horizontal gallery walk. On desktop the section pins and
 * scroll drives the strip sideways — like walking a gallery wall. On smaller
 * screens (and reduced motion) it falls back to a native swipe strip.
 */
export function CollectionStrip({ artworks }: { artworks: Artwork[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const amount = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -amount(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + amount(),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-ink py-20 text-paper lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-0"
      aria-label="Latest collection"
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto px-5 pb-4 sm:px-8 lg:snap-none lg:gap-10 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {/* Intro panel */}
        <div className="flex w-[78vw] shrink-0 snap-start flex-col justify-center sm:w-[50vw] lg:w-[38vw] lg:pl-24">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-stone">
            Latest Collection
          </p>
          <h2 className="mt-4 max-w-sm text-3xl leading-[1.12] sm:text-4xl lg:text-5xl">
            A walk along the newest wall
          </h2>
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-stone">
            The most recent works, hung in the order they left the easel.
            <span className="hidden lg:inline"> Keep scrolling — the wall moves with you.</span>
          </p>
        </div>

        {artworks.map((artwork, i) => (
          <Link
            key={artwork.slug}
            href={`/gallery/${artwork.slug}`}
            className="artwork-card group w-[70vw] shrink-0 snap-start sm:w-[42vw] lg:w-[26vw]"
          >
            <div className="artwork-frame relative aspect-[3/4] !bg-graphite/20">
              <Image
                src={artwork.image.src}
                alt={artwork.image.alt}
                fill
                sizes="(min-width: 1024px) 26vw, 70vw"
                className="object-cover"
              />
              {!artwork.available && (
                <span className="absolute left-3 top-3 bg-paper/90 px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-ink">
                  Sold
                </span>
              )}
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <div>
                <p className="font-display text-lg leading-snug text-paper">
                  {artwork.title}
                </p>
                <p className="mt-1 text-xs tracking-wide text-stone">
                  {artwork.mediumLabel}
                </p>
              </div>
              <span className="font-display text-2xl text-graphite">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </Link>
        ))}

        {/* Outro panel */}
        <div className="flex w-[60vw] shrink-0 snap-start flex-col items-start justify-center sm:w-[36vw] lg:w-[30vw] lg:pr-24">
          <p className="max-w-xs text-[0.9375rem] leading-relaxed text-stone">
            The full collection — including works now sold — lives in the
            gallery.
          </p>
          <Link
            href="/gallery"
            className="mt-8 inline-flex items-center border border-paper/70 px-7 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
          >
            Enter the Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
