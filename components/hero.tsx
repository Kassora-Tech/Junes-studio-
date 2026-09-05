import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/lib/data";
import { Lit } from "@/components/light";
import { ArrowRight } from "@/components/brand/icons";
import { formatPrice } from "@/lib/utils";

/**
 * The first room.
 *
 * Not a banner with an image behind it — a single work, hung, with its label,
 * lit by the same moving light that lights everything else. The visitor
 * arrives in front of a drawing rather than in front of a shop.
 */
export function Hero({ artwork }: { artwork: Artwork }) {
  return (
    <section className="relative min-h-[100svh] w-full">
      {/* inset-0 gives this its size; an added h-full would resolve against a
          min-height-only parent and collapse it to nothing */}
      <Lit className="absolute inset-0">
        <Image
          src={artwork.image.src}
          alt={artwork.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </Lit>

      <div className="relative z-[4] flex min-h-[100svh] flex-col justify-between px-6 pb-10 pt-32 sm:px-10 sm:pb-14 sm:pt-40">
        <div className="mx-auto w-full max-w-[100rem]">
          <h1 className="u-display max-w-[16ch] text-chalk" data-lift="0">
            Every mark is a mark of light.
          </h1>
        </div>

        <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          {/* The hung work's own label, exactly as it would appear on the wall */}
          <div data-lift="1">
            <p className="u-label">On the wall</p>
            <h2 className="u-work mt-3 text-2xl text-chalk sm:text-3xl">
              {artwork.title}
            </h2>
            <p className="u-micro mt-1.5">
              {artwork.mediumLabel}, {artwork.year}
            </p>
            <p className="u-micro text-chalk/60">
              {artwork.dimensions}
              {artwork.available && <> · {formatPrice(artwork.price)}</>}
            </p>
            <Link
              href={`/gallery/${artwork.slug}`}
              className="u-label link-hair mt-5 inline-flex items-center gap-2 !text-chalk"
            >
              See this work
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Teach the interaction once, quietly, in the language of the room */}
          <p className="u-label max-w-[20ch] sm:text-right">
            <span className="hidden lg:inline">
              Move the light across the work
            </span>
            <span className="lg:hidden">Scroll — the light stays still</span>
          </p>
        </div>
      </div>
    </section>
  );
}
