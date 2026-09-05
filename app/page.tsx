import Image from "next/image";
import Link from "next/link";
import { artworks, latestArtworks, instagramPosts, site } from "@/lib/data";
import { Hero } from "@/components/hero";
import { Section, Shell, Eyebrow, RoomTitle } from "@/components/section";
import { Wall } from "@/components/wall";
import { Lit } from "@/components/light";
import { ArrowRight } from "@/components/brand/icons";

export default function HomePage() {
  const hero =
    artworks.find((a) => a.slug === "stillness-in-white") ?? artworks[0];
  const hung = artworks.filter((a) => a.slug !== hero.slug).slice(0, 7);

  return (
    <>
      <Hero artwork={hero} />

      {/* The wall proper */}
      <Section wide className="pt-28 sm:pt-40">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <RoomTitle eyebrow="The Wall" title="Hung at the size they are">
            Works are shown here at true relative scale, centres aligned on a
            single hang line — the way they would meet you in a room, rather
            than cropped to a matching grid.
          </RoomTitle>
          <Link
            href="/gallery"
            className="u-label link-hair inline-flex items-center gap-2 !text-chalk"
            data-lift="3"
          >
            The whole wall
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-28 sm:mt-36">
          <Wall artworks={hung} priorityCount={2} />
        </div>
      </Section>

      {/* The studio */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
          <div data-lift="0">
            <Lit className="aspect-[4/5] w-full">
              <Image
                src={site.aboutImages.portrait.src}
                alt={site.aboutImages.portrait.alt}
                fill
                sizes="(min-width: 64rem) 42vw, 92vw"
                className="object-cover"
              />
            </Lit>
          </div>
          <div>
            <Eyebrow data-lift="1">The Studio</Eyebrow>
            <h2 className="u-h2 mt-6 text-chalk" data-lift="2">
              She draws the light, and leaves the dark alone.
            </h2>
            <div className="u-body u-measure mt-8 space-y-5" data-lift="3">
              <p>
                Most drawing adds darkness to a white page. June works the
                other way: white chalk onto black canvas, so the canvas begins
                as night and every mark she makes is a mark of light.
              </p>
              <p>
                Alongside the chalk work are graphite, pencil, charcoal and
                ink — the quiet mediums, the ones that forgive nothing. Each
                piece is one of one, drawn by hand, and leaves the studio
                framed with its certificate.
              </p>
            </div>
            <Link
              href="/about"
              className="u-label link-hair mt-9 inline-flex items-center gap-2 !text-chalk"
              data-lift="4"
            >
              Inside the studio
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Commission — one line, no cards */}
      <section className="relative py-28 sm:py-44">
        <Shell>
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow data-lift="0">Commissions</Eyebrow>
            <p className="u-h1 mt-8 text-chalk" data-lift="1">
              The drawings that matter most are the ones that don’t exist yet.
            </p>
            <p className="u-body mx-auto mt-8 max-w-xl" data-lift="2">
              Portraits, wildlife, companions, places that are gone. A limited
              number of commissions are taken each season.
            </p>
            <div data-lift="3">
              <Link
                href="/commissions"
                className="u-label link-hair mt-10 inline-flex items-center gap-2 !text-chalk"
              >
                Begin a commission
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Shell>
      </section>

      {/* Recent work — a quiet strip, in the order it left the easel */}
      <Section wide>
        <RoomTitle eyebrow="Lately" title="Most recently off the easel" />
        <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          {latestArtworks.map((artwork, i) => (
            <li key={artwork.slug} data-lift={i}>
              <Link href={`/gallery/${artwork.slug}`} className="group block">
                <Lit className="aspect-[3/4] w-full">
                  <Image
                    src={artwork.image.src}
                    alt={artwork.image.alt}
                    fill
                    sizes="(min-width: 64rem) 15vw, (min-width: 40rem) 30vw, 45vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                  />
                </Lit>
                <p className="u-work mt-4 text-base text-chalk">{artwork.title}</p>
                <p className="u-micro text-chalk/60">{artwork.year}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Contact sheet — the studio diary, as a strip of film rather than a
          social grid */}
      <Section wide className="pt-0">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <RoomTitle eyebrow="Studio Diary" title="Contact sheet" />
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="u-label link-hair inline-flex items-center gap-2 !text-chalk"
            data-lift="3"
          >
            Follow the studio
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        {/* The scroller is focusable so the strip can be reached from the
            keyboard — its children are images, not links, so nothing inside
            would otherwise take focus. The list itself keeps list semantics. */}
        <div
          tabIndex={0}
          role="group"
          aria-label="Studio contact sheet — scroll for more frames"
          className="no-scrollbar mt-14 overflow-x-auto border-y border-chalk/10 py-3"
        >
        <ul className="flex snap-x snap-proximity gap-3">
          {instagramPosts.map((post, i) => (
            <li key={i} className="w-40 shrink-0 snap-start sm:w-52">
              <Lit className="aspect-square w-full">
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="13rem"
                  className="object-cover"
                />
              </Lit>
              <p className="u-micro mt-2 text-chalk/55 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </p>
            </li>
          ))}
        </ul>
        </div>
      </Section>
    </>
  );
}
