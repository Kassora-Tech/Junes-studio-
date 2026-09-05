"use client";

import { useState } from "react";
import { artworks, mediums, type Medium } from "@/lib/data";
import { Wall } from "@/components/wall";
import { cn } from "@/lib/utils";

/**
 * Filtering the wall by medium. Presented as the mediums themselves rather
 * than as shop facets — you are choosing a material, not narrowing a catalogue.
 */
export function WallFilter({ availableOnly = false }: { availableOnly?: boolean }) {
  const [medium, setMedium] = useState<Medium | "all">("all");

  const pool = availableOnly ? artworks.filter((a) => a.available) : artworks;
  const shown = medium === "all" ? pool : pool.filter((a) => a.medium === medium);

  const options = [{ value: "all" as const, label: "Everything" }, ...mediums];

  return (
    <div>
      <div
        className="no-scrollbar -mx-6 flex gap-8 overflow-x-auto border-b border-chalk/10 px-6 sm:mx-0 sm:px-0"
        role="group"
        aria-label="Filter the wall by medium"
      >
        {options.map((option) => {
          const active = medium === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setMedium(option.value)}
              aria-pressed={active}
              className={cn(
                "u-label relative shrink-0 whitespace-nowrap py-5 transition-colors duration-300 hover:text-chalk",
                active && "!text-chalk"
              )}
            >
              {option.label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 bottom-[-1px] h-px origin-left bg-bone transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  active ? "scale-x-100" : "scale-x-0"
                )}
              />
            </button>
          );
        })}
      </div>

      <p className="u-micro mt-6 text-chalk/60" aria-live="polite">
        {shown.length} {shown.length === 1 ? "work" : "works"}
        {medium !== "all" && <> in {options.find((o) => o.value === medium)?.label.toLowerCase()}</>}
      </p>

      <div className="mt-20 sm:mt-28">
        {shown.length ? (
          <Wall key={medium} artworks={shown} priorityCount={2} />
        ) : (
          <p className="u-body py-16">
            Nothing in this medium is on the wall at the moment. New work
            arrives with each season.
          </p>
        )}
      </div>
    </div>
  );
}
