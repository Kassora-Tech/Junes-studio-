"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Artwork } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;
const HEADLINE = "Drawing the light out of the dark.".split(" ");

export function Hero({ artwork }: { artwork: Artwork }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Cinematic scroll-out: the artwork slowly enlarges and the copy lifts away
  // as the visitor scrolls past the hero.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-paper"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { scale: imageScale, y: imageY }}
        initial={reduce ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: EASE }}
      >
        <Image
          src={artwork.image.src}
          alt={artwork.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-40 sm:px-8 sm:pb-32"
      >
        <motion.p
          {...fade(0.4)}
          className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-stone"
        >
          Original drawings · White chalk on black canvas
        </motion.p>

        {/* Word-by-word masked reveal */}
        <h1 className="mt-6 max-w-3xl text-4xl leading-[1.08] sm:text-6xl lg:text-7xl">
          {HEADLINE.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top"
            >
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.55 + i * 0.07, ease: EASE }}
              >
                {word}
              </motion.span>
              {i < HEADLINE.length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </h1>

        <motion.p
          {...fade(1.1)}
          className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-stone"
        >
          Quiet, deliberate works in chalk, charcoal, graphite and ink — made
          slowly by hand in June’s studio.
        </motion.p>
        <motion.div {...fade(1.25)} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/gallery"
            className="inline-flex items-center bg-paper px-7 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-stone"
          >
            View the Collection
          </Link>
          <Link
            href="/commissions"
            className="inline-flex items-center border border-paper/70 px-7 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
          >
            Commission a Piece
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={reduce ? undefined : { opacity: contentOpacity }}
        className="absolute bottom-8 right-8 hidden items-center gap-3 text-[0.625rem] uppercase tracking-[0.22em] text-stone sm:flex"
        aria-hidden
      >
        Scroll
        <motion.span
          className="block h-10 w-px bg-stone/60"
          animate={reduce ? undefined : { scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
