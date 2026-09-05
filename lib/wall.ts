import type { Artwork } from "@/lib/data";

/**
 * Wall mathematics.
 *
 * A gallery does not hang work in a grid of identical boxes. It hangs work at
 * the size it actually is, on a shared centre line. These helpers read the
 * real dimensions already recorded against each piece and turn them into the
 * numbers the wall needs, so a 110 x 160cm canvas genuinely dominates a
 * 40 x 50cm study instead of being cropped to match it.
 */

export interface Measured {
  artwork: Artwork;
  /** width in centimetres */
  w: number;
  /** height in centimetres */
  h: number;
}

const FALLBACK = { w: 60, h: 75 };

/** Parse "110 × 160 cm" into centimetres. */
export function measure(artwork: Artwork): Measured {
  const m = artwork.dimensions.match(/([\d.]+)\s*[×x]\s*([\d.]+)/);
  const w = m ? parseFloat(m[1]) : FALLBACK.w;
  const h = m ? parseFloat(m[2]) : FALLBACK.h;
  return { artwork, w: w || FALLBACK.w, h: h || FALLBACK.h };
}

/**
 * Break a run of works into rows that fit a wall `rowCm` centimetres wide,
 * leaving `gapCm` of wall between neighbours. Deterministic, so the server and
 * the client always agree and nothing shifts on hydration.
 *
 * Rows are allowed to come up short — a real wall does not justify.
 */
export function hang(
  artworks: Artwork[],
  rowCm = 340,
  gapCm = 26
): Measured[][] {
  const rows: Measured[][] = [];
  let row: Measured[] = [];
  let used = 0;

  for (const artwork of artworks) {
    const m = measure(artwork);
    const needs = row.length ? used + gapCm + m.w : m.w;
    if (row.length && needs > rowCm) {
      rows.push(row);
      row = [m];
      used = m.w;
    } else {
      row.push(m);
      used = needs;
    }
  }
  if (row.length) rows.push(row);
  return rows;
}

/** CSS custom properties that drive true-scale sizing for one work. */
export function wallVars(m: Measured): React.CSSProperties {
  return {
    ["--cm-w" as string]: String(m.w),
    ["--cm-h" as string]: String(m.h),
  };
}
