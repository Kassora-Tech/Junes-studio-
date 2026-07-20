import Image from "next/image";
import Link from "next/link";
import {
  artworks,
  featuredArtworks,
  latestArtworks,
  instagramPosts,
  testimonials,
  site,
} from "@/lib/data";
import { Hero } from "@/components/hero";
import { Section, SectionHeading, Eyebrow } from "@/components/section";
import { ArtworkCard } from "@/components/artwork-card";
import { NewsletterForm } from "@/components/newsletter-form";

export default function HomePage() {
  const hero = artworks.find((a) => a.slug === "stillness-in-white") ?? artworks[0];
  const featured = featuredArtworks.filter((a) => a.slug !== hero.slug).slice(0, 5);

  return (
    <>
      <Hero artwork={hero} />

      {/* Featured Originals */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Available Originals"
            title="Works currently in the studio"
          />
          <Link
            href="/originals"
            data-reveal
            className="border-b border-ink pb-1 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-60"
          >
            All Originals
          </Link>
        </div>
        <div
          className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
          data-reveal-group
        >
          {featured.map((artwork, i) => (
            <ArtworkCard key={artwork.slug} artwork={artwork} reveal priority={i < 3} />
          ))}
        </div>
      </Section>

      {/* Artist introduction */}
      <Section tone="ivory">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden" data-reveal>
            <Image
              src={site.aboutImages.portrait.src}
              alt={site.aboutImages.portrait.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div data-reveal-group>
            <div data-reveal>
              <Eyebrow>The Artist</Eyebrow>
            </div>
            <h2 className="mt-4 text-3xl leading-[1.12] sm:text-4xl" data-reveal>
              A decade of drawing in the dark
            </h2>
            <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-graphite" data-reveal>
              June works alone in a converted grain store with one north-facing
              window, in the mediums that forgive the least — chalk, charcoal,
              graphite and ink. Her signature works reverse the drawing itself:
              white chalk on black canvas, so that every mark is a mark of
              light.
            </p>
            <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-graphite" data-reveal>
              Each original leaves the studio framed behind museum glass, with
              a signed Certificate of Authenticity.
            </p>
            <Link
              href="/about"
              data-reveal
              className="mt-8 inline-block border-b border-ink pb-1 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-60"
            >
              About June
            </Link>
          </div>
        </div>
      </Section>

      {/* Latest collection strip */}
      <Section>
        <SectionHeading eyebrow="Latest Collection" title="Recent works, hung in order" />
        <div
          className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
          data-reveal-group
        >
          {latestArtworks.map((artwork) => (
            <Link
              key={artwork.slug}
              href={`/gallery/${artwork.slug}`}
              className="artwork-card group block"
              data-reveal
            >
              <div className="artwork-frame relative aspect-[3/4]">
                <Image
                  src={artwork.image.src}
                  alt={artwork.image.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-display text-base leading-snug text-ink">
                {artwork.title}
              </p>
              <p className="mt-0.5 text-xs text-graphite">{artwork.year}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Commission teaser */}
      <Section tone="ink" className="text-center">
        <div className="mx-auto max-w-2xl" data-reveal-group>
          <div data-reveal>
            <Eyebrow className="!text-stone">Commissions</Eyebrow>
          </div>
          <h2 className="mt-4 text-3xl leading-[1.15] sm:text-4xl lg:text-[2.75rem]" data-reveal>
            The most important drawings are the ones that don’t exist yet.
          </h2>
          <p className="mt-6 text-[0.9375rem] leading-relaxed text-stone" data-reveal>
            Portraits, wildlife, companions, places that matter. A limited
            number of commissions are taken each season.
          </p>
          <div data-reveal>
            <Link
              href="/commissions"
              className="mt-10 inline-flex items-center border border-paper/70 px-7 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
            >
              Begin a Commission
            </Link>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section tone="ivory">
        <SectionHeading eyebrow="From Collectors" title="Words sent back to the studio" />
        <div className="mt-14 grid gap-10 lg:grid-cols-3" data-reveal-group>
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col" data-reveal>
              <blockquote className="font-display text-lg leading-relaxed text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-stone pt-4 text-xs tracking-wide text-graphite">
                <span className="font-medium text-ink">{t.name}</span> · {t.context}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Newsletter */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="The Studio Letter"
            title="First viewing of every new original"
          />
          <div data-reveal>
            <p className="mb-6 max-w-md text-[0.9375rem] leading-relaxed text-graphite">
              Collectors on the list see new work before it reaches the
              gallery, along with occasional letters from the studio. A few a
              year — nothing more.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </Section>

      {/* Instagram */}
      <Section className="pt-0">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Studio Diary" title="@junes.studio" />
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            data-reveal
            className="border-b border-ink pb-1 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-60"
          >
            Follow Along
          </a>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6" data-reveal-group>
          {instagramPosts.map((post, i) => (
            <a
              key={i}
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="artwork-card group block"
              data-reveal
            >
              <div className="artwork-frame relative aspect-square">
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 1024px) 15vw, 33vw"
                  className="object-cover"
                />
              </div>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
