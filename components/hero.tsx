"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Artwork } from "@/lib/data";

export function Hero({ artwork }: { artwork: Artwork }) {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-paper">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
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

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-8 sm:pb-28">
        <motion.p
          {...fade(0.5)}
          className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-stone"
        >
          Original drawings · White chalk on black canvas
        </motion.p>
        <motion.h1
          {...fade(0.65)}
          className="mt-6 max-w-3xl text-4xl leading-[1.08] sm:text-6xl lg:text-7xl"
        >
          Drawing the light out of the dark.
        </motion.h1>
        <motion.p
          {...fade(0.8)}
          className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-stone"
        >
          Quiet, deliberate works in chalk, charcoal, graphite and ink — made
          slowly by hand in June’s studio.
        </motion.p>
        <motion.div {...fade(0.95)} className="mt-10 flex flex-wrap gap-4">
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
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
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
