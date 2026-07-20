import type { Metadata } from "next";
import Image from "next/image";
import { commissionCategories, commissionSteps } from "@/lib/data";
import { Eyebrow, Section, SectionHeading } from "@/components/section";
import { CommissionForm } from "@/components/commission-form";

export const metadata: Metadata = {
  title: "Commissions",
  description:
    "Commission an original drawing from June's Studio — portraits, wildlife, pets and custom artwork in chalk, charcoal, graphite and ink.",
};

export default function CommissionsPage() {
  return (
    <div className="pt-32 sm:pt-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Eyebrow>Commissions</Eyebrow>
          <h1 className="mt-4 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            A drawing made only for you
          </h1>
          <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-graphite">
            Some of the studio’s most meaningful work begins with a
            photograph and a story. June takes on a limited number of
            commissions each season — portraits, animals, and the places
            people carry with them — so that every piece receives the time it
            deserves.
          </p>
        </div>
      </div>

      {/* Process */}
      <Section>
        <SectionHeading eyebrow="The Process" title="From first note to final piece" />
        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-5" data-reveal-group>
          {commissionSteps.map((step, i) => (
            <li key={step.title} data-reveal>
              <span className="font-display text-4xl text-stone">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl text-ink">{step.title}</h3>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-graphite">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Categories */}
      <Section tone="ivory">
        <SectionHeading eyebrow="What Can Be Drawn" title="Commission categories" />
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
          {commissionCategories.map((cat) => (
            <div key={cat.id} className="artwork-card group" data-reveal>
              <div className="artwork-frame relative aspect-[4/5]">
                <Image
                  src={cat.image.src}
                  alt={cat.image.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 font-display text-xl text-ink">{cat.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-graphite">
                {cat.description}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-graphite">
                {cat.startingPrice}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Inquiry form */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <SectionHeading eyebrow="Begin" title="Commission inquiry" />
          <p className="mt-6 text-[0.9375rem] leading-relaxed text-graphite" data-reveal>
            Share what you have in mind. There is no obligation at this stage —
            the first step is only a conversation.
          </p>
          <div className="mt-12" data-reveal>
            <CommissionForm />
          </div>
        </div>
      </Section>
    </div>
  );
}
