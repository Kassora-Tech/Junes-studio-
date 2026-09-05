/**
 * The edge of the substrate, drawn honestly.
 *
 * Works on paper get a deckle — the soft irregular edge a sheet of handmade
 * cotton paper actually has. Chalk on stretched canvas gets a true straight
 * edge, because canvas has one. The site renders what the work is made on.
 */

import type { Medium } from "@/lib/data";

const DECKLE =
  "M0.7 0.7C14 0.2 27 1.3 40 0.6C54 -0.1 72 1.4 85 0.5C91 0.1 96 1.1 99.3 0.7" +
  "C99.8 13 98.7 27 99.4 40C100 54 98.6 72 99.3 85C99.7 91 98.8 96 99.3 99.3" +
  "C86 99.8 73 98.7 60 99.4C46 100.1 28 98.6 15 99.3C9 99.7 4 98.9 0.7 99.3" +
  "C0.2 86 1.3 73 0.6 60C-0.1 46 1.4 28 0.5 15C0.1 9 1.1 4 0.7 0.7Z";

export function SheetEdge({ medium }: { medium: Medium }) {
  const onPaper = medium !== "chalk";

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full text-chalk"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
    >
      <path
        d={onPaper ? DECKLE : "M0.5 0.5h99v99h-99z"}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        opacity={onPaper ? 0.22 : 0.16}
      />
    </svg>
  );
}
