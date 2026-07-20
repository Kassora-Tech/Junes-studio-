import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/data";
import { Eyebrow, Section } from "@/components/section";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of June — a fine artist working in white chalk on black canvas, graphite, pencil, charcoal and ink, in a converted grain-store studio.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 sm:pt-40">
      {/* Intro */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Eyebrow>The Artist</Eyebrow>
          <h1 className="mt-4 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            June draws the way other people keep silence.
          </h1>
        </div>
      </div>

      {/* Editorial alternating layout */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="relative aspect-[4/5] overflow-hidden" data-reveal>
            <Image
              src={site.aboutImages.portrait.src}
              alt={site.aboutImages.portrait.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="max-w-lg" data-reveal-group>
            <h2 className="text-3xl leading-[1.15] sm:text-4xl" data-reveal>
              The beginning
            </h2>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-graphite" data-reveal>
              June trained as a printmaker, spent six years illustrating other
              people’s ideas, and one October evening ran out of white paper.
              The only surface left in the studio was a scrap of black mounting
              board and a stick of chalk. The drawing that happened that
              night — a window, lit from inside — changed the direction of
              everything that followed.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-graphite" data-reveal>
              Ten years later, white chalk on black canvas remains the centre of
              the studio’s work, alongside graphite, pencil, charcoal and ink —
              the quiet mediums, the ones that forgive nothing and therefore
              mean everything.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="ivory">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="max-w-lg lg:order-1" data-reveal-group>
            <h2 className="text-3xl leading-[1.15] sm:text-4xl" data-reveal>
              The process
            </h2>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-graphite" data-reveal>
              Every piece begins with looking — usually for far longer than the
              drawing itself takes. Chalk cannot be erased from canvas without
              leaving a ghost, so each mark is decided before it is made. The
              large works are drawn standing, at arm’s length, over weeks of
              slow layering.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-graphite" data-reveal>
              The studio is a converted grain store with a single, enormous
              north-facing window. North light doesn’t change its mind during
              the day, which makes it the only honest collaborator a
              monochrome artist can have.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden lg:order-2" data-reveal>
            <Image
              src={site.aboutImages.hands.src}
              alt={site.aboutImages.hands.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Full-bleed studio image */}
      <div className="relative h-[60vh] min-h-[400px]" data-reveal>
        <Image
          src={site.aboutImages.studioWide.src}
          alt={site.aboutImages.studioWide.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="relative aspect-square overflow-hidden" data-reveal>
            <Image
              src={site.aboutImages.tools.src}
              alt={site.aboutImages.tools.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-lg" data-reveal-group>
            <h2 className="text-3xl leading-[1.15] sm:text-4xl" data-reveal>
              The work
            </h2>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-graphite" data-reveal>
              The finished pieces live in collections across Ireland, the UK,
              Europe and North America — reading rooms, hallways, one
              lighthouse. Commissioned portraits, especially of animals, have
              become the studio’s most personal work: drawings made for people
              who understand that time is finite and love is not.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-graphite" data-reveal>
              Every original leaves the studio framed, certified, and crated by
              hand. Nothing is rushed. Nothing is printed. Everything is
              drawn.
            </p>
            <div className="mt-8 flex flex-wrap gap-4" data-reveal>
              <Link
                href="/gallery"
                className="inline-flex items-center bg-ink px-7 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:bg-graphite"
              >
                View the Collection
              </Link>
              <Link
                href="/commissions"
                className="inline-flex items-center border border-ink px-7 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                Commissions
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
