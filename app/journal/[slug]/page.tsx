import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journalPosts, getJournalPost } from "@/lib/data";
import { Shell, Eyebrow } from "@/components/section";
import { Lit } from "@/components/light";
import { ArrowLeft } from "@/components/brand/icons";

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

const when = new Intl.DateTimeFormat("en-GB", {
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
      <Shell>
        <Link
          href="/journal"
          className="u-label link-hair inline-flex items-center gap-2 !text-chalk/60 hover:!text-chalk"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All entries
        </Link>

        <div className="mt-14 max-w-3xl">
          <Eyebrow>{post.category}</Eyebrow>
          <h1 className="u-h1 mt-6 text-chalk">{post.title}</h1>
          <p className="u-label mt-8">{when.format(new Date(post.date))}</p>
        </div>
      </Shell>

      <div className="mt-16 px-6 sm:px-10">
        <Lit className="mx-auto aspect-[16/9] w-full max-w-[76rem]">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            priority
            sizes="(min-width: 76rem) 76rem, 92vw"
            className="object-cover"
          />
        </Lit>
      </div>

      <Shell className="!max-w-[46rem]">
        <div className="py-20 sm:py-28">
          {post.body.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "u-h3 !font-normal text-chalk"
                  : "u-body mt-7 text-[1.0625rem] leading-[1.85]"
              }
            >
              {paragraph}
            </p>
          ))}
          <p className="u-work mt-16 border-t border-chalk/10 pt-10 text-xl text-chalk">
            June
          </p>
        </div>
      </Shell>

      <div className="border-t border-chalk/10 py-24 sm:py-32">
        <Shell wide>
          <Eyebrow data-lift="0">Keep reading</Eyebrow>
          <ul className="mt-14 grid gap-14 sm:grid-cols-2">
            {others.map((p, i) => (
              <li key={p.slug} data-lift={i}>
                <Link href={`/journal/${p.slug}`} className="group block">
                  <Lit className="aspect-[16/9] w-full">
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      fill
                      sizes="(min-width: 40rem) 45vw, 92vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                    />
                  </Lit>
                  <p className="u-label mt-6">{p.category}</p>
                  <h2 className="u-h3 mt-3 text-chalk">{p.title}</h2>
                </Link>
              </li>
            ))}
          </ul>
        </Shell>
      </div>
    </article>
  );
}
