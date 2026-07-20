"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { artworks, mediums, type Medium } from "@/lib/data";
import { ArtworkCard } from "@/components/artwork-card";
import { cn } from "@/lib/utils";

export function GalleryGrid({ availableOnly = false }: { availableOnly?: boolean }) {
  const [filter, setFilter] = useState<Medium | "all">("all");

  const pool = availableOnly ? artworks.filter((a) => a.available) : artworks;
  const shown = filter === "all" ? pool : pool.filter((a) => a.medium === filter);

  return (
    <div>
      <div
        className="flex flex-wrap items-center gap-x-7 gap-y-3"
        role="group"
        aria-label="Filter artworks by medium"
      >
        {[{ value: "all" as const, label: "All Works" }, ...mediums].map((m) => (
          <button
            key={m.value}
            type="button"
            onClick={() => setFilter(m.value)}
            aria-pressed={filter === m.value}
            className={cn(
              "border-b pb-1 text-[0.75rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300",
              filter === m.value
                ? "border-ink text-ink"
                : "border-transparent text-graphite/70 hover:text-ink"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((artwork, i) => (
            <motion.div
              key={artwork.slug}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArtworkCard artwork={artwork} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {shown.length === 0 && (
        <p className="mt-16 text-sm text-graphite">
          No works in this medium at the moment — new pieces arrive with each
          season.
        </p>
      )}
    </div>
  );
}
