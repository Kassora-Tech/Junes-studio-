import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/data";
import { Shell, Section, Eyebrow } from "@/components/section";
import { Lit } from "@/components/light";
import { ArrowRight } from "@/components/brand/icons";

/**
 * PLACEHOLDER BIOGRAPHY.
 *
 * The voice and structure here are written to be replaced by June's own
 * words. Deliberately absent: any claim that could not be checked — no
 * collection lists, no years-in-practice, no exhibition history, no waiting
 * list length. Those belong to her to state, not to a demo to invent.
 */
export const metadata: Metadata = {
  title: "The Studio",
  description:
    "How the work is made — white chalk on black canvas, graphite, charcoal and ink, drawn by hand in a north-lit studio.",
};

export default function AboutPage() {
  return (
    <div className="pt-40 sm:pt-52">
      <Shell wide>
        <div className="max-w-4xl">
          <Eyebrow data-lift="0">The Studio</Eyebrow>
          <h1 className="u-h1 mt-6 text-chalk" data-lift="1">
            She draws the way other people keep silence.
          </h1>
        </div>
      </Shell>

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div data-lift="0">
            <Lit className="aspect-[4/5] w-full">
              <Image
                src={site.aboutImages.portrait.src}
                alt={site.aboutImages.portrait.alt}
                fill
                priority
                sizes="(min-width: 64rem) 44vw, 92vw"
                className="object-cover"
              />
            </Lit>
          </div>
          <div>
            <Eyebrow data-lift="1">Reversal</Eyebrow>
            <h2 className="u-h2 mt-6 text-chalk" data-lift="2">
              The dark is most of the drawing
            </h2>
            <div className="u-body u-measure mt-8 space-y-5" data-lift="3">
              <p>
                Most drawing begins with darkness added to light — pencil onto
                white paper, shadow by shadow, until an image arrives. June’s
                signature work reverses it. The canvas begins as night, and
                every mark she makes is a mark of light.
              </p>
              <p>
                It sounds like a small technical inversion. It is not. Drawing
                the light instead of the shadow stops you describing objects
                and starts you describing how they are seen. A face becomes a
                cheekbone catching a window, a bright line along a jaw.
                Everything unnecessary simply stays black.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div className="lg:order-2" data-lift="0">
            <Lit className="aspect-[4/5] w-full">
              <Image
                src={site.aboutImages.hands.src}
                alt={site.aboutImages.hands.alt}
                fill
                sizes="(min-width: 64rem) 44vw, 92vw"
                className="object-cover"
              />
            </Lit>
          </div>
          <div className="lg:order-1">
            <Eyebrow data-lift="1">Method</Eyebrow>
            <h2 className="u-h2 mt-6 text-chalk" data-lift="2">
              Chalk cannot be taken back
            </h2>
            <div className="u-body u-measure mt-8 space-y-5" data-lift="3">
              <p>
                Every piece begins with looking, usually for far longer than
                the drawing itself takes. Chalk lifted from canvas leaves a
                ghost, so each mark has to be decided before it is made. The
                large works are drawn standing, at arm’s length, in whole-arm
                movements, over weeks of layering.
              </p>
              <p>
                The studio has one large north-facing window. North light does
                not change its mind through the day, which makes it the only
                honest collaborator a monochrome artist can have.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* A full-bleed breath, lit like everything else */}
      <div className="px-6 sm:px-10" data-lift="0">
        <Lit className="mx-auto h-[62vh] min-h-[22rem] w-full max-w-[100rem]">
          <Image
            src={site.aboutImages.studioWide.src}
            alt={site.aboutImages.studioWide.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Lit>
      </div>

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div data-lift="0">
            <Lit className="aspect-square w-full">
              <Image
                src={site.aboutImages.tools.src}
                alt={site.aboutImages.tools.alt}
                fill
                sizes="(min-width: 64rem) 44vw, 92vw"
                className="object-cover"
              />
            </Lit>
          </div>
          <div>
            <Eyebrow data-lift="1">What Leaves</Eyebrow>
            <h2 className="u-h2 mt-6 text-chalk" data-lift="2">
              One of one, and then it is gone
            </h2>
            <div className="u-body u-measure mt-8 space-y-5" data-lift="3">
              <p>
                Nothing here is printed and nothing is editioned. Each drawing
                exists once. When a piece goes it stays on the wall as a
                record, marked with the gallery’s own dot, because the work
                that has left is part of the story of the work that remains.
              </p>
              <p>
                Every original is framed where its medium requires it, signed,
                certified, and crated by hand before it travels.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-8" data-lift="4">
              <Link
                href="/gallery"
                className="u-label link-hair inline-flex items-center gap-2 !text-chalk"
              >
                See the wall
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/commissions"
                className="u-label link-hair inline-flex items-center gap-2 !text-chalk"
              >
                Commission a piece
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
