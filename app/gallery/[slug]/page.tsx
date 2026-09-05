import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artworks, getArtwork } from "@/lib/data";
import { measure, hang } from "@/lib/wall";
import { formatPrice } from "@/lib/utils";
import { Lit } from "@/components/light";
import { SheetEdge } from "@/components/sheet-edge";
import { Shell, Eyebrow } from "@/components/section";
import { Work } from "@/components/wall";
import { NoteButton } from "@/components/note-button";
import { AcquireDialog } from "@/components/acquire-dialog";
import { ArrowLeft } from "@/components/brand/icons";

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
    description: `${artwork.title} — ${artwork.mediumLabel}, ${artwork.dimensions}, ${artwork.year}. ${artwork.available ? "Available." : "Sold."}`,
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

  const m = measure(artwork);
  const ratio = m.w / m.h;

  const related = artworks
    .filter((a) => a.slug !== artwork.slug && a.medium === artwork.medium)
    .concat(
      artworks.filter((a) => a.slug !== artwork.slug && a.medium !== artwork.medium)
    )
    .slice(0, 3);

  return (
    <div className="pt-32 sm:pt-40">
      <Shell wide>
        <Link
          href="/gallery"
          className="u-label link-hair inline-flex items-center gap-2 !text-chalk/60 hover:!text-chalk"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to the wall
        </Link>
      </Shell>

      {/* The work, at the shape it actually is */}
      <div className="mt-12 sm:mt-16">
        <Shell wide>
          <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-24">
            <div
              className="mx-auto w-full"
              style={{ maxWidth: `calc(76vh * ${ratio.toFixed(4)})` }}
              data-lift="0"
            >
              <Lit
                className="w-full"
                style={{ aspectRatio: `${m.w} / ${m.h}` }}
              >
                <Image
                  src={artwork.image.src}
                  alt={artwork.image.alt}
                  fill
                  priority
                  sizes="(min-width: 64rem) 55vw, 92vw"
                  className="object-cover"
                />
                <SheetEdge medium={artwork.medium} />
              </Lit>
            </div>

            {/* The label */}
            <div className="lg:sticky lg:top-32">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <Eyebrow>
                    {artwork.available ? "On the wall" : "From the record"}
                  </Eyebrow>
                  <h1 className="u-work mt-4 text-4xl text-chalk sm:text-5xl">
                    {artwork.title}
                  </h1>
                </div>
                <NoteButton
                  slug={artwork.slug}
                  title={artwork.title}
                  className="mt-2 shrink-0"
                />
              </div>

              <dl className="mt-10 space-y-2.5 border-t border-chalk/10 pt-8">
                {[
                  ["Medium", artwork.mediumLabel],
                  ["Dimensions", artwork.dimensions],
                  ["Year", String(artwork.year)],
                ].map(([term, value]) => (
                  <div key={term} className="flex gap-6">
                    <dt className="u-label w-28 shrink-0">{term}</dt>
                    <dd className="u-micro text-chalk/85">{value}</dd>
                  </div>
                ))}
                <div className="flex gap-6">
                  <dt className="u-label w-28 shrink-0">
                    {artwork.available ? "Price" : "Status"}
                  </dt>
                  <dd className="u-micro text-chalk/85">
                    {artwork.available ? (
                      formatPrice(artwork.price)
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        <span className="sold-dot" aria-hidden />
                        Sold
                      </span>
                    )}
                  </dd>
                </div>
              </dl>

              <p className="u-body u-measure mt-10">{artwork.description}</p>

              <div className="mt-10 border-t border-chalk/10 pt-8">
                {artwork.available ? (
                  <AcquireDialog artwork={artwork} />
                ) : (
                  <Link
                    href="/commissions"
                    className="u-label link-hair inline-flex items-center gap-2 !text-chalk"
                  >
                    Commission something like it
                  </Link>
                )}
              </div>

              <ul className="u-micro mt-10 space-y-2.5 text-chalk/55">
                <li>One of one. Never printed, never editioned.</li>
                <li>Signed Certificate of Authenticity included.</li>
                <li>Shipped insured and tracked worldwide, in a built crate.</li>
                <li>Fourteen days to live with it, and to change your mind.</li>
              </ul>
            </div>
          </div>
        </Shell>
      </div>

      {/* Detail shots — a contact sheet of the surface */}
      <Shell wide className="mt-28 sm:mt-40">
        <Eyebrow data-lift="0">The Surface</Eyebrow>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
          {artwork.details.map((detail, i) => (
            <li key={i} data-lift={i}>
              <Lit className="aspect-[4/3] w-full">
                <Image
                  src={detail.src}
                  alt={detail.alt}
                  fill
                  sizes="(min-width: 40rem) 30vw, 92vw"
                  className="object-cover"
                />
              </Lit>
            </li>
          ))}
        </ul>
      </Shell>

      {/* Continue along the wall */}
      <div className="mt-32 border-t border-chalk/10 pt-28 sm:mt-44 sm:pt-36">
        <Shell wide>
          <Eyebrow data-lift="0">Further along the wall</Eyebrow>
          <div className="mt-20">
            {hang(related, 340).map((row, r) => (
              <div className="wall-row" key={r}>
                {row.map((measured, i) => (
                  <Work
                    key={measured.artwork.slug}
                    measured={measured}
                    lift={i}
                  />
                ))}
              </div>
            ))}
          </div>
        </Shell>
      </div>
    </div>
  );
}
