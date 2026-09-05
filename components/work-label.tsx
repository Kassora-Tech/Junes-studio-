import type { Artwork } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { NoteButton } from "@/components/note-button";

/**
 * The wall label.
 *
 * Set the way a museum sets one: the work in italic, then medium and date,
 * then dimensions, then — quietly, last, at the same size as everything else —
 * what it costs. A sold piece carries the gallery's own mark, a coloured dot,
 * which reads as a record of what has gone rather than as an error.
 */
export function WorkLabel({
  artwork,
  size = "sm",
  note = true,
}: {
  artwork: Artwork;
  size?: "sm" | "lg";
  note?: boolean;
}) {
  const lg = size === "lg";

  return (
    <div className={`flex items-start justify-between gap-4 ${lg ? "mt-0" : "mt-5"}`}>
      <div className="min-w-0">
        {/* h2, not h3: a wall sits directly beneath the page title on the
            gallery pages, and skipping a level there is a real navigation
            failure for anyone moving by headings. */}
        <h2 className={`u-work text-chalk ${lg ? "text-3xl sm:text-4xl" : "text-lg"}`}>
          {artwork.title}
        </h2>
        <p className={`u-micro mt-1.5 ${lg ? "text-sm" : ""}`}>
          {artwork.mediumLabel}, {artwork.year}
        </p>
        <p className={`u-micro text-chalk/60 ${lg ? "text-sm" : ""}`}>
          {artwork.dimensions}
        </p>
        <p className={`u-micro mt-2 ${lg ? "text-sm" : ""}`}>
          {artwork.available ? (
            <span className="text-chalk/80">{formatPrice(artwork.price)}</span>
          ) : (
            <span className="inline-flex items-center gap-2 text-chalk/55">
              <span className="sold-dot" aria-hidden />
              Sold
            </span>
          )}
        </p>
      </div>
      {note && (
        <NoteButton slug={artwork.slug} title={artwork.title} className="mt-1 shrink-0" />
      )}
    </div>
  );
}
