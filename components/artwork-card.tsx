import Link from "next/link";
import Image from "next/image";
import type { Artwork } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { WishlistButton } from "@/components/wishlist-button";

export function ArtworkCard({
  artwork,
  priority = false,
  reveal = false,
  index,
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw",
}: {
  artwork: Artwork;
  priority?: boolean;
  reveal?: boolean;
  index?: number;
  sizes?: string;
}) {
  return (
    <div
      className="artwork-card group relative"
      {...(reveal ? { "data-reveal": "" } : {})}
    >
      <Link href={`/gallery/${artwork.slug}`} className="block">
        <div className="artwork-frame relative aspect-[4/5]">
          <Image
            src={artwork.image.src}
            alt={artwork.image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
          {!artwork.available && (
            <span className="absolute left-3 top-3 bg-paper/90 px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-ink">
              Sold
            </span>
          )}
          {/* Hover reveal of title / medium / price on the image itself */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-ink/70 via-ink/30 to-transparent p-5 pt-14 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block">
            <p className="font-display text-lg text-paper">{artwork.title}</p>
            <p className="mt-0.5 text-xs tracking-wide text-paper/80">
              {artwork.mediumLabel} ·{" "}
              {artwork.available ? formatPrice(artwork.price) : "Sold"}
            </p>
          </div>
        </div>
        {/* Static caption (always visible on touch / mobile) */}
        <div className="mt-4 flex items-baseline justify-between gap-4 sm:group-hover:opacity-60 sm:transition-opacity sm:duration-500">
          <div>
            {index !== undefined && (
              <p className="mb-1 text-[0.625rem] tracking-[0.22em] text-graphite/60">
                {String(index + 1).padStart(2, "0")}
              </p>
            )}
            <p className="font-display text-lg leading-snug text-ink">
              {artwork.title}
            </p>
            <p className="mt-1 text-xs tracking-wide text-graphite">
              {artwork.mediumLabel}, {artwork.year}
            </p>
          </div>
          <p className="shrink-0 text-sm text-graphite">
            {artwork.available ? formatPrice(artwork.price) : "Sold"}
          </p>
        </div>
      </Link>
      <WishlistButton
        slug={artwork.slug}
        className="absolute right-2 top-2 z-10 bg-paper/80 backdrop-blur-sm"
      />
    </div>
  );
}
