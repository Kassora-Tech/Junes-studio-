import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journalPosts, getJournalPost } from "@/lib/data";
import { Eyebrow } from "@/components/section";

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.image.src] },
  };
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const others = journalPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="pt-32 sm:pt-40">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Link
          href="/journal"
          className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-graphite transition-colors hover:text-ink"
        >
          ← All Journal Entries
        </Link>
        <div className="mt-10">
          <Eyebrow>{post.category}</Eyebrow>
          <h1 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">{post.title}</h1>
          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-graphite">
            {dateFormat.format(new Date(post.date))}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-5xl px-5 sm:px-8">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 60rem, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="space-y-6">
          {post.body.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-display text-xl leading-relaxed text-ink"
                  : "text-[0.9375rem] leading-[1.85] text-graphite"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-14 border-t border-stone pt-8 font-display text-lg text-ink">
          — June
        </p>
      </div>

      <div className="border-t border-stone bg-ivory">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Eyebrow>Keep Reading</Eyebrow>
          <div className="mt-10 grid gap-12 sm:grid-cols-2">
            {others.map((p) => (
              <Link key={p.slug} href={`/journal/${p.slug}`} className="artwork-card group block">
                <div className="artwork-frame relative aspect-[16/9]">
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    fill
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="eyebrow mt-5">{p.category}</p>
                <h2 className="mt-2 font-display text-xl leading-snug text-ink">{p.title}</h2>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
