import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { journalPosts } from "@/lib/data";
import { Shell, Eyebrow } from "@/components/section";
import { Lit } from "@/components/light";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from June's Studio — behind the scenes, work in progress, new collections and studio life.",
};

const when = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function JournalPage() {
  const [latest, ...rest] = journalPosts;

  return (
    <div className="pb-32 pt-40 sm:pb-44 sm:pt-52">
      <Shell wide>
        <div className="max-w-3xl">
          <Eyebrow data-lift="0">Notes from the Studio</Eyebrow>
          <h1 className="u-h1 mt-6 text-chalk" data-lift="1">
            Journal
          </h1>
          <p className="u-lede u-measure mt-8" data-lift="2">
            Occasional writing on the work, the room it is made in, and the
            slow business of drawing light.
          </p>
        </div>

        {/* The latest entry, given the room it deserves */}
        <Link
          href={`/journal/${latest.slug}`}
          className="group mt-24 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20"
          data-lift="0"
        >
          <Lit className="aspect-[16/10] w-full">
            <Image
              src={latest.image.src}
              alt={latest.image.alt}
              fill
              priority
              sizes="(min-width: 64rem) 55vw, 92vw"
              className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
            />
          </Lit>
          <div>
            <p className="u-label">{latest.category}</p>
            <h2 className="u-h2 mt-5 text-chalk">{latest.title}</h2>
            <p className="u-body u-measure mt-6">{latest.excerpt}</p>
            <p className="u-label mt-8">{when.format(new Date(latest.date))}</p>
          </div>
        </Link>

        <ul className="mt-28 grid gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <li key={post.slug} data-lift={i}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <Lit className="aspect-[4/3] w-full">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 92vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                  />
                </Lit>
                <p className="u-label mt-6">{post.category}</p>
                <h2 className="u-h3 mt-3 text-chalk">{post.title}</h2>
                <p className="u-micro mt-3">{post.excerpt}</p>
                <p className="u-label mt-5 text-chalk/60">
                  {when.format(new Date(post.date))}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Shell>
    </div>
  );
}
