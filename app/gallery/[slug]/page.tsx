import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artworks, getArtwork } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { AcquireDialog } from "@/components/acquire-dialog";
import { WishlistButton } from "@/components/wishlist-button";
import { Eyebrow } from "@/components/section";
import { ArtworkCard } from "@/components/artwork-card";

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getArtwork(slug);
  if (!artwork) return {};
  return {
    title: artwork.title,
    description: `${artwork.title} — ${artwork.mediumLabel}, ${artwork.dimensions}, ${artwork.year}. ${artwork.available ? "Available for acquisition." : "Sold."}`,
    openGraph: { images: [artwork.image.src] },
  };
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = getArtwork(slug);
  if (!artwork) notFound();

  const related = artworks
    .filter((a) => a.slug !== artwork.slug && a.medium === artwork.medium)
    .concat(artworks.filter((a) => a.slug !== artwork.slug && a.medium !== artwork.medium))
    .slice(0, 3);

  return (
    <div className="pt-16 sm:pt-20">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
        <Link
          href="/gallery"
          className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-graphite transition-colors hover:text-ink"
        >
          ← Back to Gallery
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          {/* Images */}
          <div className="space-y-4 sm:space-y-6">
            <div className="artwork-frame relative aspect-[4/5]">
              <Image
                src={artwork.image.src}
                alt={artwork.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              {!artwork.available && (
                <span className="absolute left-4 top-4 bg-paper/90 px-3 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-ink">
                  Sold
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {artwork.details.map((detail, i) => (
                <div key={i} className="artwork-frame relative aspect-square">
                  <Image
                    src={detail.src}
                    alt={detail.alt}
                    fill
                    sizes="(min-width: 1024px) 27vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-start justify-between gap-6">
              <div>
                <Eyebrow>{artwork.available ? "Available Original" : "From the Archive"}</Eyebrow>
                <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">
                  {artwork.title}
                </h1>
              </div>
              <WishlistButton slug={artwork.slug} className="mt-1 shrink-0" />
            </div>

            <dl className="mt-8 space-y-3 border-y border-stone py-6 text-sm">
              {[
                ["Medium", artwork.mediumLabel],
                ["Dimensions", artwork.dimensions],
                ["Year", String(artwork.year)],
                ["Availability", artwork.available ? "Available" : "Sold"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-6">
                  <dt className="text-graphite">{label}</dt>
                  <dd className="text-right text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-[0.9375rem] leading-relaxed text-graphite">
              {artwork.description}
            </p>

            <p className="mt-8 font-display text-3xl text-ink">
              {artwork.available ? formatPrice(artwork.price) : "Sold"}
            </p>

            <div className="mt-8">
              {artwork.available ? (
                <AcquireDialog artwork={artwork} />
              ) : (
                <Link
                  href="/commissions"
                  className="inline-flex w-full items-center justify-center border border-ink px-7 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper sm:w-auto"
                >
                  Commission a Similar Piece
                </Link>
              )}
            </div>

            <ul className="mt-10 space-y-3 text-[0.8125rem] leading-relaxed text-graphite">
              <li className="flex gap-3">
                <span aria-hidden>—</span> Certificate of Authenticity included,
                signed and numbered.
              </li>
              <li className="flex gap-3">
                <span aria-hidden>—</span> Shipped insured and tracked,
                worldwide, in a custom-built crate.
              </li>
              <li className="flex gap-3">
                <span aria-hidden>—</span> Chalk works arrive framed behind 99%
                UV museum glass.
              </li>
              <li className="flex gap-3">
                <span aria-hidden>—</span> 14-day returns on gallery
                originals.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related works */}
      <div className="border-t border-stone bg-ivory">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Eyebrow>Continue Viewing</Eyebrow>
          <h2 className="mt-4 text-3xl">Related works</h2>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArtworkCard key={a.slug} artwork={a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
