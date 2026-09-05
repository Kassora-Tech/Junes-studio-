import type { Metadata } from "next";
import Image from "next/image";
import { commissionCategories, commissionSteps } from "@/lib/data";
import { Shell, Section, Eyebrow, RoomTitle } from "@/components/section";
import { Lit } from "@/components/light";
import { CommissionForm } from "@/components/commission-form";

export const metadata: Metadata = {
  title: "Commissions",
  description:
    "Commission an original drawing from June's Studio — portraits, wildlife, companions and custom work in chalk, charcoal, graphite and ink.",
};

// Hung at deliberately unequal heights so the row reads as a wall, not as a
// set of matching cards.
const heights = ["4 / 5", "3 / 4", "5 / 6", "2 / 3"];

export default function CommissionsPage() {
  return (
    <div className="pt-40 sm:pt-52">
      <Shell wide>
        <div className="max-w-4xl">
          <Eyebrow data-lift="0">Commissions</Eyebrow>
          <h1 className="u-h1 mt-6 text-chalk" data-lift="1">
            A drawing that exists only because you asked for it.
          </h1>
          <p className="u-lede u-measure mt-8" data-lift="2">
            Some of the studio’s most meaningful work begins with a photograph
            and a story — someone, or something, that mattered. A limited
            number of commissions are taken each season.
          </p>
        </div>
      </Shell>

      {/* The process — a sequence, set as one */}
      <Section>
        <RoomTitle eyebrow="The Process" title="From a first note to a hung piece" />
        <ol className="mt-16 border-t border-chalk/10">
          {commissionSteps.map((step, i) => (
            <li
              key={step.title}
              className="grid gap-4 border-b border-chalk/10 py-9 sm:grid-cols-[5rem_14rem_1fr] sm:items-baseline sm:gap-10"
              data-lift={i}
            >
              <span className="u-label tabular-nums text-bone">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="u-h3 text-chalk">{step.title}</h3>
              <p className="u-body u-measure">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* What can be drawn */}
      <Section wide>
        <RoomTitle eyebrow="Subjects" title="What can be drawn" />
        <ul className="wall-row mt-20 !items-end !justify-start gap-y-14">
          {commissionCategories.map((category, i) => (
            <li
              key={category.id}
              className="w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.6rem)]"
              data-lift={i}
            >
              <Lit
                className="w-full"
                style={{ aspectRatio: heights[i % heights.length] }}
              >
                <Image
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  sizes="(min-width: 64rem) 23vw, 45vw"
                  className="object-cover"
                />
              </Lit>
              <h3 className="u-work mt-5 text-xl text-chalk">{category.title}</h3>
              <p className="u-micro mt-2">{category.description}</p>
              <p className="u-label mt-3 !text-bone">{category.startingPrice}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Enquiry */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <RoomTitle eyebrow="Begin" title="Write to the studio">
            Tell June what you have in mind. There is no obligation at this
            stage — the first step is only a conversation.
          </RoomTitle>
          <div data-lift="0">
            <CommissionForm />
          </div>
        </div>
      </Section>
    </div>
  );
}
