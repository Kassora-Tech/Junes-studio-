import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { journalPosts } from "@/lib/data";
import { Eyebrow } from "@/components/section";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from June's Studio — behind the scenes, works in progress, new collections and studio life.",
};

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function JournalPage() {
  const [latest, ...rest] = journalPosts;

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40 sm:pb-32">
      <div className="max-w-2xl">
        <Eyebrow>Notes from the Studio</Eyebrow>
        <h1 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">Journal</h1>
        <p className="mt-6 text-[0.9375rem] leading-relaxed text-graphite">
          Occasional writing on the work, the studio, and the slow business of
          drawing light — behind the scenes, works in progress, and new
          collections.
        </p>
      </div>

      {/* Featured latest post */}
      <Link
        href={`/journal/${latest.slug}`}
        className="artwork-card group mt-16 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16"
        data-reveal
      >
        <div className="artwork-frame relative aspect-[16/10]">
          <Image
            src={latest.image.src}
            alt={latest.image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow">{latest.category}</p>
          <h2 className="mt-4 text-3xl leading-[1.15] sm:text-4xl">{latest.title}</h2>
          <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-graphite">
            {latest.excerpt}
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-graphite">
            {dateFormat.format(new Date(latest.date))}
          </p>
        </div>
      </Link>

      {/* Grid */}
      <div className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/journal/${post.slug}`}
            className="artwork-card group block"
            data-reveal
          >
            <div className="artwork-frame relative aspect-[4/3]">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="eyebrow mt-5">{post.category}</p>
            <h2 className="mt-3 font-display text-xl leading-snug text-ink">
              {post.title}
            </h2>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-graphite">
              {post.excerpt}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-graphite">
              {dateFormat.format(new Date(post.date))}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
