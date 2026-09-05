import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/lib/data";
import { hang, wallVars, type Measured } from "@/lib/wall";
import { Lit } from "@/components/light";
import { SheetEdge } from "@/components/sheet-edge";
import { WorkLabel } from "@/components/work-label";

/**
 * A hung wall.
 *
 * Works sit at true relative scale, taken from the dimensions recorded against
 * each piece, and their centres align on a single hang line — the way work is
 * actually hung, and the opposite of a grid of identical cards. A row is
 * allowed to come up short; real walls are not justified.
 */

export function Work({
  measured,
  priority = false,
  lift,
}: {
  measured: Measured;
  priority?: boolean;
  lift?: number;
}) {
  const { artwork } = measured;

  return (
    <div
      className="wall-work"
      style={wallVars(measured)}
      data-lift={lift ?? 0}
    >
      <Link
        href={`/gallery/${artwork.slug}`}
        className="group block focus-visible:outline-offset-8"
      >
        <Lit className="w-full">
          <Image
            src={artwork.image.src}
            alt={artwork.image.alt}
            fill
            priority={priority}
            sizes="(min-width: 64rem) 34vw, (min-width: 48rem) 45vw, 92vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
          />
          <SheetEdge medium={artwork.medium} />
        </Lit>
      </Link>
      <WorkLabel artwork={artwork} />
    </div>
  );
}

export function Wall({
  artworks,
  rowCm = 340,
  priorityCount = 0,
}: {
  artworks: Artwork[];
  rowCm?: number;
  priorityCount?: number;
}) {
  const rows = hang(artworks, rowCm);
  let index = 0;

  return (
    <div className="flex flex-col gap-24 sm:gap-32">
      {rows.map((row, r) => (
        <div className="wall-row" key={r}>
          {row.map((measured, i) => {
            const n = index++;
            return (
              <Work
                key={measured.artwork.slug}
                measured={measured}
                priority={n < priorityCount}
                lift={i}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
